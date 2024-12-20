"use client";

import { useUser } from "@/context/user-context";
import { Anton } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import logo from "../../../public/img/logo.png";
import { Profile } from "../../app/(primary)/sign-up/profile-component";
import { Button } from "../ui/button";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Header() {
	const { logout, user } = useUser();
	const { push } = useRouter();

	return (
		<section className="top-0 z-50 sticky flex sm:flex-row flex-col justify-items-center sm:justify-between items-center border-slate-600/50 backdrop-blur-lg backdrop-brightness-90 mb-4 sm:border-b w-full sm:h-[10vh]">
			<div className="flex flex-row items-center gap-4 p-4">
				<div className="shadow-xl m-4 border rounded-full overflow-hidden">
					<Image
						src={logo}
						alt=""
						width={80}
						priority
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="flex flex-col">
					<h1
						className={`${titleMain.className} font-extrabold text-4xl  text-slate-700 `}
					>
						Quiker News
					</h1>
					<h1 className="w-full text-slate-500 text-sm tracking-widest">
						tecnologia em evidência
					</h1>
				</div>
			</div>

			<div className="flex flex-row flex-1 justify-center items-center gap-4 p-4">
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/")}
					onKeyDown={() => push("/")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
				>
					<FaHome size={20} />
				</Button>
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/report")}
					onKeyDown={() => push("/report")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
				>
					Estatística
				</Button>
				<Button
					title="Voltar a página inicial"
					variant={"outline"}
					onClick={() => push("/doc")}
					onKeyDown={() => push("/doc")}
					className="hover:bg-indigo-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
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
							onKeyDown={() => push("/sign-in")}
							className="hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105 rounded-full"
						>
							Entrar
						</Button>
						<Button
							title="Registre-se e contribua com suas postagens"
							variant={"link"}
							onClick={() => push("/sign-up")}
							onKeyDown={() => push("/sign-up")}
							className="hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105 rounded-full"
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
							onKeyDown={() => logout()}
							className="hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105 rounded-full"
						>
							Sair
							<GiExitDoor size={20} />
						</Button>
					</>
				)}
			</div>
		</section>
	);
}
