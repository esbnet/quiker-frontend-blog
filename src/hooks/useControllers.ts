import { AuthorController } from "@/controller/posts/author-controller";
import type { AuthorProps } from "@/@types/author-type";
import { PostController } from "@/controller/posts/post-controller";
import type { PostProps } from "@/@types/post-type";

// hooks/useControllers.ts
const useControllersA = () => {
	const authorController = new AuthorController();
	const postController = new PostController(authorController);

	return {
		authorController,
		postController,
		async createNewPostWithAuthor(
			authorData: Omit<AuthorProps, "id" | "createdAt">,
			postData: Omit<Omit<PostProps, "id" | "createdAt">, "author">,
		) {
			const author = await authorController.createAuthor(authorData);
			const post = await postController.createPost({
				...postData,
				author,
			});
			return { author, post };
		},
	};
};

export default useControllersA;
