import { create } from "zustand";
import type { PostProps } from "../types/post-type";

type PostStore = {
	post: (id: string) => void;
	posts: () => PostProps[];
	setPosts: (posts: PostProps[]) => void;
	addPost: (post: PostProps) => void;
	removePost: (id: string) => void;
	updatePost: (id: string) => void;
};

// Store
export const usePostsStore = create<PostStore>((set) => ({
	post: (id) => {
		set((state) => ({
			posts: state.posts.filter((post) => post.id === id),
		}));
	},

	posts: () => {
		return [] as PostProps[];
	},

	setPosts: (posts) => {
		set({ posts });
	},

	addPost: (post) => {
		set((state) => ({
			posts: [...state.posts, post],
		}));
	},

	removePost: (id) => {
		set((state) => ({
			posts: state.posts.filter((post) => post.id !== id),
		}));
	},

	updatePost: (id) => {
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === id) {
					return {
						...post,
						views: post.views ? post.views + 1 : 1,
					};
				}
				return post;
			}),
		}));
	},
}));
