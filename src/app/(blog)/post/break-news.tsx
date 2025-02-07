import { BiDislike, BiLike } from "react-icons/bi";

import { Anton } from "next/font/google";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { MdReadMore } from "react-icons/md";
import SkeletonBreakNews from "@/components/custom/skeleton-break-news";
import { formatDistanceToNow } from "date-fns";
import { getPosts } from "@/services/posts-get";
import { ptBR as locale } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";

const titleMain = Anton({ subsets: ["latin"], weight: "400" });

export default function BreakNews() {
	const {
		data: posts,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	if (isLoading) return <SkeletonBreakNews />;

	if (isError) return <div>Error</div>;

	// get the first post to show in the break news
	const post = posts?.[0];

	return (
		<section className="flex sm:flex-row flex-col bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md">
			<div className="flex sm:flex flex-col gap-2 rounded-md overflow-hidden">
				<Image
					src={post?.imageUrl ?? ""}
					alt=""
					width={500}
					height={200}
					className="rounded-md h-72 transform transition-transform duration-300 hover:scale-105 object-cover"
				/>
			</div>
			<div className="flex-1 p-4 pr-0 rounded-r-md">
				<div className="flex flex-col h-full">
					<div className="flex justify-between">
						<h2
							className={`font-bold ${titleMain.className} text-3xl capitalize`}
						>
							{post?.title}
						</h2>
						<h3 className="text-right flex flex-col justify-items-end text-slate-500">
							<span>{post?.author.name}</span>
							<span className="text-xs">
								{formatDistanceToNow(post?.createdAt ?? new Date(), { locale })}
							</span>
						</h3>
					</div>
					<p className="mt-4 line-clamp-5 text-justify text-slate-700 text-xl dark:text-slate-400">
						{post?.content}
					</p>
				</div>
				<div className="flex flex-row justify-between">
					<div className="justify-between gap-2">
						<div className="flex flex-row gap-2 text-slate-600">
							<span className="flex items-center gap-2">
								<FaRegEye className="w-4 h-4" />
								<span className="text-xs">{post?.views}</span>
							</span>
							<span className="flex items-center gap-2">
								<BiLike className="w-4 h-4" />
								<span className="text-xs">{post?.likes}</span>
							</span>

							<span className="flex items-center gap-2">
								<BiDislike className="w-4 h-4" />
								<span className="text-xs">{post?.dislikes}</span>
							</span>
						</div>
					</div>

					<Link href={`/post/${post?.id}`} className="flex justify-end">
						<div className="flex items-center gap-1 hover:font-bold hover:dark:text-slate-100 hover:text-slate-900 transition-all">
							<span>Leia mais</span> <MdReadMore className="flex w-4 h-4" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
