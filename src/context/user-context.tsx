"use client";

import type { User } from "@/@types/user-data";
import { type ReactNode, createContext, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

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

		toast.warning("Agradecemos a sua visita!", {
			description: "Volte sempre!",
			icon: <FaUser />,
		});
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
