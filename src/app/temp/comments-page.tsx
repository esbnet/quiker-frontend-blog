import { getComments } from "../../services/commets-get";

export default async function CommentsPage({ id }: { id: string }) {
	const comments = await getComments(id);

	return; // <CommentsPageClient initialComments={comments} id={id} />;
}
