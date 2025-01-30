"use client";

import { FaHome, FaUser } from "react-icons/fa";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";

import type { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { ImSpinner9 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
	const [isSubmit, setIsSubmit] = useState(false);
	const router = useRouter();

	const formSchema = z
		.object({
			name: z
				.string()
				.min(2, "O nome deve conter pelo menos 2 caracteres")
				.max(50, "O nome deve conter pelo menos 50 caracteres"),
			email: z.string().email("Email inválido"),
			password: z
				.string()
				.min(6, { message: "A senha deve conter pelo menos 6 caracteres" })
				.max(12, "O nome deve conter pelo menos 12 caracteres")
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
					"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
				),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "As senhas devem ser iguais",
			path: ["confirmPassword"],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function handleSignUp(values: z.infer<typeof formSchema>) {
		const name = values.name;
		const email = values.email;
		const password = values.password;

		try {
			const response = await api.post("/register", {
				name,
				email,
				password,
			});

			const message = response.data.message;

			toast.success("Bem vindo e boa leitura!", {
				description: message,
				duration: 5000,
				icon: <FaUser />,

				style: {
					backgroundColor: "#119A11CE",
					color: "white",
					fontWeight: "bold",
				},
			});

			setIsSubmit(false);
			router.back();
		} catch (e) {
			const msg = e as AxiosError<{ error: string }>;
			const error = msg.response?.data.error;

			if (msg.status === 204) {
				return;
			}

			toast.warning(error, {
				description: "Email já cadastrado",
				icon: <FaUser />,
			});
		}
	}

	return (
		<div className="flex flex-col justify-between items-center gap-8 border-slate-300 dark:border-slate-800 bg-slate-200/10 dark:bg-slate-600/20 shadow-xl p-8 border rounded-xl w-96">
			<p className="font-bold text-4xl">Registrar</p>

			<div className="w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignUp)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>
									<FormMessage className="text-red-700 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage className="text-red-700 text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Senha</FormLabel> */}
									<FormControl>
										<Input type="password" placeholder="Senha" {...field} />
									</FormControl>
									<FormMessage className="text-red-700 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Confirar Senha</FormLabel> */}
									<FormControl>
										<Input
											type="password"
											placeholder="Confirme a senha"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-700 text-xs" />
								</FormItem>
							)}
						/>

						<Button
							className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
							type="submit"
							title="Registre-se e contribuia com o blog"
							disabled={isSubmit}
						>
							{isSubmit ? (
								<ImSpinner9 className="text-2xl animate-spin" />
							) : (
								"Confirmar"
							)}
						</Button>
					</form>
				</Form>
				<div className="flex flex-col justify-between items-center gap-6 w-full">
					<Button
						variant={"link"}
						onClick={() => redirect("/sign-in")}
						title="Crie sua conta aqui"
						disabled={isSubmit}
						className="mt-2 text-sm self-end"
					>
						Entrar
					</Button>
					<Button
						variant={"outline"}
						onClick={() => redirect("/")}
						disabled={isSubmit}
						className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
					>
						<FaHome size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}
