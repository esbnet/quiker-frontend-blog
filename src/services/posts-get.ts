import type { PostProps } from "@/@types/post-type";
import { api } from "@/lib/api";

export async function getPosts(): Promise<PostProps[]> {
	const posts = await api.get<PostProps[]>("/posts");

	return posts.data;
}
