import { GiBrazil, GiUsaFlag } from "react-icons/gi";

import { Button } from "@/components/ui/button";

export default function Language() {
	return (
		<div className="sm:flex flex-col gap-1 hidden px-2 border-l border-l-red-600 font-mono text-xs">
			<Button className="flex gap-2 text-green-600 hover:text-red-300">
				<GiBrazil /> Português BR
			</Button>
			<Button className="flex gap-2 text-gray-400 cursor-default">
				<GiUsaFlag /> English
			</Button>
		</div>
	);
}
