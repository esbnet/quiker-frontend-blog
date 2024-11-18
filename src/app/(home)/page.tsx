"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { IoNewspaperOutline } from "react-icons/io5";
import BreakNews from "../post/break-news";
import GetPosts from "../post/get-posts";

export default function Blog() {
	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<div className="flex justify-end">
				<div>
					<Button
						title="Novo post"
						variant={"ghost"}
						onClick={() => redirect("/post/new")}
						className="bg-slate-600 hover:bg-slate-600 dark:bg-slate-800 rounded-full w-10 h-10 hover:font-bold text-slate-300 hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
					>
						<IoNewspaperOutline size={24} />
					</Button>
				</div>
			</div>

			<h2 className="font-bold text-3xl">Destaque do dia</h2>
			<BreakNews />
			<h2 className="font-bold text-3xl">Mais recentes</h2>
			<GetPosts />
		</section>
	);
}
