import { getPost } from "@/services/post-get";
import { Post } from "./post";

interface PostPageProps {
	params: { id: string };
}
export default async function PostPage({ params }: PostPageProps) {
	const { id } = await params;

	try {
		const initialPost = await getPost(id);

		return <Post initialPost={initialPost} />;
	} catch (err) {}
}
