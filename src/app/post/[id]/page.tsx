"use client";

import { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

import type { PostProps } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useControllers from "@/hooks/useControllers";
import { Anton } from "next/font/google";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Article({ params }: { params: { id: string } }) {
	const { postController } = useControllers();
	const [post, setPost] = useState<PostProps>({} as PostProps);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const id = params.id;

	useEffect(() => {
		loadPost();
	}, []);

	const loadPost = async () => {
		try {
			setIsLoading(true);
			const response = await postController.getPostById(id as string);
			setPost(response);
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

	if (!id) {
		return <div>Post not found</div>;
	}

	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<div className="flex justify-center">{/* <CarouselPlugin /> */}</div>
			<h1 className={`${titleMain.className} font-extrabold text-6xl`}>
				{post.title}
			</h1>
			<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
				<Image
					src={post.imageUrl}
					alt=""
					width={500}
					height={200}
					className="rounded-md h-72 transform transition-transform duration-300 object-cover hover:scale-105"
				/>
			</div>
			<div className="flex gap-6 text-slate-400 dark:text-slate-800">
				<span className="flex items-center gap-2">
					<FaRegEye className="w-4 h-4" />
					<span className="text-slate-500 text-xs">{post.views}</span>
				</span>
				<span className="flex items-center gap-2">
					<BiLike className="w-4 h-4" />
					<span className="text-slate-500 text-xs">{post.likes}</span>
				</span>
				<span className="flex items-center gap-2">
					<BiDislike className="w-4 h-4" />
					<span className="text-slate-500 text-xs">{post.dislikes}</span>
				</span>
			</div>
			<p>{post.description}</p>
			<div className="flex gap-4 self-end">
				<Button variant={"ghost"} className="flex items-center gap-2">
					<BiLike className="w-6 h-6" />
				</Button>
				<Button variant={"ghost"} className="flex items-center gap-2">
					<BiDislike className="w-6 h-6" />
				</Button>
			</div>
		</section>
	);
}
