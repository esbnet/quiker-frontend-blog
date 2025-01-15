// types/index.ts

import type { AuthorProps } from "./author-type";

export type CommentProps = {
	id: string;
	user: AuthorProps;
	postId: string;
	description: string;
	createdAt: string;
	removed: boolean;
};
