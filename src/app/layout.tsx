import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { Toaster } from "@/components/ui/sonner";
import { Jura } from "next/font/google";

const jura = Jura({ subsets: ["latin"], weight: "300" });

export const metadata = {
	title: "@esbnet",
	description: "Portifolio 2023",
};

const queryClient = new QueryClient();

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): Promise<JSX.Element> {
	return (
		<html lang="pt-BR">
			<body
				className={`${jura.className} justify-center px-2 antialiased  h-screen`}
			>
				<Toaster />
				<QueryClientProvider client={queryClient}>
					<Header />
					{children}
					<Footer />
				</QueryClientProvider>
			</body>
		</html>
	);
}
