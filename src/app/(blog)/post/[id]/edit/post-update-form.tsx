"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validação com Zod
const postSchema = z.object({
	id: z.string().optional(),
	title: z
		.string()
		.min(3, { message: "Título deve ter no mínimo 3 caracteres" }),
	content: z
		.string()
		.min(10, { message: "Conteúdo deve ter no mínimo 10 caracteres" }),
	imageUrl: z.string().url({ message: "Caminho da imagem inválido" }),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm___({
	initialData,
	onSubmit,
}: {
	initialData?: PostFormData;
	onSubmit: (data: PostFormData) => Promise<void>;
}) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<PostFormData>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: initialData?.title || "",
			content: initialData?.content || "",
			imageUrl: initialData?.imageUrl || "",
		},
	});

	const imageUrl = watch("imageUrl");

	const handleFormSubmit = async (data: PostFormData) => {
		try {
			setError(null);
			await onSubmit(data);
			router.push("/posts");
		} catch (error) {
			console.error("Erro ao salvar post:", error);
			setError("Ocorreu um erro ao salvar o post. Tente novamente.");
		}
	};
	// Previne navegação se houver alterações não salvas
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isDirty) {
				e.preventDefault();
				e.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty]);

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{error && (
				<div className="bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700">
					{error}
				</div>
			)}

			<div className="flex flex-col gap-2">
				<input
					{...register("title")}
					placeholder="Título do Post"
					className="p-2 border rounded-md"
				/>
				{errors.title && (
					<span className="text-red-500 text-sm">{errors.title.message}</span>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<textarea
					{...register("content")}
					placeholder="Conteúdo do Post"
					className="p-2 border rounded-md min-h-[200px]"
				/>
				{errors.content && (
					<span className="text-red-500 text-sm">{errors.content.message}</span>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<input
					{...register("imageUrl")}
					placeholder="URL da Imagem"
					className="p-2 border rounded-md"
				/>
				{errors.imageUrl && (
					<span className="text-red-500 text-sm">
						{errors.imageUrl.message}
					</span>
				)}
			</div>

			{imageUrl && (
				<div className="relative w-full h-48">
					<Image
						src={imageUrl}
						alt="Preview"
						fill
						className="rounded-md object-cover"
						onError={(e) => {
							e.currentTarget.style.display = "none";
						}}
					/>
				</div>
			)}

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 px-4 py-2 rounded-md text-white"
			>
				{isSubmitting ? "Salvando..." : "Salvar"}
			</button>
		</form>
	);
}
