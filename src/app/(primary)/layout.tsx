// "use client";

export default function SignInLayout({
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
