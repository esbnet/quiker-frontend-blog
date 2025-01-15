import { api } from "@/lib/api";

export async function updatePostView(id: string) {
	try {
		const response = await api.patch(`/post/view/${id}`);
		const post = response.data;
		return post;
	} catch (error) {
		throw new Error(`Erro ao atualizar o Post: ${error}`);
	}
}
