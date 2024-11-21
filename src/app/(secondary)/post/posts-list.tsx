"use client";
// post/posts-list.tsx

import { Anton } from "next/font/google";

import type { PostProps } from "@/types/types";
import Image, { type StaticImageData } from "next/image";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR as locale } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "./get-posts";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

interface PostListProps {
	initialPosts: PostProps[];
}

export function PostsList({ initialPosts }: PostListProps) {
	const [posts, setPosts] = useState<PostProps[]>(initialPosts);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPosts(); // Primeira chamada

		// Recarrega quando a página voltar a ficar visível
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				fetchPosts();
			}
		});

		// Atualiza a cada 60 segundos
		const interval = setInterval(fetchPosts, 60000);

		// Cleanup: remove o intervalo quando o componente desmonta
		return () => clearInterval(interval);
	}, []);

	const fetchPosts = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const newPosts = await getPosts();
			setPosts(newPosts);
		} catch (err) {
			setError("Erro ao carregar posts");
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <div>Carregando...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<section className="flex gap-6">
			<div className="bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-6 rounded-md w-full">
				{posts.map((post: PostProps) => {
					return (
						<div
							key={post.id}
							rel="noopener noreferrer"
							title={post.title}
							className="flex sm:flex-row flex-col gap-4 hover:bg-slate-300/60 dark:hover:bg-slate-600/50 mb-4 p-4 rounded-md w-full transform transition-transform duration-300 object-cover hover:scale-105 hover:shadow-xl"
						>
							<div className="flex flex-col gap-2 rounded-md overflow-hidden">
								<Image
									src={post.imageUrl as unknown as StaticImageData}
									alt=""
									width={300}
									height={300}
									className="transform transition-transform duration-300 object-cover hover:scale-105 shadow-lg rounded-md w-full h-64"
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
										<span>
											{format(post.createdAt, "dd-MMM-yyyy").toUpperCase()}
										</span>
										<span>
											{formatDistanceToNow(post.createdAt, { locale })}
										</span>
									</div>
								</h2>
								<p className="flex-1 line-clamp-5">{post.description}</p>
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
