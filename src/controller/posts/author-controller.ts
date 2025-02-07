import type { AuthorProps } from "../../@types/comment-type";

export class AuthorController {
	private authors: AuthorProps[] = [];

	async createAuthor(
		authorData: Omit<AuthorProps, "id" | "createdAt">,
	): Promise<AuthorProps> {
		const newAuthor: AuthorProps = {
			id: crypto.randomUUID(),
			...authorData,
			createdAt: new Date().toISOString(),
		};

		this.authors.push(newAuthor);
		return newAuthor;
	}

	async getAuthorById(id: string): Promise<AuthorProps | null> {
		return this.authors.find((author) => author.id === id) || null;
	}

	async getAllAuthors(): Promise<AuthorProps[]> {
		return this.authors;
	}

	async updateAuthor(
		id: string,
		authorData: Partial<Omit<AuthorProps, "id" | "createdAt">>,
	): Promise<AuthorProps | null> {
		const authorIndex = this.authors.findIndex((author) => author.id === id);
		if (authorIndex === -1) return null;

		const updatedAuthor = {
			...this.authors[authorIndex],
			...authorData,
		};

		this.authors[authorIndex] = updatedAuthor;
		return updatedAuthor;
	}

	async deleteAuthor(id: string): Promise<boolean> {
		const initialLength = this.authors.length;
		this.authors = this.authors.filter((author) => author.id !== id);
		return this.authors.length !== initialLength;
	}

	async searchAuthors(query: string): Promise<AuthorProps[]> {
		const lowercaseQuery = query.toLowerCase();
		return this.authors.filter(
			(author) =>
				author.name.toLowerCase().includes(lowercaseQuery) ||
				author.email.toLowerCase().includes(lowercaseQuery),
		);
	}
}
