"use client";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { UserProvider } from "./user-context";

// Adicione mais providers aqui conforme necessário

export const AppProviders = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</UserProvider>
	);
};
