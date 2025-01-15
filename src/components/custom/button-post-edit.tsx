"use client";

import { useRouter } from "next/navigation";
import { MdEditNote } from "react-icons/md";
import { Button } from "../ui/button";

function ButtonPostEdit({ postId }: { postId: string }) {
	const router = useRouter();
	return (
		<div className="flex gap-2">
			<Button
				title="Editar post"
				variant={"ghost"}
				onClick={() => router.push(`/post/${postId}/edit`)}
				className="justify-center items-center hover:bg-indigo-600 rounded-full w-10 h-10 hover:font-bold text-slate-600 hover:text-slate-50 transform transition-all animate-pulse hover:animate-bounce duration-300 hover:scale-105 object-cover"
			>
				<MdEditNote size={26} />
			</Button>
		</div>
	);
}

export default ButtonPostEdit;
