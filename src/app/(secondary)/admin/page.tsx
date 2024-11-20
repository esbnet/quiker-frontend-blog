"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Posts from "./posts";

type AuthorProps = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
};
type PostProps = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	author: AuthorProps;
};

export default async function Blog() {
	function newPost() {
		redirect("/admin/new");
	}

	function editPost(id: string) {
		redirect(`/admin/edit/${id}`);
	}

	function deletePost(id: string) {
		console.log(id);
	}

	function logOut() {
		toast.success("Saindo...");
	}

	return (
		<>
			<div className="flex justify-between">
				<h1 className="font-extrabold text-3xl">Postagem</h1>
				<div className="flex gap-4">
					<Button variant={"outline"} onClick={newPost}>
						Novo Post
					</Button>
					<Button variant={"outline"} onClick={logOut}>
						<span className="mr-2">👋</span>
						Sair
					</Button>
				</div>
			</div>
			<Posts />
		</>
	);
}
