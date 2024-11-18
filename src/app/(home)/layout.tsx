import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";

export default function PortLayout({
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
