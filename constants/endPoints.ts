// import { API_KEY } from "./constant";

// export const GET_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;

// export const VERIFY_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`;

// // export const DASH_BOARD_DATA_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${}`;

// export function getDashBoardData(p) {
// 	return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${p}&include_adult=false`;
// }

// // export const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie/${1}?api_key=${API_KEY}`;

// // export function getMovieDetails(id) {
// // 	return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
// // }

// export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// function moviesApi(movieName, page) {
// 	return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${page}
//    `;
// }

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const ENDPOINTS = {
	AUTH: {
		requestToken: `${API_BASE}/authentication/token/new?api_key=${API_KEY}`,
		validateLogin: `${API_BASE}/authentication/token/validate_with_login?api_key=${API_KEY}`,
		createSession: `${API_BASE}/authentication/session/new?api_key=${API_KEY}`,
		guestSession: `${API_BASE}/authentication/guest_session/new?api_key=${API_KEY}`,
	},

	MOVIES: {
		discover: `${API_BASE}/discover/movie?api_key=${API_KEY}`,
		popular: `${API_BASE}/movie/popular?api_key=${API_KEY}`,
		trending: (page = 1) =>
			`${API_BASE}/trending/movie/day?api_key=${API_KEY}&page=${page}&include_adult=false`,
		details: (id: string | number) =>
			`${API_BASE}/movie/${id}?api_key=${API_KEY}`,
		credits: (id: string | number) =>
			`${API_BASE}/movie/${id}/credits?api_key=${API_KEY}`,
		images: (id: string | number) =>
			`${API_BASE}/movie/${id}/images?api_key=${API_KEY}`,
		reviews: (id: string | number) =>
			`${API_BASE}/movie/${id}/reviews?api_key=${API_KEY}`,
	},

	SEARCH: {
		movie: (query: string, page = 1) =>
			`${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
				query
			)}&page=${page}`,
	},

	IMAGE: {
		base: IMAGE_BASE_URL,
	},
};
