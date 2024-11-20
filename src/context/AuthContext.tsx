"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

type User = {
	id: string;
	name: string;
	email: string;
	avatar: string;
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

		toast.success("Agradecemos a sua visita!", {
			description: "Volte sempre! 👋 ",
			duration: 5000,
			position: "top-right",
			icon: <FaUser />,

			style: {
				backgroundColor: "#BDBA13CE",
				color: "white",
				fontWeight: "bold",
			},
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
