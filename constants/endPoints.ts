const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const ENDPOINTS = {
	AUTH: {
		requestToken: `${API_BASE}/authentication/token/new?api_key=${API_KEY}`,
		validateLogin: `${API_BASE}/authentication/token/validate_with_login?api_key=${API_KEY}`,
	},

	MOVIES: {
		fetchMovieAndSeries: {
			movies: `${API_BASE}/discover/movie?api_key=${API_KEY}&language=en-US`,
			tvshows: `${API_BASE}/discover/tv?api_key=${API_KEY}&language=en-US`,
		},

		search: `${API_BASE}/search/movie?api_key=${API_KEY}`,

		details: (id: string | number) =>
			`${API_BASE}/movie/${id}?api_key=${API_KEY}`,

		images: (id: string | number) =>
			`${API_BASE}/movie/${id}/images?api_key=${API_KEY}`,

		reviews: (id: string | number) =>
			`${API_BASE}/movie/${id}/reviews?api_key=${API_KEY}`,

		playMovieVideo: (id: string | number) =>
			`${API_BASE}/movie/${id}/videos?api_key=${API_KEY}`,
	},

	IMAGE: {
		base: IMAGE_BASE_URL,
	},
};
