import { api } from "@/lib/api";
import type { PostProps } from "@/types/post-type";

export async function getPost(id: string) {
	const response = await api.post<PostProps[]>("/post", {
		id,
	});
	const post = response.data;

	return post;
}
