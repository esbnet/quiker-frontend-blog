import { api } from "@/lib/api";
import type { PostProps } from "@/types/post-type";

export async function getPosts(): Promise<PostProps[]> {
	const posts = await api.get<PostProps[]>("/posts");
	return posts.data;
}
