"use client";

import { Profile } from "@/app/(public)/sign-up/profile-component";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "../ui/button";

export function Menu() {
	const { push } = useRouter();
	const { user, logout } = useUser();

	return (
		<>
			<div className="flex flex-row flex-1 justify-center items-center gap-4 p-4">
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
				>
					<FaHome size={20} />
				</Button>
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/report")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
				>
					Estatística
				</Button>
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/doc")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
				>
					Doc
				</Button>
			</div>
			<div className="flex flex-row justify-center sm:justify-end items-center sm:pl-2 w-full sm:w-auto h-full">
				{user === null ? (
					<>
						<Button
							title="Entre e contribuia com suas postagens"
							variant={"link"}
							onClick={() => push("/sign-in")}
							className="rounded-full hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
						>
							Entrar
						</Button>
						<Button
							title="Registre-se e contribua com suas postagens"
							variant={"link"}
							onClick={() => push("/sign-up")}
							className="rounded-full hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
						>
							Registra-se
						</Button>
					</>
				) : (
					<>
						<Profile />
						<Button
							title="Encerrar sessão"
							variant={"ghost"}
							onClick={() => logout()}
							className="rounded-full hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 hover:scale-105 object-cover"
						>
							Sair
							<GiExitDoor size={20} />
						</Button>
					</>
				)}
			</div>
		</>
	);
}
