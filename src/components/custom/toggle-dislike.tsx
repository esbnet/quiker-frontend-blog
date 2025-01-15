"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiDislike, BiSolidDislike } from "react-icons/bi";

import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import type { LikeType } from "@/types/like-type";

type LikeProps = {
	authorId: string;
	postId: string;
};

export function ToggleDisLike({ authorId, postId }: LikeProps) {
	const [disliked, setDisliked] = useState<boolean>(false);

	// Obter dados de dislike do banco
	const {
		data: dislikeData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["get-dislike", authorId, postId],
		queryFn: async () => {
			const response = await api.post("/post/like", {
				authorId,
				postId,
			});
			return response.data;
		},
	});

	// Atualizar dislike no banco
	const { mutate: updateDislike } = useMutation({
		mutationFn: (updates: LikeType) => api.put("/post/dislike", updates),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-dislike", authorId, postId],
			});
			queryClient.invalidateQueries({
				queryKey: ["get-like", authorId, postId],
			});
			queryClient.invalidateQueries({
				queryKey: ["post", postId],
			});
		},
		onError: (error) => {
			console.error("Erro ao atualizar o dislike:", error);
		},
	});

	// Sincronizar estado inicial
	useEffect(() => {
		if (dislikeData) {
			setDisliked(dislikeData.dislike);
		}
	}, [dislikeData]);

	// Clique para alterar o dislike
	const handleClick = () => {
		if (dislikeData) {
			updateDislike(
				{
					id: dislikeData.id,
					postId,
					authorId,
					dislike: !disliked,
					createdAt: Date.now().toString(),
				},
				{
					onSuccess: () => {
						setDisliked((prev) => !prev);
					},
				},
			);
		}
	};

	// Renderizar componente
	if (isLoading) return <div>Carregando...</div>;
	if (isError) return <div>Erro ao carregar dislike</div>;

	return (
		<span className="flex items-center hover:text-indigo-600 transition-all animate-pulse hover:animate-bounce cursor-pointer">
			{disliked ? (
				<BiSolidDislike className="w-6 h-6" onClick={handleClick} />
			) : (
				<BiDislike className="w-6 h-6" onClick={handleClick} />
			)}
		</span>
	);
}
