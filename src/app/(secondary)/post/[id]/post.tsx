"use client";
// post/posts.tsx

import type { CommentProps, PostProps } from "@/types/types";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

import { CommentComponent } from "@/components/custom/comment-component";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";
import { ptBR as locale } from "date-fns/locale";
import { Anton } from "next/font/google";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { CommentsList } from "./comments-list";
import { getComments } from "./get-commets";
import { getPost } from "./get-post";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

interface PostListProps {
	initialPost: PostProps;
}

export function Post({ initialPost }: PostListProps) {
	const [post, setPost] = useState<PostProps>(initialPost);
	const [comments, setComments] = useState<CommentProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user } = useUser();

	useEffect(() => {
		fetchPost(); // Primeira chamada

		// Recarrega quando a página voltar a ficar visível
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				fetchPost();
			}
		});
	}, []);

	const fetchPost = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const responsePost = await getPost(initialPost.id);
			setPost(responsePost);
			console.log(responsePost);

			const responseComments = await getComments(initialPost.id);
			setComments(responseComments);
		} catch (err) {
			setError("Erro ao carregar posts");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <div>Carregando...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

	const handleLike = async () => {
		try {
			const response = await fetch(`/api/post/${post.id}/like`, {
				method: "POST",
			});
			const data = await response.json();
			console.log(data);
			fetchPost();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDislike = async () => {
		try {
			const response = await fetch(`/api/post/${post.id}/dislike`, {
				method: "POST",
			});
			const data = await response.json();
			console.log(data);
			fetchPost();
		} catch (error) {
			console.error(error);
		}
	};

	const handleComment = async (comment: string) => {
		try {
			const response = await fetch(`/api/post/${post.id}/comment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ comment }),
			});
			const data = await response.json();
			console.log(data);
			fetchPost();
		} catch (error) {
			console.error(error);
		}
	};

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
			<p>
				{post.id} -{post.author.name}
				<p>{formatDistanceToNow(post.createdAt, { locale })}</p>
				<p>{format(post.createdAt, "dd-MMM-yyyy").toUpperCase()}</p>
			</p>
			<p>{post.description}</p>
			{user !== null ? (
				<div className="flex self-end">
					<Button
						variant={"ghost"}
						className="flex items-center hover:text-indigo-600"
					>
						<BiLike className="w-6 h-6" />
					</Button>
					<Button
						variant={"ghost"}
						className="flex items-center hover:text-indigo-600"
					>
						<BiDislike className="w-6 h-6" />
					</Button>
					<CommentComponent postId={post.id} />
				</div>
			) : (
				<></>
			)}

			<CommentsList comments={comments} postAuthorId={post.author.id} />
		</section>
	);
}
