import { api } from "@/lib/api";
import type { CommentProps } from "@/types/comment-type";

export async function getComments(id: string) {
	const comments = await api.post<CommentProps[]>("/comments", {
		id,
	});

	return comments.data;
}
