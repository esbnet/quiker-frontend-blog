// post/posts.tsx
"use client";

import { BiDislike, BiLike } from "react-icons/bi";
import { use, useState } from "react";

import { Anton } from "next/font/google";
import { Button } from "@/components/ui/button";
// import type { PostProps } from "@/types/post-type";
import { CommentComponent } from "@/components/custom/comment-component";
import type { CommentProps } from "@/types/comment-type";
import { CommentsList } from "./comments-list";
import { DeletePost } from "./delete/post-delete";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import { MdEditNote } from "react-icons/md";
import type { PostProps } from "@/types/post-type";
import { usePost } from "@/context/post-context";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function PostPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const [comments, setComments] = useState<CommentProps[]>([]);

	const { id } = use(params);
	const router = useRouter();
	const { user } = useUser();
	const { posts } = usePost();

	const post = posts.find((post) => post.id === id) as PostProps;

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
				</div>
				<div>
					<p>
						{/* {post.author.name} */}
						{/* <p>{formatDistanceToNow(new Date(post.createdAt), { locale })}</p>
						<p>{format(new Date(post.createdAt), "dd 'de' MMMM 'de' yyyy")}</p> */}
					</p>
				</div>
				<div className="flex flex-1 justify-end">
					{/* garante que só o autor pode editar ou excluir o post */}
					{user !== null && user?.id === post.author.id ? (
						<div className="flex gap-2">
							<Button
								title="Editar post"
								variant={"ghost"}
								onClick={() => router.push(`/post/${post.id}/edit`)}
								className="hover:bg-indigo-600 rounded-full w-10 h-10 hover:font-bold text-slate-600 hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105 justify-center items-center animate-pulse hover:animate-bounce"
							>
								<MdEditNote size={26} />
							</Button>
							<DeletePost
								postId={post.id}
								onDelete={() => {
									// Ações adicionais após deletar, se necessário
									console.log("Post deletado com sucesso");
								}}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			<p>{post.description}</p>
			{user !== null ? (
				<div className="flex self-end">
					<Button
						variant={"ghost"}
						className="flex items-center hover:text-indigo-600 animate-pulse hover:animate-bounce"
					>
						<BiLike className="w-6 h-6" />
					</Button>
					<Button
						variant={"ghost"}
						className="flex items-center hover:text-indigo-600 transition-all animate-pulse hover:animate-bounce"
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
