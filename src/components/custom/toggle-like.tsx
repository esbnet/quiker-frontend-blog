"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";

import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import type { LikeType } from "@/types/like-type";

type LikeProps = {
	authorId: string;
	postId: string;
};

export function ToggleLike({ authorId, postId }: LikeProps) {
	const [liked, setLiked] = useState<boolean>();

	// Obter dados de like do banco
	const {
		data: likeData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["get-like", authorId, postId],
		queryFn: async () => {
			const response = await api.post("/post/like", {
				authorId,
				postId,
			});
			return response.data;
		},
	});

	// Atualizar like no banco
	const { mutate: updateLike } = useMutation({
		mutationKey: ["liked", liked],
		mutationFn: (updates: LikeType) => api.put("/post/like", updates),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-like", authorId, postId],
			});
			queryClient.invalidateQueries({
				queryKey: ["get-dislike", authorId, postId],
			});
			queryClient.invalidateQueries({
				queryKey: ["post", postId],
			});
		},
		onError: (error) => {
			console.error("Erro ao atualizar o like:", error);
		},
	});

	// Sincronizar estado inicial
	useEffect(() => {
		if (likeData) {
			setLiked(likeData.like);
		}
	}, [likeData]);

	// Clique para alterar o like
	const handleClick = () => {
		if (likeData) {
			updateLike({
				id: likeData.id,
				postId,
				authorId,
				like: !liked,
				createdAt: Date.now().toString(),
			});
		}
	};

	// Renderizar componente
	if (isLoading) return <div>Carregando...</div>;
	if (isError) return <div>Erro ao carregar like</div>;

	return (
		<span
			title="Gostei desse post. 👏 "
			className="flex items-center hover:text-indigo-600 transform transition-transform duration-300 cursor-pointer hover:scale-125"
		>
			{liked ? (
				<BiSolidLike className="w-6 h-6" onClick={handleClick} />
			) : (
				<BiLike className="w-6 h-6" onClick={handleClick} />
			)}
		</span>
	);
}
