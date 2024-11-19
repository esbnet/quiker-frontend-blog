import { BiDislike, BiLike } from "react-icons/bi";

import { Anton } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function BreakNews() {
	return (
		<section className="flex sm:flex-row flex-col bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md">
			<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
				<Image
					src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={500}
					height={200}
					className="rounded-md h-72 transform transition-transform duration-300 object-cover hover:scale-105"
				/>
			</div>
			<div className="flex-1 p-4 pr-0 rounded-r-md">
				<div className="flex flex-col h-full">
					<div className="flex justify-between">
						<h2
							className={`font-bold ${titleMain.className} text-3xl capitalize`}
						>
							Meu título
						</h2>
						<h3 className="text-right flex flex-col justify-items-end text-slate-500">
							<span>Edmilson Soares</span>
							<span className="text-xs">20 jan 2024</span>
						</h3>
					</div>
					<p className="mt-4 line-clamp-5 text-justify text-slate-700 text-xl dark:text-slate-400">
						Descrição do meu artigo Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Neque consequuntur facilis dicta cum voluptatem
						totam quam eligendi ipsa impedit! Fuga eos cupiditate corrupti
						laboriosam qui sapiente nesciunt aut dolores quam.
					</p>
				</div>
				<div className="flex flex-row justify-between">
					<div className="justify-between gap-2">
						<div className="flex flex-row gap-2 text-slate-600">
							<span className="flex items-center gap-2">
								<FaRegEye className="w-4 h-4" />
								<span className="text-xs">{25}</span>
							</span>
							<span className="flex items-center gap-2">
								<BiLike className="w-4 h-4" />
								<span className="text-xs">{7}</span>
							</span>

							<span className="flex items-center gap-2">
								<BiDislike className="w-4 h-4" />
								<span className="text-xs">{4}</span>
							</span>
						</div>
					</div>

					<Link
						href={"/post/4909cc24-52d6-40ee-a0b4-51307a278702"}
						className="flex justify-end"
					>
						<div className="flex items-center gap-1 hover:font-bold hover:dark:text-slate-100 hover:text-slate-900 transition-all">
							<span>Leia mais</span> <MdReadMore className="flex w-4 h-4" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
