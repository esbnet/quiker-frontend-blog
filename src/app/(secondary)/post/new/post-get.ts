import { api } from "@/lib/api";
import type { PostProps } from "@/types/types";

export async function getPost(id: string) {
	const post = await api.post<PostProps>("/post", {
		id,
	});

	return post.data;
}
