import { api } from "@/lib/api";

interface UserUpdateProps {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

export async function updateUser(data: UserUpdateProps) {
	try {
		const user = await api.patch<UserUpdateProps>("/user", {
			id: data.id,
			name: data.name,
			email: data.email,
			password: "Ab123456*",
		});

		return user.data;
	} catch (error) {
		throw new Error(`Erro ao atualizar o usuário: ${error}`);
	}
}
