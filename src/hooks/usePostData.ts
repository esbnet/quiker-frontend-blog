import useControllers from "@/hooks/useControllers";
import { useQuery } from "@tanstack/react-query";

const loadData = async () => {
	const { postController } = useControllers();
	const response = await postController.getAllPosts();
	return response.map((post) => post);
};

export function usePostData() {
	const query = useQuery({
		queryKey: ["posts-data"],
		queryFn: loadData,
	});

	return query;
}
