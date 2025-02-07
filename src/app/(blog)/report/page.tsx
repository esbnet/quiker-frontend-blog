import Posts from "./posts";
import { metadata } from "@/app/layout";

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

metadata.title.default = "Quiker News | Estatística";

export default async function Report() {
	return (
		<>
			<div className="flex justify-between">
				<h1 className="font-extrabold text-3xl">Estatística</h1>
			</div>
			<Posts />
		</>
	);
}
