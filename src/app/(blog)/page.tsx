"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { BreakNews } from "./post/break-news";
import { PostsList } from "./post/posts-list";

export default function PostsPage() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<div className="flex justify-end">
				<div>
					{user ? (
						<Button
							title="Novo post 📰"
							variant={"ghost"}
							onClick={() => router.push("/post/0/new")}
							className="flex items-center object-cover hover:text-indigo-600 hover:scale-125 transition-transform duration-300 cursor-pointer transform"
						>
							<FaPlus size={24} />
						</Button>
					) : (
						<></>
					)}
				</div>
			</div>

			<h2 className="font-heading font-bold text-3xl">Destaque do dia</h2>
			<BreakNews />

			<h2 className="font-bold text-3xl">Mais recentes</h2>
			<PostsList />
		</section>
	);
}
