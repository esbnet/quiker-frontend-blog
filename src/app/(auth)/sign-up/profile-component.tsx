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
					My account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
