import { metadata } from "@/app/layout";

metadata.title.default = "Quiker News | Post";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="flex flex-col">{children}</div>;
}
