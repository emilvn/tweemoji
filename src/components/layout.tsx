import type {PropsWithChildren} from "react";
import {UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {FaHome} from "react-icons/fa";
import Image from "next/image";
import {IoInformationCircleOutline} from "react-icons/io5";

export const NavButton = (props: PropsWithChildren) => {
	return (
		<div className="w-[48px] h-[48px] rounded-full hover:bg-gray-600
		flex justify-center items-center transition-colors">
			{props.children}
		</div>
	);
}

export const NavBar = () => {
	return (
		<nav className="flex gap-4 p-4
			border-slate-400 fixed
			w-[84px] flex-col justify-start items-center border-none h-full"
		>
				<div className="content-between flex flex-col">
					<NavButton>
						<Link href="/">
							<Image src="/logo.png" width={48} height={48} alt="logo"/>
						</Link>
					</NavButton>
					<NavButton>
						<Link href="/">
								<FaHome size={32}/>
						</Link>
					</NavButton>
					<NavButton>
						<Link href="/about">
							<IoInformationCircleOutline size={32}/>
						</Link>
					</NavButton>
				</div>
				<div>
					<NavButton>
						<UserButton/>
					</NavButton>
				</div>
		</nav>
	);
}

export const PageLayout = (props: PropsWithChildren) => {
	return (
		<div className="flex flex-row">
			<NavBar/>
			<div className="md:w-[180px] w-[97px] h-screen">

			</div>
			<main className="flex justify-center h-full min-h-screen w-full">
				<div className="w-full lg:max-w-2xl border-slate-400 border-x">
					{props.children}
				</div>
			</main>
			<div className="md:w-full"></div>
		</div>
	);
}