// types/index.ts

import type { AuthorProps } from "./author-type";
import type { Post } from "./post-type";

export type CommentProps = {
	id: string;
	user: AuthorProps;
	postId: Post["id"];
	description: string;
	createdAt: string;
	removed: boolean;
};
