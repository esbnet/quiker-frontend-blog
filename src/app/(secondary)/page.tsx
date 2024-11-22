import { getPosts } from "@/services/get-posts";
import PostsPageClient from "./PostsPageClient";

export const metadata = {
	title: {
		default: "Quiker News",
		template: "%s | Home",
	},
	description: "tecnologia em evidência",
	Icon: "/logo.png",
	robots: {
		index: false,
		follow: true,
	},
};

export default async function PostsPage() {
	const initialPosts = await getPosts();

	return <PostsPageClient initialPosts={initialPosts} />;
}
