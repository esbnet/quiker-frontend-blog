import type { PostNewProps } from "@/@types/post-type";
import { api } from "@/lib/api";

export async function addPost(data: PostNewProps) {
	const post = await api.post<PostNewProps>("/post/new", {
		...data,
	});

	return post.data;
}
