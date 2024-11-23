import { api } from "@/lib/api";

interface CommentProps {
	authorId: string;
	postId: string;
	description: string;
}

export async function deletePost(id: string) {
	const comment = await api.delete("/post/${id}");

	return comment.data;
}
