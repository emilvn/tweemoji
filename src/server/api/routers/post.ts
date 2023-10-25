import { z } from "zod";

import {createTRPCRouter, privateProcedure, publicProcedure} from "~/server/api/trpc";
import {clerkClient} from "@clerk/nextjs";
import {type User} from "@clerk/backend";
import {TRPCError} from "@trpc/server";

function filterUserForClient(user: User){
    return {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,

    }
}

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

        console.log(users);

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId);

            if(!author?.username)
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
        		content: z.string().emoji().min(1).max(280),
    		})
		)
		.mutation(async ({ctx, input}) => {
        const authorId = ctx.userId;

        return await ctx.db.post.create({
            data: {
                authorId,
                content: input.content,
            }
        });
    }),
});
