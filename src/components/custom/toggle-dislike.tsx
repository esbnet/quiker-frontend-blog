"use client";

import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ImSpinner9 } from "react-icons/im";
import type { LikeType } from "@/@types/like-type";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";

type LikeProps = {
	authorId: string;
	postId: string;
};

export function ToggleDisLike({ authorId, postId }: LikeProps) {
	const [disliked, setDisliked] = useState<boolean>();

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
		mutationKey: ["disliked", disliked],
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
			updateDislike({
				id: dislikeData.id,
				postId,
				authorId,
				dislike: !disliked,
				createdAt: Date.now().toString(),
			});
		}
	};

	// Renderizar componente
	if (isLoading) return <ImSpinner9 className="text-2xl animate-spin" />;
	if (isError) return <div>Erro ao carregar dislike</div>;

	return (
		<span
			title="Não gostei 🤮"
			className="flex items-center hover:text-indigo-600 transform transition-transform duration-300 cursor-pointer hover:scale-125"
		>
			<span className="text-white">{disliked}</span>
			{disliked ? (
				<BiSolidDislike className="w-6 h-6" onClick={handleClick} />
			) : (
				<BiDislike className="w-6 h-6" onClick={handleClick} />
			)}
		</span>
	);
}
