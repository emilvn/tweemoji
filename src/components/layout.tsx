import type {PropsWithChildren} from "react";

export const PageLayout = (props: PropsWithChildren) => {
	return (
		<main className="flex justify-center h-full min-h-screen">
			<div className="w-full md:max-w-2xl border-slate-400 border-x">
				{props.children}
			</div>
		</main>
	);
}