"use client";

import { format, formatDistanceToNow } from "date-fns";
import { FaTrash, FaUser } from "react-icons/fa";

import type { CommentProps } from "@/@types/comment-type";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { removeComment } from "@/services/comment-remove";
import { ptBR as locale } from "date-fns/locale";
import { CiCircleRemove } from "react-icons/ci";

interface CommentsListProps {
	comments: CommentProps[];
}

export default function CommentsList({ comments }: CommentsListProps) {
	const { user } = useUser();
	// const commentsWithoutRemoved = comments.filter((comment) => !comment.removed);

	const handleRemoveComment = async (id: string) => {
		await removeComment(id);
	};

	return (
		<section className="flex flex-col gap-4 p-6 rounded-lg w-full">
			{comments.map((comment: CommentProps) => {
				return (
					<div className="flex items-center gap-4 w-full" key={comment.id}>
						<FaUser size={24} className="rounded-full" />
						<div
							className={`${comment.removed && "backdrop-blur-2xl backdrop-contrast-125 blur-sm"}`}
						>
							<div className={"bg-slate-600/20 p-4 rounded-full mx-auto"}>
								<p className="font-bold text-[0.8rem] text-indigo-600 text-end translucent">
									{user && comment.author.id === user?.id ? (
										<span>Você {" | "} </span>
									) : (
										<span>
											{comment.author.name}
											{" | "}
										</span>
									)}
									<span> {format(new Date(comment.createdAt), "MMM-yy")}</span>
								</p>
								<p>{comment.content}</p>
							</div>
							<span className="pl-4 font-bold text-[0.6rem]">
								{formatDistanceToNow(new Date(comment.createdAt), { locale })}
							</span>
						</div>
						{comment.removed ? (
							<p className="text-red-600">
								<CiCircleRemove size={20} />
							</p>
						) : (
							<>
								{
									// user?.id === postAuthor.id ||
									user?.id === comment.author?.id && (
										<Button
											title="Excluir comentário"
											onClick={() => handleRemoveComment(comment.id)}
											variant={"ghost"}
											className="flex items-center hover:text-indigo-600"
										>
											<FaTrash className="w-3 h-3" />
										</Button>
									)
								}
							</>
						)}
					</div>
				);
			})}
		</section>
	);
}
