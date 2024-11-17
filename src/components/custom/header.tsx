"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/img/logo.png";
import menuItens from "../../data/menuItens";
import { Button } from "../ui/button";

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
			<div className="shadow-xl m-1 border rounded-full">
				<Image
					src={logo}
					alt=""
					width={80}
					className="shadow-xl border rounded-full overflow-hidden"
					priority
					style={{ objectFit: "contain" }}
				/>
			</div>

			{/* <div className="sm:flex flex-1 items-center hidden px-4 w-full h-full">
				<span className="font-bold text-4xl">{menuSelected.toUpperCase()}</span>
			</div> */}

			<div className="flex justify-end sm:pl-2 w-full sm:w-auto h-full">
				<nav className="flex sm:flex-row flex-col justify-center items-center gap-4 p-4 w-full h-full sm:h-auto">
					<ul className="sm:flex justify-center sm:justify-end items-center sm:gap-x-4 grid grid-cols-7 w-full">
						{menuItens.map((menu) => {
							return (
								<motion.li whileHover={{ scale: 1.25 }} key={menu.href}>
									<Link
										href={menu.href}
										className={`gap-1 flex items-center px-1 sm:justify-start justify-center hover:text-red-500 hover:font-bold ${activeLink(
											menu.href,
										)}`}
									>
										<span className="sm:hidden">{menu.icon}</span>
										{/* {menu.name} */}
										<p className="sm:flex hidden">{menu.name.toUpperCase()}</p>
									</Link>
								</motion.li>
							);
						})}
					</ul>
					<div className="flex justify-between sm:justify-end gap-2 sm:hidden w-full sm:w-auto">
						<Button
							variant={"outline"}
							onClick={linkPreview}
							onKeyDown={linkPreview}
							className="flex justify-center items-center hover:bg-red-600 rounded w-8 h-6 transition-colors hover:cursor-pointer"
						>
							<MdArrowBackIosNew />
						</Button>
						<Button
							variant={"outline"}
							onClick={linkForward}
							onKeyDown={linkForward}
							className="flex justify-center items-center hover:bg-red-600 rounded w-8 h-6 transition-colors hover:cursor-pointer"
						>
							<MdArrowForwardIos />
						</Button>
					</div>
				</nav>
				<div className="flex justify-between">
					<Button
						variant={"default"}
						onClick={() => push("/")}
						onKeyDown={() => push("/")}
						className="flex justify-center items-center hover:bg-red-600 rounded w-8 h-6 transition-colors hover:cursor-pointer"
					>
						Entrar
					</Button>
				</div>
			</div>
		</section>
	);
}
