import { BiDislike, BiLike } from "react-icons/bi";

import { Anton } from "next/font/google";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { MdReadMore } from "react-icons/md";
import type { PostProps } from "@/@types/post-type";
import { formatDistanceToNow } from "date-fns";
import { ptBR as locale } from "date-fns/locale";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function Post(post: PostProps) {
	return (
		<div
			rel="noopener noreferrer"
			title={post.title}
			className="flex sm:flex-row flex-col gap-4 hover:bg-slate-300/60 dark:hover:bg-slate-600/50 hover:shadow-xl dark:hover:shadow-slate-950 mb-4 p-4 rounded-md w-full transform transition-all duration-600 object-cover"
		>
			<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
				<Image
					src={post?.imageUrl ?? ""}
					alt=""
					width={350}
					height={200}
					className="rounded-md h-72 transform transition-all duration-300 hover:scale-110 grow object-cover"
				/>
			</div>

			<div className="flex flex-col flex-1">
				<h2
					className={`${titleMain.className} font-bold text-2xl capitalize text-justify `}
				>
					{post.title}
				</h2>
				<h2 className="flex justify-between mb-4">
					<span className="font-medium text-xs">
						{post.author.name.toUpperCase()}
					</span>
					<div className="flex flex-col items-end font-medium text-xs">
						{/* <span>
            <FormattedDate date={new Date(post.createdAt)} />
          </span> */}
						<span>{formatDistanceToNow(post.createdAt, { locale })}</span>
					</div>
				</h2>

				<p className="line-clamp-4 text-justify">{post.content}</p>

				<div className="flex justify-between gap-2 mt-auto">
					<div className="text-slate-600">
						<span className="flex items-center gap-2">
							<FaRegEye className="w-4 h-4" />
							<span className="text-xs">{post.views}</span>
						</span>
						<span className="flex items-center gap-2">
							<BiLike className="w-4 h-4" />
							<span className="text-xs">{post.likes}</span>
						</span>

						<span className="flex items-center gap-2">
							<BiDislike className="w-4 h-4" />
							<span className="text-xs">{post.dislikes}</span>
						</span>
					</div>
					<Link href={`/post/${post.id}`} className="flex items-end">
						<div className="flex items-center gap-1 hover:font-bold hover:dark:text-slate-100 hover:text-slate-900 transition-all">
							<span>Leia mais </span>
							<MdReadMore className="flex w-4 h-4" />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
