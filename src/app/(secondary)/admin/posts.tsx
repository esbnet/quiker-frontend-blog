"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

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

const Posts = () => {
	const [posts, setPosts] = useState<PostProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// Em um caso real, isso seria substituído por fetch('sua-api/posts')
				const samplePosts = await axios.get("/api/post/list");
				setPosts(samplePosts.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	// if (loading) {
	// 	return (
	// 		<div className="flex justify-center items-center h-64">
	// 			<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
	// 		</div>
	// 	);
	// }

	return (
		<div className="mx-auto py-10 container">
			{loading ? (
				<div>Loading...</div>
			) : (
				<DataTable columns={columns} data={posts} />
			)}
		</div>
	);
};

export default Posts;
