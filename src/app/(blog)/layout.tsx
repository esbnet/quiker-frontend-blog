import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { metadata } from "../layout";

metadata.title.default = "Quiker News | Home";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
