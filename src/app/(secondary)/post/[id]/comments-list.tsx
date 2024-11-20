"use client";

import { format, formatDistanceToNow } from "date-fns";
import { FaTrash, FaUser } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";
import type { CommentProps } from "@/types/types";
import { ptBR as locale } from "date-fns/locale";
import { CiCircleRemove } from "react-icons/ci";
import { removeComment } from "./remove-comment";

interface CommentsListProps {
	comments: CommentProps[];
	postAuthorId: string;
}

export function CommentsList({ comments, postAuthorId }: CommentsListProps) {
	const { user } = useUser();

	const commentsWithoutRemoved = comments.filter((comment) => !comment.removed);

	const handleRemoveComment = async (id: string) => {
		await removeComment(id);
	};

	return (
		<section className="flex flex-col gap-4 w-full">
			{comments.map((comment: CommentProps) => {
				return (
					<div className="flex items-center gap-4" key={comment.id}>
						<FaUser size={24} className="rounded-full" />
						<div
							className={`bg-slate-600/20  p-4 rounded-md ${comment.removed && "backdrop-blur-2xl backdrop-contrast-125 blur-sm"}`}
						>
							<p className="font-bold text-xs translucent">
								{comment.user.name} |
								<span>
									{formatDistanceToNow(new Date(comment.createdAt), { locale })}
									{format(
										new Date(comment.createdAt),
										"dd-MMM-yyyy",
									).toUpperCase()}
								</span>
							</p>
							<p>{comment.description}</p>
						</div>
						{comment.removed ? (
							<p className="text-red-600">
								<CiCircleRemove size={20} />
							</p>
						) : (
							<>
								{(user?.id === comment.user.id ||
									postAuthorId === user?.id) && (
									<Button
										title="Excluir comentario"
										onClick={() => handleRemoveComment(comment.id)}
										variant={"ghost"}
										className="flex items-center hover:text-indigo-600"
									>
										<FaTrash className="w-3 h-3" />
									</Button>
								)}
							</>
						)}
					</div>
				);
			})}
		</section>
	);
}
