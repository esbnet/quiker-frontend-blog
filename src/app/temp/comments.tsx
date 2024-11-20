import { getComments } from "../(secondary)/post/[id]/get-commets";

export default async function CommentPage({ id }: { id: string }) {
	const initialComments = await getComments(id);

	return; // <CommentsPageClient initialComments={initialComments} id={id} />;
}
