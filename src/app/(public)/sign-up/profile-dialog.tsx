"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";

import { updateUser } from "@/services/user-update";

import type { AuthorProps } from "@/@types/author-type";
import { useUser } from "@/context/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
	name: z
		.string()
		.min(3, { message: "O título é obrigatório e no mínimo 3 caracteres." })
		.max(150, { message: "O título é obrigatório e no máxio 150 caracteres" }),
	email: z.string().email({ message: "Email inválido" }),
});

type FormData = z.infer<typeof schema>;

export function ProfileDialog() {
	const [isOpen, setisOpen] = useState(false);
	const { user, setUser } = useUser();
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
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
		},
	});

	if (user === null) {
		return redirect("/sign-in");
	}

	const handleEditProfile: SubmitHandler<FormData> = async (data) => {
		const postData = {
			id: user?.id,
			name: data.name,
			email: data.email,
		} as AuthorProps;

		try {
			await updateUser(postData);
			toast.success("Usuário atualizado com sucesso", {});
			setisOpen(false);
			setUser(postData);
		} catch (error) {
			toast.error(`Erro ao atualizar o Post: ${error}`);
		}
		route.refresh();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setisOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					className="flex flex-col justify-center items-center"
					title="Editar Perfil"
				>
					<Image
						src="https://github.com/esbnet.png"
						alt=""
						width={40}
						height={40}
						className="shadow-lg md:mb-0 hover:border hover:border-slate-600 rounded-full outline outline-1 outline-slate-700 outline-offset-2 w-8 md:w-10 h-8 md:h-10"
					/>
					<p className="hidden md:flex text-[10px]">{user?.name}</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col justify-between items-center gap-8 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border border-slate-600 dark:border-slate-800 rounded-xl w-full sm:max-w-[480px] text-slate-200">
				<DialogHeader>
					<DialogTitle>Editar perfil</DialogTitle>
					<DialogDescription>
						Faça as alterações desejadas aqui. Clique em salvar quando estiver
						concluido.
					</DialogDescription>
				</DialogHeader>
				<form
					className="gap-4 grid py-4 w-full"
					onSubmit={handleSubmit(handleEditProfile)}
				>
					<div className="items-center grid grid-cols-3 w-full">
						<Input
							{...register("name")}
							type="text"
							placeholder="nome"
							id="name"
							defaultValue="Nome do Usuário"
							className="col-span-3"
						/>
						{errors.name && (
							<p className="grid col-span-4 text-red-500 text-sm">
								{errors.name.message}
							</p>
						)}
					</div>
					<div className="items-center grid grid-cols-3 w-full">
						{/* <Label htmlFor="eamil" className="text-right">
							Email
						</Label> */}
						<Input
							{...register("email")}
							type="text"
							placeholder="email"
							id="eamil"
							defaultValue="email@exemplo.com"
							className="col-span-3"
							disabled
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>
					<div className="flex gap-4 m-6">
						<Button
							className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-gray-500/50 hover:shadow-lg py-2 rounded-md w-full hover:font-bold text-md text-white text-center"
							type="submit"
							title="Registre-se e contribuia com o blog"
							disabled={false}
						>
							Salvar
						</Button>
						<Button
							className="flex-1 bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-gray-500/50 hover:shadow-lg py-2 rounded-md w-full hover:font-bold text-md text-white text-center"
							title="Registre-se e contribuia com o blog"
							onClick={() => setisOpen(false)}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
