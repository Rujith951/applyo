// import { ENDPOINTS } from "@/constants/endPoints";

// const { details } = ENDPOINTS.MOVIES;

// export interface MovieDetailsInterface {
// 	id: number;
// 	title: string;
// 	name?: string;
// 	overview: string;
// 	genres: { id: number; name: string }[];
// 	release_date?: string;
// 	backdrop_path: string;
// 	vote_average: number;
// }

// export async function fetchMovieDetails(
// 	id: number | string
// ): Promise<MovieDetailsInterface> {
// 	const res = await fetch(ENDPOINTS.MOVIES.details(id));
// 	return res.json();
// }

// export async function fetchVideo(id: string) {
// 	try {
// 		const resp = await fetch(ENDPOINTS.MOVIES.playMovieVideo(id));
// 		if (resp.ok === true) {
// 			let data = await resp.json();
// 			return data.results[0].key;
// 		}
// 	} catch (err) {
// 		console.log(err, "occured in fetching movie vedio ");
// 	}
// }

import { ENDPOINTS } from "@/constants/endPoints";

const { details } = ENDPOINTS.MOVIES;

export interface MovieDetailsInterface {
	id: number;
	title: string;
	name?: string;
	overview: string;
	genres: { id: number; name: string }[];
	release_date?: string;
	backdrop_path: string;
	poster_path?: string;
	vote_average: number;
	runtime?: number;
	budget?: number;
	revenue?: number;
	homepage?: string;
	imdb_id?: string;
	original_language?: string;
	origin_country?: string[]; // Optional, might be from TV shows
	production_companies?: { name: string }[];
	production_countries?: { name: string }[];
	vote_count?: number; // ✅ Add this to fix the TS error
}

export async function fetchMovieDetails(
	id: number | string
): Promise<MovieDetailsInterface> {
	const res = await fetch(ENDPOINTS.MOVIES.details(id));
	return res.json();
}

export async function fetchVideo(id: string) {
	try {
		const resp = await fetch(ENDPOINTS.MOVIES.playMovieVideo(id));
		if (resp.ok === true) {
			let data = await resp.json();
			return data.results[0].key;
		}
	} catch (err) {
		console.log(err, "occured in fetching movie vedio ");
	}
}
