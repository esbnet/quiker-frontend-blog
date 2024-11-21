"use client";

import PostForm from "@/app/(secondary)/post/new/post-form";
import { useUser } from "@/context/AuthContext";
import type { PostProps } from "@/types/types";
import { redirect } from "next/navigation";

interface NewPostProps {
	post: PostProps;
}

export default function NewPost({ post }: NewPostProps) {
	const { user } = useUser();

	if (user === null) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex flex-col justify-between items-center mb-6 w-full">
			<PostForm />
		</div>
	);
}
