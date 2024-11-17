"use client";

import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function DarkMode() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex justify-center items-center p-2">
			<MdOutlineWbSunny />
			<Switch
				onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<MdDarkMode />
		</div>
	);
}

export default function Footer() {
	return (
		<section className="flex flex-col justify-between items-center mt-8 px-2 border-t border-red-600/50 border-b w-full font-mono text-gray-500 text-xs sm:h[10vh]">
			<div className="flex sm:flex-row flex-col p-2 w-full">
				<div className="flex w-full sm:w-1/2">
					<div className="flex w-full">
						<div className="flex w-full hover:text-red-600/50">
							<Link href="/aboutme" className="w-full">
								<p className="w-full text-center sm:text-left">
									Edmilson Soares
								</p>
								<p className="w-full text-center sm:text-left">
									Full Stack Developer
								</p>
							</Link>
						</div>
						<div className="border-y border border-red-600/20 h-full invisible sm:visible" />
						<div className="flex flex-col justify-center sm:justify-end sm:ml-4 w-full">
							<Link href="/contact" className="w-full hover:text-red-600/50">
								<p className="w-full text-center sm:text-left">
									esbnet@gmail.com
								</p>
							</Link>
							<Link href="https://wa.me/send?phone=5571988630845&text=Olá! Podemos conversar sobre um projeto que pretendo realizar?">
								<p className="w-full text-center sm:text-left hover:text-red-600/50">
									+55 (71) 98863-0845
								</p>
							</Link>
						</div>
					</div>
					<div className="sm:flex hidden w-full"> </div>
				</div>

				<div className="w-full sm:w-1/2">
					<nav className="flex flex-col justify-center sm:justify-center items-center sm:items-end h-full">
						<ul className="flex flex-row gap-2">
							<li>
								<Link href="#" className="hover:text-red-600/50">
									Política de Privacidade
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-red-600/50">
									Informação
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-red-600/50">
									Termos de Uso
								</Link>
							</li>
							{/* <li>
                <DarkMode />
              </li> */}
						</ul>
					</nav>
				</div>
			</div>

			<div className="flex justify-center items-center border-y-red-600/30 p-2 border-t border-dotted w-full">
				<AiOutlineCopyrightCircle />
				{new Date().getFullYear()} | @esbnet
			</div>
		</section>
	);
}
