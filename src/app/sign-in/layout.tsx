"use client";

export default function PortLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			{children}
		</div>
	);
}
