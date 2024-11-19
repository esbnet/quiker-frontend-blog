"use client";

import PostForm from "@/app/(private)/admin/new/post-form";
import { useUser } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function NewPost() {
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
