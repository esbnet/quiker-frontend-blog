import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DeletePost } from "./post-delete";

export function PostActions(postId: string) {
	const router = useRouter();
	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				onClick={() => router.push(`/post/${postId}/edit`)}
			>
				Editar
			</Button>
			<DeletePost
				postId={postId}
				onDelete={() => {
					// Ações adicionais após deletar, se necessário
					console.log("Post deletado com sucesso");
				}}
			/>
		</div>
	);
}
