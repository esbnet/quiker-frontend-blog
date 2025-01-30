"use client";

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/context/user-context";
import { CommentDialog } from "./comment-dialog";

interface CommentProps {
	postId: string;
}

export function CommentComponent({ postId }: CommentProps) {
	const { user } = useUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<CommentDialog authorId={user?.id ?? ""} postId={postId} />
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
