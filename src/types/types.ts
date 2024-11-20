// types/index.ts
export type AuthorProps = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
};

export type PostProps = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	views: number;
	likes: number;
	dislikes: number;
	author: AuthorProps;
	comments: CommentProps[];
};

export type CommentProps = {
	id: string;
	user: AuthorProps;
	postId: PostProps;
	description: string;
	createdAt: string;
	removed: boolean;
};
