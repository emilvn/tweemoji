import Head from "next/head";
import type {GetStaticProps, NextPage} from "next";
import {api} from "~/utils/api";
import Image from "next/image";
import PostView from "~/components/postview";
import {PageLayout} from "~/components/layout";
import {LoadingSpinner} from "~/components/loading";

const ProfilePage:NextPage<{ username:string }> = ({username}) => {
	const {data: user} = api.profile.getUserByUsername.useQuery({username});

	if(!user) return <div>404 Not Found</div>;

	const {data:posts, isLoading:postsLoading} = api.posts.getPostsByUser.useQuery({userId: user.id ?? ""});

    return (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <PageLayout>
				<div className="bg-slate-600 h-36 relative">
                	<Image
						src={user.imageUrl}
						alt={`${user.username ?? ""}'s profile picture`}
						width={128}
						height={128}
						className="-mb-[64px] absolute bottom-0 left-0 ml-4
						rounded-full border-4 border-black bg-black"
					/>
				</div>
				<div className="h-[64px]"></div>
				<div className="p-4 text-2xl font-bold">
					{`@${user.username ?? ""}`}
				</div>
				<div className="border-b border-t border-slate-400 w-full">
					{postsLoading &&
						<div className="flex justify-center p-4">
							<LoadingSpinner size={60}/>
						</div>
					}
					{posts && posts.map((post) => <PostView {...post} key={post.post.id}/>)}
				</div>
			</PageLayout>
        </>
    );
}

import {appRouter} from "~/server/api/root";
import {db} from "~/server/db";
import {TRPCError} from "@trpc/server";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

export const getStaticProps:GetStaticProps = async (ctx) => {
	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {db, userId: null},
		transformer: superjson, // optional - adds superjson serialization
	});

	const slug = ctx.params?.slug;

	if(typeof slug !== "string") throw new TRPCError({code: "NOT_FOUND", message: "Not Found"});

	const username = slug.replace("@", "");

	await helpers.profile.getUserByUsername.prefetch({username});

	return {
		props:{
			trpcState: helpers.dehydrate(),
			username,
		}
	}
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking",
	}
};
export default ProfilePage;