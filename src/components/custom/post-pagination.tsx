import { Button } from "../ui/button";
import { randomUUID } from "node:crypto";
// components/Pagination.tsx

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	// Gera array de páginas para exibição
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			// Se tiver 7 ou menos páginas, mostra todas
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// Sempre mostra primeira página
		pages.push(1);

		if (currentPage > 3) {
			pages.push("...");
		}

		// Páginas ao redor da página atual
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			pages.push(i);
		}

		if (currentPage < totalPages - 2) {
			pages.push("...");
		}

		// Sempre mostra última página
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="flex justify-center items-center space-x-1">
			{/* Botão Previous */}
			<Button
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`px-3 py-1 rounded-md ${
					currentPage === 1
						? "bg-gray-100 text-gray-400 cursor-not-allowed"
						: "bg-white text-gray-700 hover:bg-gray-50"
				}`}
			>
				Anterior
			</Button>

			{/* Números das páginas */}
			{getPageNumbers().map((page) => {
				const index = randomUUID();
				return (
					<Button
						key={index}
						onClick={() => typeof page === "number" && onPageChange(page)}
						disabled={page === "..."}
						className={`px-3 py-1 rounded-md ${
							page === currentPage
								? "bg-blue-500 text-white"
								: page === "..."
									? "bg-white text-gray-700 cursor-default"
									: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
					>
						{page}
					</Button>
				);
			})}

			{/* Botão Next */}
			<Button
				onClick={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages}
				className={`px-3 py-1 rounded-md ${
					currentPage === totalPages
						? "bg-gray-100 text-gray-400 cursor-not-allowed"
						: "bg-white text-gray-700 hover:bg-gray-50"
				}`}
			>
				Próxima
			</Button>
		</div>
	);
};

export default Pagination;
