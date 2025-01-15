"use client";

import PostForm from "@/app/(secondary)/post/[id]/new/post-form";
import { useUser } from "@/context/user-context";
import type { PostProps } from "@/types/post-type";
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
