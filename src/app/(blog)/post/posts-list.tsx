// post/posts-list.tsx
// "use client";

import { BiDislike, BiLike } from "react-icons/bi";

import { getPosts } from "@/services/posts-get";
import type { PostProps } from "@/types/post-type";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR as locale } from "date-fns/locale";
import { Anton } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";

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

	if (isLoading) return <div>Carregando...</div>;
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

					return (
						<div
							key={post.id}
							rel="noopener noreferrer"
							title={post.title}
							className="flex sm:flex-row flex-col gap-4 hover:bg-slate-300/60 dark:hover:bg-slate-600/50 hover:shadow-xl dark:hover:shadow-slate-950 mb-4 p-4 rounded-md w-full transform transition-transform duration-300 object-cover"
						>
							<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
								<Image
									src={post?.imageUrl ?? ""}
									alt=""
									width={350}
									height={200}
									className="rounded-md h-72 transform transition-transform duration-300 hover:scale-105 object-cover"
								/>
							</div>

							<div className="flex flex-col flex-1">
								<h2
									className={`${titleMain.className} font-bold text-2xl capitalize`}
								>
									{post.title}
								</h2>
								<h2 className="flex justify-between mb-4 text-slate-500">
									<span className="font-medium text-xs">
										{post.author.name.toUpperCase()}
									</span>
									<div className="flex flex-col items-end font-medium text-xs">
										{/* <span>
											<FormattedDate date={new Date(post.createdAt)} />
										</span> */}
										<span>
											{formatDistanceToNow(post.createdAt, { locale })}
										</span>
									</div>
								</h2>
								<p className="flex-1 line-clamp-5">{post.content}</p>
								<div className="flex justify-between gap-2">
									<div className="text-slate-600">
										<span className="flex items-center gap-2">
											<FaRegEye className="w-4 h-4" />
											<span className="text-xs">{post.views}</span>
										</span>
										<span className="flex items-center gap-2">
											<BiLike className="w-4 h-4" />
											<span className="text-xs">{post.likes}</span>
										</span>

										<span className="flex items-center gap-2">
											<BiDislike className="w-4 h-4" />
											<span className="text-xs">{post.dislikes}</span>
										</span>
									</div>
									<Link href={`/post/${post.id}`} className="flex items-end">
										<div className="flex items-center gap-1 hover:font-bold hover:dark:text-slate-100 hover:text-slate-900 transition-all">
											<span>Leia mais </span>
											<MdReadMore className="flex w-4 h-4" />
										</div>
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="sm:block hidden bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md w-1/3 text-2xl">
				Categorias
			</div>
		</section>
	);
}
