// components/DeletePost.tsx
"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeletePostProps {
	postId: string;
	postAuthorId: string;
	onDelete?: () => void;
}

export function DeletePost({
	postId,
	onDelete,
	postAuthorId,
}: DeletePostProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user } = useUser();

	if (user === null) {
		return redirect("/sign-in");
	}

	const { mutate: postEdit } = useMutation({
		mutationKey: ["post-delete", postId, postAuthorId],
		mutationFn: ({
			postId,
			postAuthorId,
		}: { postId: string; postAuthorId: string }) =>
			api.delete("/post/delete", {
				data: { postId, postAuthorId },
			}),
		onSuccess: () => {
			toast.success("Post deletado com sucesso");

			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
		},
		onError: (error) => {
			toast.error(`Erro ao deletar o post: ${error}`);
			console.error("Erro ao deletar o post:", error);
		},
	});

	const handleDelete = async () => {
		setIsDeleting(true);
		setError(null);

		try {
			postEdit({ postId, postAuthorId });

			// Callback opcional após deletar
			if (onDelete) {
				onDelete();
			}

			// Redirecionar para a lista de posts
			router.replace("/");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || "Erro ao deletar o post");
			} else {
				setError("Erro ao deletar o post");
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						title="Excluir post 🗑️"
						variant="destructive"
						size="sm"
						className="flex items-center hover:text-indigo-600 transform transition-transform duration-300 cursor-pointer hover:scale-125"
					>
						<Trash2 className="" size={18} />
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent className="flex flex-col justify-between items-center gap-8 border-slate-600 dark:border-slate-800 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border rounded-xl w-full sm:max-w-[480px] text-slate-200">
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
						<AlertDialogDescription>
							Tem certeza que deseja excluir este post? Esta ação excluirá
							definitivamente o poar e todo o histórico dele.
						</AlertDialogDescription>
					</AlertDialogHeader>

					{error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-red-500 hover:bg-red-600"
						>
							{isDeleting ? "Excluindo..." : "Sim, excluir"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
