// types/index.ts
export type AuthorProps = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
	avatar: string;
};

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

export type CommentProps = {
	id: string;
	user: AuthorProps;
	postId: PostProps;
	description: string;
	createdAt: string;
	removed: boolean;
};

export type PostUpdateProps = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	userId: string;
};
