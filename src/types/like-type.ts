// types/index.ts

export type LikeType = {
	id?: string;
	authorId: string;
	postId: string;
	like?: boolean;
	dislike?: boolean;
	createdAt: string;
};
