import useControllers from "@/hooks/useControllers";

export async function getPosts() {
	const { postController } = useControllers();

	const posts = await postController.getAllPosts();

	return posts;
}
