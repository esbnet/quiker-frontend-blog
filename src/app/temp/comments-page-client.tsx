// comment/CommentsPageClient.tsx
"use client";

import type { CommentProps } from "@/types/types";

interface CommentPageClientProps {
	initialComments: CommentProps[];
	id: string;
}

export default function CommentPageClient(
	{ initialComments }: CommentPageClientProps,
	id: string,
) {
	return;
	// return <CommentsList initialComments={initialComments} id={id} />;
}
