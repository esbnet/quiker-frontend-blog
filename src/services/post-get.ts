import type { PostProps } from "@/@types/post-type";
import { api } from "@/lib/api";

export async function getPost(id: string): Promise<PostProps> {
	const response = await api.post<PostProps>("/post", {
		id,
	});
	const post = response.data;

	return post;
}
