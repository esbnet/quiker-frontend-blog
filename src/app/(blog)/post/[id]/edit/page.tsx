import { EditPost } from "./edit-page";
import { metadata } from "@/app/layout";

metadata.title.default = "Quiker News | Editar post";

export default async function Page() {
	return <EditPost />;
}
