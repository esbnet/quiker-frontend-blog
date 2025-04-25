import { FaCheck, FaInfo } from "react-icons/fa";
import { MdErrorOutline, MdOutlineDownload } from "react-icons/md";

import { CiWarning } from "react-icons/ci";
import { Toaster } from "sonner";

export default function MyToaster() {
	return (
		<Toaster
			position="top-right"
			toastOptions={{
				duration: 4000,
				classNames: {
					title: "text-slate-100",
					content: "text-slate-200",
					actionButton: "bg-zinc-400",
					cancelButton: "bg-orange-400",
					closeButton: "bg-lime-400",
					success: "bg-green-400/50",
					info: "bg-blue-400/50",
					warning: "bg-yellow-400/50",
					error: "bg-red-400/50",
				},
			}}
			icons={{
				success: <FaCheck />,
				info: <FaInfo />,
				warning: <CiWarning />,
				error: <MdErrorOutline />,
				loading: <MdOutlineDownload />,
			}}
		/>
	);
}
