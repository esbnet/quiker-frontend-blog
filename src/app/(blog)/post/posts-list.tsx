// post/posts-list.tsx
// "use client";

import type { PostProps } from "@/@types/post-type";
import Post from "@/components/custom/post";
import SkeletonPostList from "@/components/custom/skeleton-post-list";
import { getPosts } from "@/services/posts-get";
import { useQuery } from "@tanstack/react-query";
import { Anton } from "next/font/google";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export function PostsList() {
	const {
		data: posts,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	if (isLoading) return <SkeletonPostList />;
	if (isError) return <div className="text-red-500">{isError}</div>;
	if (!posts) {
		return (
			<div className="text-slate-600 dark:text-slate-300">
				Nenhum post registrado...
			</div>
		);
	}

	return (
		<section className="flex gap-6">
			<div className="bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-6 rounded-md w-full">
				{posts.map((post: PostProps, index: number) => {
					if (index === 0) return;

					return <Post key={post.id} {...post} />;
				})}
			</div>
			<div className="hidden sm:block bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md w-1/3 text-2xl">
				Categorias
			</div>
		</section>
	);
}
