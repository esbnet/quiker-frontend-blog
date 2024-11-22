import { api } from "@/lib/api";
import type { PostProps } from "@/types/types";

export async function getPost(id: string) {
	const response = await api.post<PostProps>("/post", {
		id,
	});
	const post = response.data;

	return post;
}
