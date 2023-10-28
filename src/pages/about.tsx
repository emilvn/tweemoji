import type {NextPage} from "next";
import {PageLayout} from "~/components/layout";
import {FaGithub, FaLinkedin} from "react-icons/fa6";

const About:NextPage = () => {
	return (
		<PageLayout>
		<div className="p-4 flex gap-4 flex-col">
			<h1 className="text-2xl font-bold">About</h1>
			<p className="mt-2">
				Hi! Im Emil, the creator of Tweemoji.
			</p>
			<p className="mt-2">
				Tweemoji is a social media platform where you can only post emojis.
			</p>
			<p className="mt-2">
				<a href="https://www.linkedin.com/in/emil-nielsen-48b259266/"
					className="text-sky-500 hover:text-sky-600 transition-colors"
				>
					<FaLinkedin className="inline-block" size={24}/>
				</a> Let&apos;s connect!
			</p>
			<p>
				<a href="https://github.com/emilvn/tweemoji"
					className="text-slate-200 hover:text-sky-500 transition-colors"
				>
					<FaGithub className="inline-block" size={24}/>
				</a> Tweemoji code repository!
			</p>
			<p>
				<a href="https://github.com/emilvn"
					className="text-slate-200 hover:text-sky-300 transition-colors"
				>
					<FaGithub className="inline-block" size={24}/>
				</a> Other projects!
			</p>
		</div>
		</PageLayout>
		);
}

export default About;