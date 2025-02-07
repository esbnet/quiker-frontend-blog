"use client";

import type { PostNewProps } from "@/@types/post-type";
import { create } from "zustand";

type PostStoreProps = {
	post: PostNewProps | null;
	setPost: (post: PostNewProps) => void;
};

// Store
const useUserStore = create<PostStoreProps>((set) => ({
	post: {} as PostNewProps,

	setPost: (post) => {
		set({ post });
	},
}));

export default useUserStore;
