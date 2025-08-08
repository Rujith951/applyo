import { ENDPOINTS } from "@/constants/endPoints";

const { search } = ENDPOINTS.MOVIES;

export const fetchSearchedMovies = async (query: string, page: number = 1) => {
	if (!query.trim()) return [];

	try {
		const response = await fetch(
			`${search}&query=${encodeURIComponent(query)}&page=${page}`
		);

		const data = await response.json();
		console.log(data, "fetch");

		// return data.results || [];
		return {
			totalPages: data.total_pages || 0,
			results: data.results || [],
		};
	} catch (error) {
		console.error("Error fetching searched movies:", error);
		return { totalPages: 0, results: [] };
	}
};
