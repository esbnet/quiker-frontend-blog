"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

type User = {
	id: string;
	name: string;
	email: string;
};

type UserContextProps = {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const logout = () => {
		setUser(null);
		// Aqui você pode limpar tokens, cookies, etc.
	};

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser deve ser usado dentro de UserProvider");
	}
	return context;
};
