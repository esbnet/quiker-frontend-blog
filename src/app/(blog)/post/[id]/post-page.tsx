// post/post-page.tsx
"use client";

import { format, formatDistanceToNow } from "date-fns";
import { BiDislike, BiLike } from "react-icons/bi";

import ButtonPostEdit from "@/components/custom/button-post-edit";
import { CommentComponent } from "@/components/custom/comment-component";
import { DeletePost } from "@/components/custom/post-delete";
import { ToggleDisLike } from "@/components/custom/toggle-dislike";
import { ToggleLike } from "@/components/custom/toggle-like";
import { useUser } from "@/context/user-context";
import { getPost } from "@/services/post-get";
import { useQuery } from "@tanstack/react-query";
import { ptBR as locale } from "date-fns/locale";
import { Anton } from "next/font/google";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import CommentsList from "./comments-list";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function PostPage() {
	const id = useParams<{ id: string }>().id;
	const { user } = useUser();

	const {
		data: post,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => getPost(id),
	});

	if (isLoading) return <div>Carregando...</div>;
	if (isError) return <div className="text-red-500">{isError}</div>;

	if (!post) {
		return (
			<div className="text-slate-600 dark:text-slate-300">
				Nenhum post registrado...
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
			<h1 className={`${titleMain.className} font-extrabold text-5xl`}>
				{post.title}
			</h1>

			<div className="flex gap-4">
				<div className="flex flex-col gap-2">
					<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
						<Image
							src={post.imageUrl}
							alt="Imagem que representa o post"
							width={500}
							height={200}
							className="rounded-md h-72 object-cover hover:scale-105 transition-transform duration-300 transform"
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
				</div>
				<div>
					<div>
						{post.author.name}
						<p className="text-slate-500 text-xs">
							{formatDistanceToNow(new Date(post.createdAt), { locale })}
						</p>
						<p className="text-slate-500 text-xs italic">
							{format(new Date(post.createdAt), "dd 'de' MMMM 'de' yyyy", {
								locale,
							})}
						</p>
					</div>
				</div>
				<div className="flex flex-1 justify-end">
					{/* garante que só o autor pode editar ou excluir o post */}
					{user !== null && user?.id === post.author.id ? (
						<div className="flex gap-2">
							<ButtonPostEdit postId={post.id} />
							<DeletePost postId={post.id} postAuthorId={post.author.id} />
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			<div>
				<p>{post.content}</p>
			</div>

			{user !== null ? (
				<div className="flex self-end gap-4">
					<ToggleLike postId={post.id} userId={user.id} />
					<ToggleDisLike postId={post.id} userId={user.id} />
					<CommentComponent postId={post.id} />
				</div>
			) : (
				<></>
			)}

			{post.comments && post.comments.length > 0 && (
				<CommentsList comments={post.comments} />
			)}
		</section>
	);
}
