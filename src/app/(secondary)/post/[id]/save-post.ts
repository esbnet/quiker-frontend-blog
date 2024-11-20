import { api } from "@/lib/api";

interface CommentProps {
	authorId: string;
	postId: string;
	description: string;
}

export async function saveComment({
	authorId,
	postId,
	description,
}: CommentProps) {
	const comment = await api.post<CommentProps>("/comment/new", {
		authorId,
		postId,
		description,
	});

	console.log(comment);

	return comment.data;
}
