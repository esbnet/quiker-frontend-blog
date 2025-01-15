"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { BiNews } from "react-icons/bi";
import { TiCancelOutline } from "react-icons/ti";
import { addPost } from "../../../../../services/post-add";

const schema = z.object({
	title: z
		.string()
		.min(3, { message: "O título é obrigatório e no mínimo 3 caracteres." })
		.max(150, { message: "O título é obrigatório e no máxio 150 caracteres" }),
	content: z
		.string()
		.min(50, { message: "A descrição deve conter no mínimo 50 caracteres." })
		.max(2048, {
			message: "A descrição deve conter no máxio 2048 caracteres.",
		}),
	imageUrl: z
		.string()
		.url({ message: "Caminha da imagem inválido" })
		.min(1, { message: "O campo é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function PostForm() {
	const { user } = useUser();
	const authorId = user?.id;

	const route = useRouter();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		mode: "all",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const handleAddPost: SubmitHandler<FormData> = async (data) => {
		const post = {
			authorId: authorId as string,
			...data,
		};

		try {
			await addPost(post);

			toast.success("Post criado com sucesso");
		} catch (error) {
			toast.error(`Erro ao criar o Post: ${error}`);
		}

		reset();

		route.push("/");
	};

	return (
		<div className="flex justify-center m-auto w-full h-[72vh]">
			<form
				onSubmit={handleSubmit(handleAddPost)}
				className="flex flex-col gap-4 w-full"
			>
				<label htmlFor="title">Título</label>
				<div>
					<Input {...register("title")} type="text" placeholder="título" />
					{errors.title && (
						<p className="text-red-500 text-sm">{errors.title.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="content">Artigo</label>
					{/* <Editor /> */}
					<Textarea
						rows={10}
						placeholder="descrição"
						{...register("content")}
					/>
					{errors.content && (
						<p className="text-red-500 text-sm">{errors.content.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="imageUrl">Imagem</label>
					<div className="flex gap-2">
						<Input
							type="text"
							placeholder="informa a url ou envie do seu dispositivo "
							{...register("imageUrl")}
						/>
						<Button type="button" variant={"outline"}>
							arquivo
						</Button>
					</div>
				</div>
				{errors.imageUrl && (
					<p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
				)}

				<Separator className="my-4" />
				<div className="flex gap-2">
					<Button
						className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
						type="submit"
						title="Acessar área administrativa"
					>
						<BiNews className="mr-2" />
						Publicar
					</Button>
					<Button
						onClick={() => route.back()}
						className="flex-1 bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
						title="Acessar área administrativa"
					>
						<TiCancelOutline className="mr-2" />
						Cancelar
					</Button>
				</div>
			</form>
		</div>
	);
}
