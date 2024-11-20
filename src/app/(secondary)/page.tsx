import PostsPageClient from "./PostsPageClient";
import { getPosts } from "./post/get-posts";

export default async function PostsPage() {
	const initialPosts = await getPosts();

	return <PostsPageClient initialPosts={initialPosts} />;
}
