import PostPage from "./post-page";
import { metadata } from "@/app/layout";

metadata.title.default = "Quiker News | Post";

export default async function Page() {
	return <PostPage />;
}
