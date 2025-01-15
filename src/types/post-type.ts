import type { AuthorProps } from "./author-type";
import type { CommentProps } from "./comment-type";

export type PostProps = {
	id: string;
	author: AuthorProps;
	title: string;
	content: string;
	imageUrl: string;
	views: number;
	likesCount: number;
	dislikesCount: number;
	createdAt: string;
	comments?: CommentProps[];
};

export type PostNewProps = {
	id?: string;
	authorId: string;
	title: string;
	content: string;
	imageUrl: string;
	views: number;
	likesCount: number;
	dislikesCount: number;
	commentsCount: CommentProps[];
};

export type PostUpdateProps = {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	userId: string;
};

// export interface Posta {
// 	id: string;
// 	title: string;
// 	content: string;
// 	imageUrl: string;
// 	category: string;
// 	createdAt: string;
// 	author: AuthorProps;
// }

export interface PostResponse {
	data: PostProps[];
}
