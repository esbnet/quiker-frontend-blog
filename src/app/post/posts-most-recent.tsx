import { useEffect, useState } from "react";

import { Anton } from "next/font/google";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

import type { PostProps } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useControllers from "@/hooks/useControllers";
import Image, { type StaticImageData } from "next/image";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR as locale } from "date-fns/locale";
import Link from "next/link";

export default function PostsMostRecent() {
	const { postController } = useControllers();
	const [posts, setPosts] = useState<PostProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		try {
			setIsLoading(true);
			const response = await postController.getAllPosts();
			setPosts(response);
		} catch (err) {
			setError("Erro ao carregar posts");
			console.error("Error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<>
				<div className="flex items-center space-x-4">
					<Skeleton className="rounded-sm w-12 h-12" />
					<div className="space-y-2">
						<Skeleton className="w-[250px] h-4" />
						<Skeleton className="w-[200px] h-4" />
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<Skeleton className="rounded-sm w-12 h-12" />
					<div className="space-y-2">
						<Skeleton className="w-[250px] h-4" />
						<Skeleton className="w-[200px] h-4" />
					</div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<div className="bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700">
				<p>{error}</p>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className="p-4 text-center">
				<p>Nenhum post encontrado.</p>
			</div>
		);
	}

	return (
		<section className="flex gap-6">
			{error && (
				<div className="bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">
					<p>{error}</p>
					<Button
						onClick={loadPosts as unknown as () => void}
						className="bg-red-500 hover:bg-red-600 mt-2 px-4 py-2 rounded text-white"
					>
						Tentar Novamente
					</Button>
				</div>
			)}

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
										<div className="flex flex-row items-center gap-1">
											<span>Leia mais</span>{" "}
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
