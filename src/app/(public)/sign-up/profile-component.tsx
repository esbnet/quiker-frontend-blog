import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileDialog } from "./profile-dialog";

export function Profile() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ProfileDialog />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					Minha conta
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">
					Preferências
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">Sair</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
