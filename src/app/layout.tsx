import "./globals.css";

import { Anton, Jura } from "next/font/google";

import { AppProviders } from "@/context/app-providers";
import MyToaster from "@/components/custom/Toaster";

const titles = Anton({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-anton",
});

const jura = Jura({
	subsets: ["latin"],
	weight: "300",
	variable: "--font-jura",
});

export const metadata = {
	title: {
		default: "Quiker News",
		template: "%s | XXXXXXXX",
	},
	content: "tecnologia em evidência",
	Icon: "/quiker.ico",
	robots: {
		index: false,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" className={`${jura.variable} ${titles.variable}`}>
			<body className="justify-center px-2 min-h-[100vh] antialiased">
				<MyToaster />
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
