// src/test/get-posts.spec.ts
import { describe, jest, test } from "@jest/globals";

// Mocka a dependência do banco/API
jest.mock("@/lib/api", () => ({
	mockPosts: jest.fn(),
}));

describe("getPosts", () => {
	test("should get posts without database dependency", async () => {
		// Dados simulados
		const mockPosts = [
			{ id: 1, title: "First Post", content: "Content of the first post" },
			{ id: 2, title: "Second Post", content: "Content of the second post" },
		];

		// Configura o mock para retornar os dados simulados
		// (getPosts as jest.Mock).mockResolvedValue(mockPosts);

		// Chama a função que está sendo testada

		// // Validações
		// expect(Array.isArray(posts)).toBe(true); // Retorna um array
		// expect(posts.length).toBeGreaterThan(0); // O array não está vazio
		// expect(posts[0]).toHaveProperty("id", 1); // Valida propriedades do objeto
		// expect(posts[0]).toHaveProperty("title", "First Post");
	});
});
