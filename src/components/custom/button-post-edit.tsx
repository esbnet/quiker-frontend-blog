"use client";

import { Button } from "../ui/button";
import { MdEditNote } from "react-icons/md";
import { useRouter } from "next/navigation";

function ButtonPostEdit({ postId }: { postId: string }) {
	const router = useRouter();
	return (
		<div className="flex gap-2">
			<Button
				title="Editar post 📝"
				variant={"ghost"}
				onClick={() => router.push(`/post/${postId}/edit`)}
				className="flex items-center hover:text-indigo-600 transform transition-transform duration-300 cursor-pointer hover:scale-125"
			>
				<MdEditNote size={26} />
			</Button>
		</div>
	);
}

export default ButtonPostEdit;
