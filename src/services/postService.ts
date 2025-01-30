// services/postService.ts
import type { PostProps } from "@/types/post-type";
import { api } from "../lib/api";

export class PostService {
	async getAllPosts(): Promise<PostProps[]> {
		const response = await api.get<PostProps[]>("/posts");
		return response.data;
	}

	async getPostById(id: string): Promise<PostProps> {
		await api.post<PostProps>(`/post/${id}`);
		const response = await api.post<PostProps>(`/post/${id}`);
		return response.data;
	}

	async registerView(id: string): Promise<PostProps> {
		const response = await api.post<PostProps>("/post/view", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: { id: id }, // Pass the id as the request body
		});
		return response.data;
	}

	async createPost(
		postData: Omit<PostProps, "id" | "createdAt">,
	): Promise<PostProps> {
		const response = await api.post<PostProps>("/post", postData);
		return response.data;
	}

	async updatePost(
		id: string,
		postData: Partial<PostProps>,
	): Promise<PostProps> {
		const response = await api.put<PostProps>(`/posts/${id}`, postData);
		return response.data;
	}

	async deletePost(id: string): Promise<void> {
		await api.delete(`/posts/${id}`);
	}

	async updatePostViews(postId: string) {
		try {
			const { data } = await api.patch(`/post/view/${postId}`, {
				// Passa um objeto vazio ou um incremento específico
				increment: 1,
			});

			// Retorna o novo número de views, se necessário
			return data.views;
		} catch (error) {
			console.error("Erro ao atualizar views:", error);
			return null;
		}
	}
}
