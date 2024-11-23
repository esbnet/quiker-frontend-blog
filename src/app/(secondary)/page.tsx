import { getPosts } from "@/services/get-posts";
import PostsPageClient from "./post/PostsPageClient";

export default async function PostsPage() {
	const initialPosts = await getPosts();

	return <PostsPageClient initialPosts={initialPosts} />;
}
