import { getPost } from "../get-post";
import { EditPostForm } from "./edit-page";

interface PostPageProps {
	params: { id: string };
}
export default async function EditPage({ params }: PostPageProps) {
	const { id } = await params;

	const initialPost = await getPost(id);

	return <EditPostForm initialPost={initialPost} />;
}
