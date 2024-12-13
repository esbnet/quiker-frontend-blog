import { api } from "@/lib/api";
import type { AuthorProps } from "../types/author-type";

interface UserUpdateProps {
	id: string;
	name: string;
	email: string;
}

export async function updateProfile(data: UserUpdateProps) {
	try {
		const user = await api.put<AuthorProps>("/post", {
			id: data.id,
			name: data.name,
			email: data.email,
		});

		return user.data;
	} catch (error) {
		throw new Error(`Erro ao atualizar o Post: ${error}`);
	}
}
