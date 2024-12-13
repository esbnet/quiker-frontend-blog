import type { Author } from "next/dist/lib/metadata/types/metadata-types";
import type { AuthorProps } from "./author-type";
import type { CommentProps } from "./comment-type";

export type PostProps = {
	id: string;
	author: AuthorProps;
	title: string;
	description: string;
	imageUrl: string;
	views?: number;
	likes?: number;
	dislikes?: number;
	createdAt: string;
	comments?: CommentProps[];
};

export type PostNewProps = {
	id?: string;
	authorId: string;
	title: string;
	description: string;
	imageUrl: string;
	views?: number;
	likes?: number;
	dislikes?: number;
	comments?: CommentProps[];
};

export type PostUpdateProps = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	userId: string;
};

export interface Posta {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	author: Author;
}

export interface PostResponse {
	data: PostProps[];
}
