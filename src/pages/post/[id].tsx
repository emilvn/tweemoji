import Head from "next/head";
import type {GetStaticProps, NextPage} from "next";

import {api} from "~/utils/api";

import {LoadingPage} from "~/components/loading";
import {PageLayout} from "~/components/layout";
import PostView from "~/components/postview";

const SinglePostPage:NextPage<{id: string}> = ({id}) => {
    const {data, isLoading} = api.posts.getPostById.useQuery({id});

    if(isLoading) return <LoadingPage/>;

    if(!data || !data.post) return <div>404 Not Found</div>;

    return (
        <>
            <Head>
                <title>{`${data.post.content} - ${data.author.username}`}</title>
            </Head>
            <PageLayout>
                <PostView {...data}/>
            </PageLayout>
        </>
    );
}

import {TRPCError} from "@trpc/server";
import {generateSSGHelpers} from "~/server/helpers/generateSSGHelpers";

export const getStaticProps:GetStaticProps = async (ctx) => {
    const helpers = generateSSGHelpers();

    const id = ctx.params?.id;

    if(typeof id !== "string") throw new TRPCError({code: "NOT_FOUND", message: "Not Found"});

    await helpers.posts.getPostById.prefetch({id});

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