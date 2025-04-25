import { Skeleton } from "../ui/skeleton";

function SkeletonPostList() {
	return (
		<section className="flex gap-6">
			<Skeleton className="bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-6 rounded-md w-full">
				<div
					rel="noopener noreferrer"
					className="flex sm:flex-row flex-col gap-4 bg-slate-300/60 dark:bg-slate-600/50 mb-4 p-4 rounded-md w-full h-52"
				/>
				<div
					rel="noopener noreferrer"
					className="flex sm:flex-row flex-col gap-4 bg-slate-300/60 dark:bg-slate-600/50 mb-4 p-4 rounded-md w-full h-52"
				/>
			</Skeleton>
			<Skeleton className="hidden sm:block bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md w-1/3 text-2xl">
				Categorias
			</Skeleton>
		</section>
	);
}

export default SkeletonPostList;
