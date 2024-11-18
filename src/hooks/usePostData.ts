import useControllers from "@/hooks/useControllers";
import { useQuery } from "@tanstack/react-query";

const getPosts = async () => {
	const { postController } = useControllers();
	const response = await postController.getAllPosts();
	return response;
};

export function usePostData() {
	const query = useQuery({
		queryKey: ["posts-data"],
		queryFn: getPosts,
	});

	return {
		...query,
		posts: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
	};
}
