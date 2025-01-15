import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Building,
	ChevronDown,
	CreditCard,
	LogOut,
	Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="font-semibold text-sm leading-6" variant={"outline"}>
					<span className="sr-only">Open user menu</span>
					<div className="flex items-center">
						<img
							className="rounded-full w-8 h-8"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
						<span className="ml-3">pizza.shop</span>
						<ChevronDown className="ml-2 w-4 h-4" />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="shadow w-56" align="end">
				<DropdownMenuLabel className="flex flex-col">
					<span className="font-semibold">Edmilson Soares</span>
					<span className="text-muted-foreground">@esbdev</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Building className="mr-2 w-4 h-4" />
					Perfil da Loja
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CreditCard className="mr-2 w-4 h-4" />
					Pagamento
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-2 w-4 h-4" />
					Configurações
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
					<LogOut className="mr-2 w-4 h-4" />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
