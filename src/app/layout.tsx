import "./globals.css";

import { FaCheck, FaInfo } from "react-icons/fa";
import { MdErrorOutline, MdOutlineDownload } from "react-icons/md";

import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "@/context/app-providers";
import { Jura } from "next/font/google";
import { CiWarning } from "react-icons/ci";

const jura = Jura({ subsets: ["latin"], weight: "300" });

export const metadata = {
	title: {
		default: "Quiker News",
		template: "%s | Home",
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
		<html lang="pt-BR">
			<body
				className={`${jura.className} justify-center px-2 antialiased h-screen`}
			>
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 4000,
						classNames: {
							title: "text-slate-100",
							content: "text-slate-200",
							actionButton: "bg-zinc-400",
							cancelButton: "bg-orange-400",
							closeButton: "bg-lime-400",
							success: "bg-green-400/50",
							info: "bg-blue-400/50",
							warning: "bg-yellow-400/50",
							error: "bg-red-400/50",
						},
					}}
					icons={{
						success: <FaCheck />,
						info: <FaInfo />,
						warning: <CiWarning />,
						error: <MdErrorOutline />,
						loading: <MdOutlineDownload />,
					}}
				/>

				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
