"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { getMoviesAndTvShows } from "@/services/getMoviesAndTvShows";

export interface Movie {
	id: number;
	title: string;
	name?: string; // for TV shows
	poster_path: string;
	overview: string;
	media_type?: "movie" | "tv";
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
	const [filters, setFilters] = useState({ type: "", year: "" });
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// only when nothing else is active
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

	return (
		<MoviesContext.Provider
			value={{
				moviesData: { movies, setMovies },
				filteredData: { filteredMovies, setFilteredMovies },
				search: { searchQuery, setSearchQuery },
				filters: { filters, setFilters },
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
