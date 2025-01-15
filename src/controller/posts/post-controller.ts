// controllers/PostController.ts

import { PostService } from "@/services/postService";
import type { PostProps } from "../../types/comment-type";
import type { AuthorController } from "./author-controller";

export class PostController {
	private posts: PostProps[] = [];
	private postService: PostService;
	private authorController: AuthorController;

	constructor(authorController: AuthorController) {
		this.authorController = authorController;
		this.postService = new PostService();
	}

	async createPost(
		postData: Omit<PostProps, "id" | "createdAt">,
	): Promise<PostProps> {
		const author = await this.authorController.getAuthorById(
			postData.author.id,
		);
		if (!author) {
			throw new Error("Author not found");
		}

		const newPost: PostProps = {
			id: crypto.randomUUID(),
			...postData,
			createdAt: new Date().toISOString(),
		};

		this.posts.push(newPost);
		return newPost;
	}

	async getPostById(id: string): Promise<PostProps> {
		try {
			return await this.postService.getPostById(id);
		} catch (error) {
			throw new Error("Failed to fetch post");
		}
	}

	async registerView(id: string): Promise<PostProps> {
		try {
			return await this.postService.registerView(id);
		} catch (error) {
			throw new Error("Failed to fetch post");
		}
	}

	async getAllPosts(): Promise<PostProps[]> {
		try {
			const posts = await this.postService.getAllPosts();
			return posts;
		} catch (error) {
			throw new Error("Failed to fetch posts");
		}
	}

	async getPostsByAuthor(authorId: string): Promise<PostProps[]> {
		return this.posts.filter((post) => post.author.id === authorId);
	}

	// async getPostsByCategory(category: string): Promise<PostProps[]> {
	// 	return this.posts.filter((post) => post.category === category);
	// }

	async updatePost(
		id: string,
		postData: Partial<Omit<PostProps, "id" | "createdAt">>,
	): Promise<PostProps | null> {
		const postIndex = this.posts.findIndex((post) => post.id === id);
		if (postIndex === -1) return null;

		if (postData.author) {
			const author = await this.authorController.getAuthorById(
				postData.author.id,
			);
			if (!author) {
				throw new Error("Author not found");
			}
		}

		const updatedPost = {
			...this.posts[postIndex],
			...postData,
		};

		this.posts[postIndex] = updatedPost;
		return updatedPost;
	}

	async deletePost(id: string): Promise<boolean> {
		const initialLength = this.posts.length;
		this.posts = this.posts.filter((post) => post.id !== id);
		return this.posts.length !== initialLength;
	}

	async searchPosts(query: string): Promise<PostProps[]> {
		const lowercaseQuery = query.toLowerCase();
		return this.posts.filter(
			(post) =>
				post.title.toLowerCase().includes(lowercaseQuery) ||
				post.description.toLowerCase().includes(lowercaseQuery),
		);
	}
}
