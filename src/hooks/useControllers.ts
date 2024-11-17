import type { AuthorProps, PostProps } from "@/app/types/types";

import { AuthorController } from "@/app/controller/posts/author-controller";
import { PostController } from "@/app/controller/posts/post-controller";

// hooks/useControllers.ts
const useControllers = () => {
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

export default useControllers;
