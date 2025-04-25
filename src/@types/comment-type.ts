// types/index.ts

import type { AuthorProps } from "./author-type";

export type CommentProps = {
	id: string;
	author: AuthorProps;
	postId: string;
	content: string;
	createdAt: string;
	removed: boolean;
};
