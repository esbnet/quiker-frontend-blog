import { api } from "@/lib/api";
import type { PostNewProps } from "@/types/types";

export async function addPost(data: PostNewProps) {
	const post = await api.post<PostNewProps>("/post/new", {
		...data,
	});

	return post.data;
}
