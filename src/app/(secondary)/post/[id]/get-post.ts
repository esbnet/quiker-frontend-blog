import { api } from "@/lib/api";
import type { PostProps } from "@/types/types";

export async function getPost(id: string) {
	console.log("ID DO POST na função getPosts	 ", id);
	const post = await api.post<PostProps>("/post", {
		id,
	});

	console.log("POST RETORNADO NA FUNÇÃO GETPOST", post.data);

	return post.data;
}
