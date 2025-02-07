import type { CommentProps } from "@/@types/comment-type";
import { api } from "@/lib/api";

export async function getComments(id: string) {
	const comments = await api.post<CommentProps[]>("/comments", {
		id,
	});

	return comments.data;
}
