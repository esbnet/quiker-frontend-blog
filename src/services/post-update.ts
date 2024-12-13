import { api } from "@/lib/api";
import type { PostNewProps } from "@/types/comment-type";

interface PostUpdateProps {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	userId: string;
}

export async function updatePost(data: PostUpdateProps) {
	// try {
	const post = await api.put<PostNewProps>("/post", {
		id: data.id,
		title: data.title,
		description: data.description,
		imageUrl: data.imageUrl,
		userId: data.userId,
	});

	return post.data;
	// } catch (error) {
	// 	throw new Error(`Erro ao atualizar o Post: ${error}`);
	// }
}
