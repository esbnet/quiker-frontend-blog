import { Anton, Jura } from "next/font/google";

import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { metadata } from "../layout";

const titleMain = Anton({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-anton",
});

const jura = Jura({
	subsets: ["latin"],
	weight: "300",
	variable: "--font-jura",
});

metadata.title.default = "Quiker News | Blog";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={`"flex flex-col flex-1 min-h-[100vh] ${jura.variable} ${titleMain.variable} "`}
		>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
