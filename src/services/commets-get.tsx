import { api } from "@/lib/api";
import type { CommentProps } from "@/types/types";

export async function getComments(id: string) {
	const comments = await api.post<CommentProps[]>("/comments", {
		id,
	});

	return comments.data;
}
