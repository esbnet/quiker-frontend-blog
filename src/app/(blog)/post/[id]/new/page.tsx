import PostForm from "@/components/custom/post-form";
import type { PostProps } from "@/@types/post-type";
import { metadata } from "@/app/layout";

interface NewPostProps {
	post: PostProps;
}

metadata.title.default = "Quiker News | Novo post";

export default function NewPost({ post }: NewPostProps) {
	return (
		<div className="flex flex-col justify-between items-center mb-6 w-full">
			<PostForm />
		</div>
	);
}
