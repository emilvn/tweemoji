import {useState} from "react";

import Image from "next/image";
import {type NextPage} from "next";

import {useUser} from "@clerk/nextjs";
import toast from "react-hot-toast";

import {api} from "~/utils/api";

import {LoadingPage, LoadingSpinner} from "~/components/loading";
import {PageLayout} from "~/components/layout";
import PostView from "~/components/postview";
import LoginPage from "~/pages/login";
import InputEmojiWithRef from "react-input-emoji";

export function CreatePostWizard(){
    const {user} = useUser();

    const [input, setInput] = useState("");

    const ctx = api.useUtils();

    const {mutate:createPost, isLoading:isPosting} = api.posts.create.useMutation({
        onSuccess: () => {
            setInput("");
            void ctx.posts.getAll.invalidate();
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if(errorMessage && errorMessage[0]){
                toast.error(errorMessage[0]);
            }
            else{
                toast.error("Failed to post!");
            }
        }
    });

    if(!user) return null;

    return (
        <div className="flex gap-3 w-full">
            <Image
                src={user.imageUrl}
                alt={`@${user.username}'s profile picture`}
                className="w-14 h-14 rounded-full"
                width={56}
                height={56}
            />
            {/*<input
                placeholder="Type some emojis!"
                className="bg-transparent grow outline-none"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPosting}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        if(input !== "") createPost({content: input});
                    }
                }}
            />*/}
            <InputEmojiWithRef
                value={input}
                onChange={setInput}
                cleanOnEnter={true}
                keepOpened={true}
                maxLength={280}
                placeholder="Type some emojis!"
                theme={"dark"}/>
            {input !== "" && !isPosting && (
                <button
                    className="bg-slate-500 text-white rounded-md px-4 py-2"
                    onClick={() => createPost({content: input})}>Post</button>
            )}
            {isPosting && (
                <div className="flex items-center justify-center">
                    <LoadingSpinner size={20}/>
                </div>
            )}
        </div>
    );
}

function Feed(){
    const {data, isLoading:postsLoading} = api.posts.getAll.useQuery();

    if(postsLoading || true) return <LoadingPage />;

    if(!data) return <div>Something went wrong</div>;

    return (
        <div className="flex flex-col">
            {data?.map((fullPost) => (
                <PostView {...fullPost} key={fullPost.post.id}/>
            ))}
        </div>
    );
}

const Home:NextPage = () => {
    console.log("rendering home");
    const {isLoaded:userLoaded, isSignedIn} = useUser();

    // start fetching ASAP
    api.posts.getAll.useQuery();

    // return empty div if user isn't loaded yet
    if(!userLoaded) return (<div />);

    return (
        <>
            {!isSignedIn && <LoginPage/>}
            {!!isSignedIn && (

                <PageLayout>
			        <div className="flex border-b border-slate-400 p-4">
                        <CreatePostWizard />
			        </div>
    	            <Feed />
                </PageLayout>
            )}
    </>
	);
}

export default Home;