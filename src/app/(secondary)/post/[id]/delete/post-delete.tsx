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

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { api } from "@/lib/api";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeletePostProps {
	postId: string;
	onDelete?: () => void;
}

export function DeletePost({ postId, onDelete }: DeletePostProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user } = useUser();

	const handleDelete = async () => {
		setIsDeleting(true);
		setError(null);

		try {
			await api.delete("/post", { data: { postId, authorId: user?.id } });

			toast.success("Post Deletado com sucesso");

			// Callback opcional após deletar
			if (onDelete) {
				onDelete();
			}

			// Redirecionar para a lista de posts
			router.push("/");
			router.refresh();
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
						variant="destructive"
						size="sm"
						className="justify-center items-center hover:bg-indigo-600 rounded-full w-10 h-10 hover:font-bold text-slate-600 hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
					>
						<Trash2 className="" size={18} />
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent className="flex flex-col justify-between items-center gap-8 border-slate-600 dark:border-slate-800 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border rounded-xl w-full sm:max-w-[480px] text-slate-200">
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
						<AlertDialogDescription>
							Tem certeza que deseja excluir este post? Esta ação excluirá
							também todos o os comentários e não pode ser desfeita.
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
