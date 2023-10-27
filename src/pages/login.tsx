import {SignInButton, SignUpButton} from "@clerk/nextjs";
import Image from "next/image";
import {FaGithub} from "react-icons/fa";


const LoginPage = () => {
	return (
		<div className="flex flex-row w-full">
			<div className="w-full">
				<Image
					src="/logo.png"
					alt="logo"
					width={512}
					height={512}
					className="w-full screen:h-screen object-contain"
				/>
			</div>
			<div className="w-full flex p-4 flex-col gap-16">
				<h1 className="text-5xl font-bold">
					Welcome to <span className="text-sky-500">Tweemoji</span>
				</h1>
				<div className="flex flex-col gap-8">
					<h2 className="text-3xl font-bold">
						Join today.
					</h2>
					<SignUpButton mode={"modal"}>
						<button
							className="rounded-full p-2 w-80
								text-center bg-sky-500
								hover:bg-sky-600 transition-colors"
							>
								Sign up
						</button>
					</SignUpButton>
				</div>
				<div className="flex flex-col gap-3">
					<p className="text-xl font-bold">
						Already have an account?
					</p>
					<SignInButton mode={"modal"}>
						<button
							className="border rounded-full border-slate-400
								p-2 w-80 text-center text-sky-500
								hover:bg-slate-900 transition-colors"
							>
								Sign in
						</button>
					</SignInButton>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;