"use client";

import { Suspense } from "react";
import Loading from "../loading";

export default function PortLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col justify-center items-center h-[72vh]">
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
