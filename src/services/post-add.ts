import { api } from "@/lib/api";
import type { PostNewProps } from "@/types/comment-type";

export async function addPost(data: PostNewProps) {
	const post = await api.post<PostNewProps>("/post/new", {
		...data,
	});

	return post.data;
}
