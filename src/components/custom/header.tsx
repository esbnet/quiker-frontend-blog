"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Anton } from "next/font/google";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import logo from "../../../public/img/logo.png";
import menuItens from "../../data/menuItens";
import { Button } from "../ui/button";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Header() {
	const { push } = useRouter();
	const asPath = usePathname();
	const [menuSelected, setMenuSelected] = useState("quem sou");

	useEffect(() => {
		const selectedMenu = menuItens.find((menu) => menu.href === asPath);
		return setMenuSelected(selectedMenu?.name || "quem sou");
	}, [asPath]);

	function activeLink(path: string) {
		return asPath === `${path}` ? "border-b-4 border-b-red-600 font-bold" : "";
	}

	function linkPreview() {
		const menuIndex = menuItens.findIndex((menu) => menuSelected === menu.name);
		if (menuIndex > 0) push(menuItens[menuIndex - 1].href);
	}

	function linkForward() {
		const menuIndex = menuItens.findIndex((menu) => menuSelected === menu.name);
		if (menuIndex < menuItens.length - 1) push(menuItens[menuIndex + 1].href);
	}

	return (
		<section className="top-0 z-50 sticky flex sm:flex-row flex-col justify-items-center sm:justify-between items-center border-slate-600/50 backdrop-blur-lg backdrop-brightness-90 mb-4 sm:border-b w-full sm:h-[10vh]">
			<div className="shadow-xl m-4 border rounded-full overflow-hidden">
				<Image
					src={logo}
					alt=""
					width={80}
					priority
					style={{ objectFit: "contain" }}
				/>
			</div>
			<h1
				className={`${titleMain.className} font-extrabold text-6xl text-slate-700 `}
			>
				Artigos...
			</h1>

			<div className="flex flex-row flex-1 justify-center sm:justify-end items-center gap-4 pr-4 sm:pl-2 w-full sm:w-auto h-full">
				<Button
					variant={"outline"}
					onClick={() => push("/")}
					onKeyDown={() => push("/")}
					className="hover:bg-slate-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
				>
					<FaHome size={20} />
				</Button>
				<Button
					variant={"outline"}
					onClick={() => push("/sign-in")}
					onKeyDown={() => push("/sign-in")}
					className="hover:bg-slate-600 rounded-full hover:font-bold hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105"
				>
					Entrar
				</Button>
				<Button
					variant={"link"}
					onClick={() => push("/sign-up")}
					onKeyDown={() => push("/sign-up")}
					className="hover:font-bold dark:hover:text-slate-50 transform transition-all duration-300 object-cover hover:scale-105 rounded-full"
				>
					Registra-se
				</Button>
			</div>
		</section>
	);
}
