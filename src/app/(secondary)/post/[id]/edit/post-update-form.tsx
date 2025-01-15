"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Esquema de validação com Zod
const postSchema = z.object({
	id: z.string().optional(),
	title: z
		.string()
		.min(3, { message: "Título deve ter no mínimo 3 caracteres" }),
	content: z
		.string()
		.min(10, { message: "Conteúdo deve ter no mínimo 10 caracteres" }),
	imageUrl: z.string().url({ message: "Caminha da imagem inválida" }),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm({
	initialData,
	onSubmit,
}: {
	initialData?: PostFormData;
	onSubmit: (data: PostFormData) => Promise<void>;
}) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<PostFormData>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: initialData?.title || "",
			content: initialData?.content || "",
			imageUrl: initialData?.content || "",
		},
	});

	const handleFormSubmit = async (data: PostFormData) => {
		try {
			await onSubmit(data);
			router.push("/posts");
		} catch (error) {
			console.error("Erro ao salvar post:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<div>
				<input {...register("title")} placeholder="Título do Post" />
				{errors.title && <span>{errors.title.message}</span>}
			</div>

			<div>
				<textarea {...register("content")} placeholder="Conteúdo do Post" />
				{errors.content && <span>{errors.content.message}</span>}
			</div>

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Salvando..." : "Salvar"}
			</button>
		</form>
	);
}
