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

import { Button } from "@/components/ui/button";
import { ImSpinner9 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
	const [isSubmit, setIsSubmit] = useState(false);
	const { setUser, user } = useUser();
	const router = useRouter();

	const formSchema = z.object({
		email: z.string().email("Email inválido"),
		password: z
			.string()
			.min(6, { message: "A senha deve conter pelo menos 6 caracteres" })
			.max(12, "O nome deve conter pelo menos 12 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSignIn(values: z.infer<typeof formSchema>) {
		const email = values.email;
		const password = values.password;

		try {
			const response = await api.post("/sessions", {
				email,
				password,
			});

			if (!response.data) {
				throw new Error("Erro ao fazer login");
			}

			const { user } = response.data;
			setUser(user);

			toast.success("Que bom te ver novamente!", {
				description: `Somos gratos por sua contribuição ${user?.name}.`,
				icon: <FaUser />,
			});

			router.back();

			setIsSubmit(false);
		} catch (error) {
			toast.warning("Autenticação", {
				description: "Verifique suas credenciais e tente novamente",
				icon: <FaUser />,
			});
		}
	}

	return (
		<div className="flex flex-col justify-between items-center gap-8 border-slate-300 dark:border-slate-800 bg-slate-200/10 dark:bg-slate-600/20 shadow-xl p-8 border rounded-xl w-96">
			<p className="font-bold text-4xl">Login</p>

			<div className="w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignIn)}
						className="space-y-8"
					>
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
									<FormControl>
										<Input type="password" placeholder="Senha" {...field} />
									</FormControl>
									<FormMessage className="text-red-700 text-xs" />
								</FormItem>
							)}
						/>
						<Button
							className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
							type="submit"
							title="Entrar para realizar postagem"
							disabled={isSubmit}
						>
							{isSubmit ? (
								<ImSpinner9 className="text-2xl animate-spin" />
							) : (
								"Entrar"
							)}
						</Button>
					</form>
				</Form>
				<div className="flex flex-col justify-between items-center gap-6 w-full">
					<Button
						variant={"link"}
						onClick={() => redirect("/sign-up")}
						className="mt-2 text-sm self-end"
						title="Crie sua conta aqui"
						disabled={isSubmit}
					>
						Registrar-se
					</Button>
					<Button
						variant={"outline"}
						onClick={() => redirect("/")}
						className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
						disabled={isSubmit}
					>
						<FaHome size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}
