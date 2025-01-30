import { columns } from "./columns";
import { DataTable } from "./data-table";

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
	content: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	author: AuthorProps;
};

export default function PostsTable({ posts }: { posts: PostProps[] }) {
	return (
		<div className="mx-auto py-10 container">
			<DataTable columns={columns} data={posts} />
		</div>
	);
}
