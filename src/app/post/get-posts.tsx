import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import useControllers from "@/hooks/useControllers";
import type { PostProps } from "../types/types";
import PostsList from "./posts-list";

export default async function GetPosts() {
	const { postController } = useControllers();

	try {
		const response = postController.getAllPosts();
		const data = await response.then((response) => response);

		if (!data?.length) {
			return (
				<Alert>
					<AlertTitle>Nenhum post encontrado</AlertTitle>
					<AlertDescription>
						Não há posts disponíveis no momento.
					</AlertDescription>
				</Alert>
			);
		}

		// const { data } = await api.get< PostProps[]>("/posts");

		// Certifique-se de que os dados estão serializados corretamente
		const serializedPosts = data.map((post: PostProps) => ({
			id: post.id,
			title: post.title,
			description: post.description,
			imageUrl: post.imageUrl,
			category: post.category,
			createdAt: post.createdAt,
			views: post.views,
			likes: post.likes,
			dislikes: post.dislikes,
			author: post.author,
		}));

		if (!serializedPosts?.length) {
			return (
				<Alert>
					<AlertTitle>Nenhum post encontrado</AlertTitle>
					<AlertDescription>
						Não há posts disponíveis no momento.
					</AlertDescription>
				</Alert>
			);
		}

		return (
			<section className="w-full">
				<PostsList posts={serializedPosts} />
			</section>
		);
	} catch (error) {
		return (
			<Alert variant="destructive">
				<AlertTitle>Erro</AlertTitle>
				<AlertDescription>
					{error instanceof Error ? error.message : "Erro ao carregar os posts"}
				</AlertDescription>
			</Alert>
		);
	}
}
