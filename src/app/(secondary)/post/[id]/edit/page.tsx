import { getPost } from "@/services/post-get";
import { EditPostForm } from "./edit-page";

interface PostPageProps {
	params: { id: string };
}
export default async function EditPage({ params }: PostPageProps) {
	const { id } = params;

	const initialPost = await getPost(id);

	return <EditPostForm initialPost={initialPost} />;
}
