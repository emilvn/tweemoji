import Head from "next/head";
import type {GetStaticProps, NextPage} from "next";
import {api} from "~/utils/api";
import Image from "next/image";

const ProfilePage:NextPage<{ username:string }> = ({username}) => {
	const {data} = api.profile.getUserByUsername.useQuery({username});

	if(!data) return <div>404 Not Found</div>;

    return (
        <>
            <Head>
                <title>{data.username}</title>
            </Head>
            <PageLayout>
				<div className="bg-slate-600 h-36 relative">
                	<Image
						src={data.imageUrl}
						alt={`${data.username ?? ""}'s profile picture`}
						width={128}
						height={128}
						className="-mb-[64px] absolute bottom-0 left-0 ml-4
						rounded-full border-4 border-black bg-black"
					/>
				</div>
				<div className="h-[64px]"></div>
				<div className="p-4 text-2xl font-bold">
					{`@${data.username ?? ""}`}
				</div>
				<div className="border-b border-slate-400 w-full"></div>
			</PageLayout>
        </>
    );
}

import {appRouter} from "~/server/api/root";
import {db} from "~/server/db";
import {TRPCError} from "@trpc/server";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import {PageLayout} from "~/components/layout";

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