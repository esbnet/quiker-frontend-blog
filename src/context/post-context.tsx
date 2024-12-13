"use client";

import type { Post } from "@/types/post-type";
import { type ReactNode, createContext, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

type PostContextProps = {
	post: Post | null;
	setPost: (post: Post | null) => void;
	logout: () => void;
};

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
	const [post, setPost] = useState<Post | null>(null);

	const logout = () => {
		setPost(null);

		toast.warning("Agradecemos a sua visita!", {
			description: "Volte sempre!",
			icon: <FaUser />,
		});
		// Aqui você pode limpar tokens, cookies, etc.
	};

	return (
		<PostContext.Provider value={{ post, setPost, logout }}>
			{children}
		</PostContext.Provider>
	);
};

export const usePost = () => {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error("usePost deve ser usado dentro de PostProvider");
	}
	return context;
};
