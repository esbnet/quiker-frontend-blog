import { Anton } from "next/font/google";
import Image from "next/image";
import logo from "../../../public/img/logo.png";
import { Menu } from "./menu";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Header() {
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

			<Menu />
		</section>
	);
}
