// post/PostsPageClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import BreakNews from "./break-news";
import { PostsList } from "./posts-list";

export default function PostsPageClient_old() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<div className="flex justify-end">
				<div>
					{user?.name ? (
						<Button
							title="Novo post"
							variant={"ghost"}
							onClick={() => router.push("/post/0/new")}
							className="hover:bg-indigo-600 rounded-full w-10 h-10 hover:font-bold text-slate-600 hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
						>
							<FaPlus size={24} />
						</Button>
					) : (
						<></>
					)}
				</div>
			</div>

			<h2 className="font-bold text-3xl">Destaque do dia</h2>
			<BreakNews />
			<h2 className="font-bold text-3xl">Mais recentes</h2>
			<PostsList />
		</section>
	);
}
