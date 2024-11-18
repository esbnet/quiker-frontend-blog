import { Anton } from "next/font/google";
import BreakNews from "./break-news";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Blog() {
	return (
		<section className="flex flex-col gap-6 text-slate-600/20 dark:text-slate-300">
			<div className="flex justify-center">{/* <CarouselPlugin /> */}</div>
			<h1 className={`${titleMain.className} font-extrabold text-6xl`}>
				Artigos
			</h1>
			<h2 className="font-bold text-3xl">Destaque do dia</h2>
			<BreakNews />
			<h2 className="font-bold text-3xl">Mais recentes</h2>
			{/* <PostsList /> */}
		</section>
	);
}
