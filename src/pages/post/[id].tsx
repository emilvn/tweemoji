import Head from "next/head";
import {type NextPage} from "next";

const SinglePostPage:NextPage = () => {

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <main className="flex justify-center h-screen">
                <div>Post View</div>
            </main>
        </>
    );
}

export default SinglePostPage;