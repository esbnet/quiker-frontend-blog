import { api } from "@/lib/api";

interface CommentProps {
	authorId: string;
	postId: string;
	description: string;
}

export async function removeComment(id: string) {
	const comment = await api.put<CommentProps>("/comment", {
		id,
		removed: true,
	});

	return comment.data;
}
