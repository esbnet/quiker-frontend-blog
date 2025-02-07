"use client";

import { FaTrash, FaUser } from "react-icons/fa";
import { format, formatDistanceToNow } from "date-fns";

import type { AuthorProps } from "@/@types/author-type";
import { Button } from "@/components/ui/button";
import { CiCircleRemove } from "react-icons/ci";
import type { CommentProps } from "@/@types/comment-type";
import { ptBR as locale } from "date-fns/locale";
import { removeComment } from "@/services/comment-remove";
import { useUser } from "@/context/user-context";

interface CommentsListProps {
	comments: CommentProps[];
	postAuthor: AuthorProps;
}

export default function CommentsList({
	comments,
	postAuthor,
}: CommentsListProps) {
	const { user } = useUser();
	// const commentsWithoutRemoved = comments.filter((comment) => !comment.removed);

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
							className={`${comment.removed && "backdrop-blur-2xl backdrop-contrast-125 blur-sm"}`}
						>
							<div className={"bg-slate-600/20 p-4 rounded-full "}>
								<p className="font-bold text-[0.6rem] translucent">
									{postAuthor.name}
									<span>{format(new Date(comment.createdAt), "MMM-yyyy")}</span>
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
								{(user?.id === postAuthor.id ||
									user?.id === comment.user?.id) && (
									<Button
										title="Excluir comentário"
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
