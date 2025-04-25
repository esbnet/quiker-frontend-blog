import { api } from "@/lib/api";

interface CommentProps {
	authorId: string;
	postId: string;
	content: string;
}

export async function saveComment({ authorId, postId, content }: CommentProps) {
	const comment = await api.post("/comment/new", {
		authorId,
		postId,
		content,
	});

	return comment.data;
}
