import PostForm from "../../post/[id]/new/post-form";

export default function NewPost() {
	return (
		<div className="flex flex-col justify-between items-center mb-6 w-full">
			<PostForm />
		</div>
	);
}
