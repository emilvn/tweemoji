import { z } from "zod";

import {createTRPCRouter, privateProcedure, publicProcedure} from "~/server/api/trpc";
import {clerkClient} from "@clerk/nextjs";
import filterUserForClient from "~/server/helpers/filterUserForClient";
import {TRPCError} from "@trpc/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    analytics: true
});

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ctx}) => {
        const posts = await ctx.db.post.findMany({
            take: 100,
            orderBy: {
                createdAt: "desc"
            }
        });

        const users = (
            await clerkClient.users.getUserList({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })
        ).map(filterUserForClient);

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId);

            if(!author  || !author.username)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Author not found"
                });

            return {
                post,
                author
            }
        });
    }),

    create: privateProcedure
		.input(
			z.object({
        		content: z.string().emoji("Only emojis are allowed").min(1).max(280),
    		})
		)
		.mutation(async ({ctx, input}) => {
        const authorId = ctx.userId;

        const {success} = await ratelimit.limit(authorId);
        if(!success) throw new TRPCError({code: "TOO_MANY_REQUESTS"});

        return await ctx.db.post.create({
            data: {
                authorId,
                content: input.content,
            }
        });
    }),

    getPostsByUser: publicProcedure
        .input(z.object({
            userId: z.string(),
        }))
        .query(async ({ctx, input}) => {

            const posts = await ctx.db.post.findMany({
                where: {
                    authorId: input.userId
                },
                take: 100,
                orderBy: {
                    createdAt: "desc"
                }
            });
            const author = await clerkClient.users.getUser(input.userId);
            return posts.map((post) => {
                if(!author || !author.username)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "User not found"
                    });
                return {post, author}
            });
    }),

    getPostById: publicProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ctx, input}) => {
        const post = await ctx.db.post.findUnique({
            where: {
                id: input.id
            }
        });

        if(!post) throw new TRPCError({
            code: "NOT_FOUND",
            message: "Post not found"
        });

        const author = await clerkClient.users.getUser(post.authorId);
        if(!author || !author.username)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "User not found"
            });

        return {post, author};
    }),
});
