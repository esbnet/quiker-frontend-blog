interface Author {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
}

export interface Post {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	author: Author;
}
export interface PostResponse {
	data: Post[];
}
