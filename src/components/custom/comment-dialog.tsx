import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import { Textarea } from "../ui/textarea";

interface CommentParams {
	authorId: string;
	postId: string;
	isEditing?: boolean;
}

export function CommentDialog({
	authorId,
	postId,
	isEditing = false,
}: CommentParams) {
	const [isOpen, setIsOpen] = useState(false);
	const [comment, setComment] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState("");

	const { user } = useUser();
	const router = useRouter();

	// Atualizar like no banco
	const { mutate: commentData } = useMutation({
		mutationKey: ["comment", authorId, postId],
		mutationFn: (updates: {
			authorId: string | undefined;
			postId: string;
			content: string;
		}) => api.post("/comment/new", updates),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["post", postId],
			});
		},

		onError: (error) => {
			console.error("Erro ao atualizar o like:", error);
		},
	});

	const handleComment = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		setError("");

		if (!comment.trim()) {
			setError("O conteúdo não pode estar vazio");
			setIsSaving(false);
			return;
		}

		commentData({
			authorId: user?.id,
			postId,
			content: comment,
		});

		setIsOpen(false);
		setIsSaving(false);
		setComment("");

		router.refresh();
	};

	const handleCancel = () => {
		setIsOpen(false);
		setIsSaving(false);
		setComment("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					title="Deixe sua opinião! 😇 ↔ 😈"
					variant={"ghost"}
					className="flex items-center hover:text-indigo-600 hover:scale-125 transition-transform duration-300 cursor-pointer transform"
				>
					<TfiCommentAlt size={18} />
				</Button>
			</DialogTrigger>

			<DialogContent className="flex flex-col justify-between items-center gap-8 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border border-slate-600 dark:border-slate-800 rounded-xl w-full sm:max-w-[480px] text-slate-200">
				<DialogHeader>
					<DialogTitle className="border-slate-600 dark:border-slate-800 boder-b-2">
						{isEditing ? "Editar Comentário" : "Deixe Aqui Seu Comentário"}
					</DialogTitle>
					<DialogDescription>
						Faça seu comentário de forma respeitosa e cordial. Preze pela boa
						convivência e cordialidade.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleComment} className="flex flex-col gap-4 w-full">
					<div className="space-y-4">
						<Textarea
							id="name"
							className="w-full"
							placeholder="Digite seu comentário"
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							disabled={isSaving}
						/>
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<DialogFooter>
							<Button type="submit" disabled={isSaving} variant={"outline"}>
								{isSaving ? (
									<>
										<Loader2 className="mr-2 w-4 h-4 animate-spin" />
									</>
								) : (
									"Salvar"
								)}
							</Button>
							<Button type="submit" onClick={handleCancel} variant="outline">
								Cancelar
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
