import { metadata } from "@/app/layout";
import SignIn from "./sign-in";

metadata.title.default = "Quiker News | Entrar";

export default async function PostsPage() {
	return <SignIn />;
}
