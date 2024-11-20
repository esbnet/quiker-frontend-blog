import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/AuthContext";
import { Jura } from "next/font/google";

const jura = Jura({ subsets: ["latin"], weight: "300" });

export const metadata = {
	title: "@esbnet",
	description: "Portifolio 2023",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body
				className={`${jura.className} justify-center px-2 antialiased h-screen`}
			>
				<Toaster />
				<UserProvider>
					<main>{children}</main>
				</UserProvider>
			</body>
		</html>
	);
}
