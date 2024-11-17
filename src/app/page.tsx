"use client";

import { Button } from "@/components/ui/button";
import { Anton } from "next/font/google";
import { redirect } from "next/navigation";
import BreakNews from "./post/break-news";
import PostsMostRecent from "./post/posts-most-recent";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Blog() {
	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<div className="flex justify-between">
				<h1 className={`${titleMain.className} font-extrabold text-6xl`}>
					Artigos
				</h1>
				<div>
					<Button variant={"outline"} onClick={() => redirect("/post/new")}>
						Novo Post
					</Button>
				</div>
			</div>

			<h2 className="font-bold text-3xl">Destaque do dia</h2>
			<BreakNews />
			<h2 className="font-bold text-3xl">Mais recentes</h2>
			<PostsMostRecent />
		</section>
	);
}
