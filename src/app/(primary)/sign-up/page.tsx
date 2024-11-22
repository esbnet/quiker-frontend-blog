import { metadata } from "@/app/layout";
import SignUp from "./sign-up";

metadata.title.default = "Quiker News | Cadastro";

export default async function PostsPage() {
	return <SignUp />;
}
