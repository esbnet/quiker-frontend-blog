"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type Author = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	category: string;
	createdAt: string;
	author: Author;
};

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<ArrowUpDown className="ml-2 w-4 h-4" />
				</Button>
			);
		},
	},
	{
		header: "Views",
		accessorKey: "views",
	},
	{
		header: "Likes",
		accessorKey: "likes",
	},
	{
		header: "Dislikes",
		accessorKey: "dislikes",
	},
];
