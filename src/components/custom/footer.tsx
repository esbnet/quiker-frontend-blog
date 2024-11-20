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
		<section className="flex flex-col justify-between items-center border-slater-600/50 mt-8 px-2 border-t border-b w-full font-mono text-gray-500 text-xs sm:h[10vh]">
			<div className="flex sm:flex-row flex-col p-2 w-full">
				<div className="flex flex-1">
					<div className="flex w-full">
						<p>quiker</p>
					</div>
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

			<div className="flex justify-center items-center border-y-slate-600/30 p-2 border-t border-dotted w-full">
				<AiOutlineCopyrightCircle />
				{new Date().getFullYear()} | powered by @esbnet
			</div>
		</section>
	);
}
