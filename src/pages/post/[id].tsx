import Head from "next/head";
import type {GetStaticProps, NextPage} from "next";
import {LoadingPage} from "~/components/loading";
import {api} from "~/utils/api";
import {PageLayout} from "~/components/layout";

const SinglePostPage:NextPage<{id: string}> = ({id}) => {
    const {data, isLoading} = api.posts.getPostById.useQuery({id});

    if(isLoading) return <LoadingPage/>;

    if(!data) return <div>404 Not Found</div>;

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <PageLayout>
                <PostView {...data}/>
            </PageLayout>
        </>
    );
}

import {appRouter} from "~/server/api/root";
import {db} from "~/server/db";
import {TRPCError} from "@trpc/server";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import PostView from "~/components/postview";

export const getStaticProps:GetStaticProps = (ctx) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {db, userId: null},
        transformer: superjson, // optional - adds superjson serialization
    });

    const id = ctx.params?.id;

    if(typeof id !== "string") throw new TRPCError({code: "NOT_FOUND", message: "Not Found"});

    return {
        props:{
            trpcState: helpers.dehydrate(),
            id,
        }
    }
};

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    }
};


export default SinglePostPage;