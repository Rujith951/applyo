import { ENDPOINTS } from "@/constants/endPoints";

const { movies, tvshows } = ENDPOINTS.MOVIES.fetchMovieAndSeries;

interface Movie {
	id: number;
	title: string;
	poster_path: string;
	overview: string;
	media_type: "movie" | "tv";
	popularity: number;
}

export const getMoviesAndTvShows = async (
	page: number = 1
): Promise<Movie[]> => {
	try {
		const [moviesRes, tvShowsRes] = await Promise.all([
			fetch(`${movies}&page=${page}`),
			fetch(`${tvshows}&page=${page}`),
		]);

		const moviesData = await moviesRes.json();
		const tvShowsData = await tvShowsRes.json();

		const movieResultsWithType = moviesData.results.map((movie: any) => ({
			...movie,
			media_type: "movie" as const,
		}));

		const tvResultsWithType = tvShowsData.results.map((tv: any) => ({
			...tv,
			media_type: "tv" as const,
		}));

		const combined = [...movieResultsWithType, ...tvResultsWithType];
		combined.sort((a, b) => b.popularity - a.popularity);

		console.log(combined, "combined in get");

		return combined;
	} catch (err) {
		console.error("Failed to fetch movies/TV shows:", err);
		return [];
	}
};
