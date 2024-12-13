"use client";

import { PostProvider } from "./post-context";
import type { ReactNode } from "react";
import { UserProvider } from "./user-context";
// Adicione mais providers aqui conforme necessário

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<UserProvider>
			{/* Outros Providers podem ser aninhados aqui */}
			<PostProvider>{children}</PostProvider>
		</UserProvider>
	);
};
