import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUser } from "@/context/AuthContext";

export function ProfileDialog() {
	const [isOpen, setisOpen] = useState(false);
	const { user } = useUser();

	return (
		<Dialog open={isOpen} onOpenChange={setisOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					className="flex flex-col gap-2"
					title="Editar Perfil"
				>
					<img
						src="https://github.com/esbnet.png"
						alt=""
						className="hover:border-slate-600 shadow-lg hover:border rounded-full w-10 h-10"
					/>
					<p className="text-[10px]">{user?.name}</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col justify-between items-center gap-8 border-slate-600 dark:border-slate-800 bg-slate-800/90 dark:bg-slate-800/80 shadow-xl p-8 border rounded-xl w-full sm:max-w-[480px] text-slate-200">
				<DialogHeader>
					<DialogTitle>Editar perfil</DialogTitle>
					<DialogDescription>
						Faça as alterações desejadas aqui. Clique em salvar quando estiver
						concluido.
					</DialogDescription>
				</DialogHeader>
				<div className="gap-4 grid py-4 w-full">
					<div className="items-center gap-4 grid grid-cols-4 w-full">
						<Label htmlFor="name" className="text-right">
							Nome
						</Label>
						<Input
							id="name"
							defaultValue="Nome do Usuário"
							className="col-span-3"
						/>
					</div>
					<div className="items-center gap-4 grid grid-cols-4">
						<Label htmlFor="eamil" className="text-right">
							Email
						</Label>
						<Input
							id="eamil"
							defaultValue="email@exemplo.com"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
						type="submit"
						title="Registre-se e contribuia com o blog"
						disabled={false}
					>
						Salvar
					</Button>
					<Button
						className="bg-gradient-to-r from-[#4D23F0] from-10% to-[#120633] to-90% shadow-lg hover:shadow-lg hover:shadow-gray-500/50 py-2 rounded-md w-full hover:font-bold text-center text-white text-xl"
						type="submit"
						title="Registre-se e contribuia com o blog"
						onClick={() => setisOpen(false)}
					>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
