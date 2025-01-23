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
import { saveComment } from "@/services/comment-save";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface CommentProps {
	authorId: string;
	postId: string;
	isEditing?: boolean;
}

export function CommentDialog({ authorId, postId, isEditing = false }: CommentProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	const handleComment = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (!comment.trim()) {
			setError("O conteúdo não pode estar vazio");
			setIsLoading(false);
			return;
		}

		try {
			await saveComment({
				authorId,
				postId,
				description: comment,
			});

			toast.success("Comentário registrado com sucesso");
		} catch (err) {
			setError("Ocorreu um erro ao salvar o comentário. Tente novamente mais tarde.");
		} finally {
			setIsOpen(false);
			setIsLoading(false);
		}

		router.back();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					title="Deixe sua opinião! 😇 ↔ 😈"
					variant={"ghost"}
					className="flex items-center hover:text-indigo-600 transform transition-transform duration-300 cursor-pointer hover:scale-125"
				>
					<TfiCommentAlt size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col justify-between items-center gap-8 border-slate-600 dark:border-slate-800 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border rounded-xl w-full sm:max-w-[480px] text-slate-200">
				<DialogHeader>
					<DialogTitle>{isEditing ? 'Editar Post' : 'Criar Novo Post'}</DialogTitle>
					<DialogDescription>
						Faça  aqui seu comentário de forma respeitosa e cordial. Preze pela
						boa convivência e cordialidade.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleComment}>
					<div className="space-y-4">
						<Textarea
							id="name"
							className="w-full"
							placeholder="Digite seu comentário"
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							disabled={isLoading}
						/>
						{error && (
							<p className="text-red-500 text-sm">{error}</p>
						)}
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 w-4 h-4 animate-spin" />
										Salvando...
									</>
								) : (
									'Salvar'
								)}
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
