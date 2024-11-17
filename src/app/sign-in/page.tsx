"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { IoChevronBack } from "react-icons/io5";
import z from "zod";

const formSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z
		.string()
		.min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
});

export default function Login() {
	const [isSubmit, setIsSubmit] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const email = values.email;
		const password = values.password;

		setIsSubmit(true);
	}

	return (
		<div className="flex flex-col justify-between items-center gap-8 border-slate-300 dark:border-slate-800 bg-slate-200/10 dark:bg-slate-600/20 shadow-xl p-8 border rounded-xl w-96">
			<p className="font-bold text-4xl">Login</p>

			<div className="w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Enter your email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Crie uma senha" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="bg-gradient-to-r from-10% from-orange-600 to-90% to-red-800 shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
							type="submit"
							title="Acessar área administrativa"
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
					<Link
						href="/sign-up"
						className="mt-2 text-sm self-end"
						title="Crie sua conta aqui"
					>
						Registrar-se
					</Link>
					<Button
						variant={"ghost"}
						className="gap-3 py-2 text-center text-md self-start"
						onClick={() => redirect("/")}
						title="Voltar para o blog"
					>
						<IoChevronBack className="text-2xl" />
						voltar
					</Button>
				</div>
			</div>
		</div>
	);
}
