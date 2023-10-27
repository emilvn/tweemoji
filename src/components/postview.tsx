import type {RouterOutputs} from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];
function PostView(props: PostWithAuthor) {
	const {post, author} = props;

	return (
		<div
			key={post.id}
			className="flex p-4 border-b border-slate-400 gap-3">
			<Link href={`/@${author.username}`}>
				<Image
					src={author.imageUrl}
					alt={`@${author.username}'s profile picture`}
					className="w-14 h-14 rounded-full"
					width={56}
					height={56}
				/>
			</Link>
			<div className="flex flex-col">
				<div className="flex gap-1 text-slate-300 font-bold">
					<Link href={`/@${author.username}`}>
						<span>{`@${author.username}`}</span>
					</Link>
					<Link href={`/post/${post.id}`}>
						<span className="mx-1">·</span>
						<span className="font-thin">{`${dayjs(post.createdAt).fromNow()}`}</span>
					</Link>
				</div>
				<Link href={`/post/${post.id}`}>
					<span className="text-2xl">{post.content}</span>
				</Link>
			</div>
		</div>
	);
}

export default PostView;