import { getPost } from "./get-post";
import { Post } from "./post";

interface PostPageProps {
	params: { id: string };
}
export default async function PostPage({ params }: PostPageProps) {
	const { id } = params;

	try {
		const initialPost = await getPost(id);

		return <Post initialPost={initialPost} />;
	} catch (err) {
		console.error(err);
	}
}
