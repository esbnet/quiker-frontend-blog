import { api } from "@/lib/api";
import type { PostProps } from "@/types/types";

export async function getPosts() {
	const posts = await api.get<PostProps[]>("/posts", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return posts.data;
}
