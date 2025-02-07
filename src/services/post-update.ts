import type { PostUpdateProps } from "@/@types/post-type";
import { api } from "@/lib/api";

export async function updatePost(data: PostUpdateProps) {
	// try {
	const post = await api.put<PostUpdateProps>("/post", {
		id: data.id,
		title: data.title,
		content: data.content,
		imageUrl: data.imageUrl,
		userId: data.userId,
	});

	return post.data;
	// } catch (error) {
	// 	throw new Error(`Erro ao atualizar o Post: ${error}`);
	// }
}
