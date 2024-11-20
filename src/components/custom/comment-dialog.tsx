import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { saveComment } from "@/app/(secondary)/post/[id]/save-post";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { Textarea } from "../ui/textarea";

interface CommentProps {
	authorId: string;
	postId: string;
}

export function CommentDialog({ authorId, postId }: CommentProps) {
	const [isOpen, setisOpen] = useState(false);

	const [comment, setComment] = useState("");

	const handleComment = async () => {
		await saveComment({
			authorId,
			postId,
			description: comment,
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setisOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					className="flex items-center hover:text-indigo-600"
				>
					Comentar
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col justify-between items-center gap-8 border-slate-600 dark:border-slate-800 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border rounded-xl w-full sm:max-w-[480px] text-slate-200">
				<DialogHeader>
					<DialogTitle>Comentar no artigo</DialogTitle>
					<DialogDescription>
						Faça seu comentario aqui de forma respeitosa e cordial. Preze pela
						boa convivência e cordialidade.
					</DialogDescription>
				</DialogHeader>
				<div className="gap-2 w-full felx">
					{/* <Label htmlFor="name" className="">
						Comentário
					</Label> */}
					<div className="items-center gap-4 w-full">
						<Textarea
							id="name"
							className="w-full"
							placeholder="Digite seu comentário"
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>
				</div>
				<Button
					onClick={handleComment}
					variant={"ghost"}
					title="Enviar comentário"
					disabled={false}
					className="hover:text-indigo-600"
				>
					<MdSend size={20} className="mr-2" />
				</Button>
			</DialogContent>
		</Dialog>
	);
}
