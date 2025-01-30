import { Skeleton } from "../ui/skeleton";

function SkeletonBreakNews() {
	return (
		<div className="flex sm:flex-row flex-col space-y-4 bg-slate-300/50 dark:bg-slate-600/20 shadow-lg p-4 rounded-md">
			<div>
				<Skeleton className="flex sm:flex flex-col gap-2 rounded-md w-[500px] h-[200px] overflow-hidden" />
			</div>
			<Skeleton className="w-[250px] h-4 animate-pulse" />
			<Skeleton className="w-[200px] h-4" />
		</div>
	);
}

export default SkeletonBreakNews;
