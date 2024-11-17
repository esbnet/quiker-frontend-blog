import { randomUUID } from "node:crypto";
import { type Post, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Post[]> {
	// Fetch data from your API here.
	return [
		{
			id: randomUUID(),
			title: "Lorem ipsum dolor sit amet",
			description: "Lorem ipsum dolor sit amet",
			imageUrl: "https://via.placeholder.com/150",
			category: "mobile",
			createdAt: new Date().toISOString(),
			author: {
				id: randomUUID(),
				name: "John Doe",
				email: "jPm8D@example.com",
				password: "123456",
				createdAt: new Date().toISOString(),
			},
		},
		{
			id: randomUUID(),
			title: "Lorem ipsum dolor sit amet 2",
			description: "Lorem ipsum dolor sit amet",
			imageUrl: "https://via.placeholder.com/150",
			category: "front-end",
			createdAt: new Date().toISOString(),
			author: {
				id: randomUUID(),
				name: "John Doe",
				email: "jPm8D@example.com",
				password: "123456",
				createdAt: new Date().toISOString(),
			},
		},
	];
}

export default async function Page() {
	const data = await getData();

	return (
		<div className="mx-auto py-10 container">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
