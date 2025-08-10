"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { getMoviesAndTvShows } from "@/services/getMoviesAndTvShows";
import { fetchSearchedMovies } from "@/services/movies/fetchSearchedMovies";

export interface Movie {
	id: number;
	title?: string;
	name?: string;
	poster_path: string;
	overview: string;
	media_type?: "movie" | "tv";
	release_date?: string;
	first_air_date?: string;
}

interface MoviesContextType {
	moviesData: {
		movies: Movie[];
		setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	};
	filteredData: {
		filteredMovies: Movie[];
		setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	};
	search: {
		searchQuery: string;
		setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	};
	filters: {
		filters: {
			type: string;
			year: string;
		};
		setFilters: React.Dispatch<
			React.SetStateAction<{
				type: string;
				year: string;
			}>
		>;
	};
	page: {
		currentPage: number;
		setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	};
	searchPageDetails: {
		pageOfSearch: {
			totalPages: number;
			searchCurrentPage: number;
		};
		setPageOfSearch: React.Dispatch<
			React.SetStateAction<{
				totalPages: number;
				searchCurrentPage: number;
			}>
		>;
	};
	type: {
		typeOf: string;
		setTypeOf: React.Dispatch<React.SetStateAction<string>>;
	};
	// fetchMovies: () => void;
	isLoading: boolean;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(
	undefined
);

export const MoviesContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [typeOf, setTypeOf] = useState("");
	const [filters, setFilters] = useState({ type: "", year: "" });
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageOfSearch, setPageOfSearch] = useState({
		totalPages: 0,
		searchCurrentPage: 1,
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const storedPage = localStorage.getItem("currentPage");
		if (storedPage !== null) {
			setCurrentPage(parseInt(storedPage, 10));
		}
	}, []);

	useEffect(() => {
		if (searchQuery || filters.type || filters.year) return;
		const load = async () => {
			setIsLoading(true);
			try {
				const data = await getMoviesAndTvShows(currentPage);
				setMovies(data);
			} finally {
				setIsLoading(false);
			}
		};
		void load();
	}, [currentPage, searchQuery, filters]);

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);
			try {
				const data = await fetchSearchedMovies(
					searchQuery,
					pageOfSearch.searchCurrentPage
				);

				if ("results" in data && "totalPages" in data) {
					setFilteredMovies(data.results);
					setPageOfSearch(prev => ({
						...prev,
						totalPages: data.totalPages,
					}));
				} else {
					setFilteredMovies([]);
					setPageOfSearch(prev => ({
						...prev,
						totalPages: 0,
					}));
				}
			} finally {
				setIsLoading(false);
			}
		};

		void load();
	}, [searchQuery, pageOfSearch.searchCurrentPage]);

	return (
		<MoviesContext.Provider
			value={{
				moviesData: { movies, setMovies },
				filteredData: { filteredMovies, setFilteredMovies },
				search: { searchQuery, setSearchQuery },
				filters: { filters, setFilters },
				page: { currentPage, setCurrentPage },
				searchPageDetails: { pageOfSearch, setPageOfSearch },
				type: { typeOf, setTypeOf },

				// fetchMovies: () => void 0,
				isLoading,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export const useMoviesContext = () => {
	const ctx = useContext(MoviesContext);
	if (!ctx)
		throw new Error("useMoviesContext must be inside MoviesContextProvider");
	return ctx;
};
