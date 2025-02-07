"use client";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { LikeType } from "@/@types/like-type";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import { useState } from "react";
import { useUser } from "@/context/user-context";

type LikeProps = {
	postId: string;
};

export default function Like___({ postId }: LikeProps) {
	const [isLiked, setIsLiked] = useState(false);
	const { user } = useUser();

	// get like from database
	const {
		data: like,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["get-like", user?.id, postId],
		queryFn: async () =>
			await api.post("/post/like", {
				authorId: user?.id,
				postId: postId,
			}),
	});

	if (isLoading) return <div>Carregando...</div>;
	if (isError) return <div>Erro ao carregar like</div>;

	if (!like) return;

	const id = like.data.id as string;

	const { mutate: updateLike } = useMutation({
		mutationKey: ["update-like"],
		mutationFn: (updates: Partial<LikeType>) => api.put("/post/like", updates),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["update-like"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleClick = () => {
		setIsLiked(!isLiked);
		if (!user) {
			return;
		}

		updateLike({
			id: id,
			postId: postId,
			authorId: user.id,
			like: isLiked,
			createdAt: Date.now().toString(),
		});
	};

	return (
		<span className="flex items-center hover:text-indigo-600 transition-all animate-pulse hover:animate-bounce cursor-pointer">
			{isLiked ? (
				<>
					<BiSolidLike className="w-6 h-6" onClick={handleClick} />
				</>
			) : (
				<BiLike className="w-6 h-6" onClick={handleClick} />
			)}
		</span>
	);
}
