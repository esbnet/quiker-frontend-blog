import { getComments } from "../(secondary)/post/[id]/commets-get";

export default async function CommentsPage({ id }: { id: string }) {
	const comments = await getComments(id);

	return; // <CommentsPageClient initialComments={comments} id={id} />;
}
