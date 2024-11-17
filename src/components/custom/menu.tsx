import { motion } from "framer-motion";
import Link from "next/link";
import menuItens from "../../data/menuItens";

const menu = menuItens.slice(1);

export function Menu() {
	return (
		<section className="flex flex-1 justify-center sm:justify-start gap-1 sm:gap-6 border-l-red-600 w-full">
			{/* animate-pulse hover:animate-none  */}
			{menu.map((item) => (
				<motion.span key={item.name} whileHover={{ scale: 1.25, x: 10 }}>
					<Link
						href={item.href}
						className="flex justify-center items-center pl-1 border-b-4 border-b-white/0 w-full hover:font-bold hover:text-red-600" // hover:border-b-red-600
					>
						<p
							className="flex justify-center items-center gap-2 mx-4 sm:mx-2"
							title={`${item.name}`}
						>
							<span className="sm:hidden">{item.icon}</span>

							<p className="sm:flex hidden w-max">{item.name.toUpperCase()}</p>
						</p>
					</Link>
				</motion.span>
			))}
		</section>
	);
}
