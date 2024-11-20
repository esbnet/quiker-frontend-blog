// post/PostsPageClient.tsx
"use client";

import type { PostProps } from "@/types/types";
import { Post } from "./post";

interface PostsPageClientProps {
	initialPost: PostProps;
}

export default function PostPageClient({ initialPost }: PostsPageClientProps) {
	return <Post initialPost={initialPost} />;
}
