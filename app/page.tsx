"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";

import { useMoviesContext } from "@/context/moviesContext";
import "@/styles/pages/home.scss";
import Loader from "@/components/Loader";

const Home = () => {
	const router = useRouter();

	const {
		moviesData,
		filteredData,
		page,
		searchPageDetails: { pageOfSearch, setPageOfSearch },
		search,
		type: { typeOf },
		isLoading,
	} = useMoviesContext();

	const [filteredByTypeMovies, setFilteredByTypeMovies] = useState<any[]>([]);

	const dataShouldRender =
		filteredData.filteredMovies && filteredData.filteredMovies.length > 0
			? filteredData.filteredMovies
			: moviesData.movies;

	useEffect(() => {
		if (!typeOf) {
			setFilteredByTypeMovies([]);
			return;
		}

		const filtered = dataShouldRender.filter(
			(item: any) => item.media_type === typeOf
		);
		setFilteredByTypeMovies(filtered);
	}, [typeOf, dataShouldRender]);

	// ✅ Protect route
	useLayoutEffect(() => {
		const ciphertext = localStorage.getItem("userPayload");
		if (!ciphertext) {
			return router.replace("/login");
		}

		window.history.pushState(null, "", window.location.href);
		const onPopState = () => {
			window.history.pushState(null, "", window.location.href);
		};
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, [router]);

	// ✅ Pagination handling
	const handlePageChange = (selectedItem: any) => {
		const selectedPage = selectedItem.selected + 1;

		if (search.searchQuery) {
			setPageOfSearch(prev => ({
				...prev,
				searchCurrentPage: selectedPage,
			}));
		} else {
			page.setCurrentPage(selectedPage);
			localStorage.setItem("currentPage", JSON.stringify(selectedPage));
		}
	};

	return (
		<main className="home">
			<Header />
			{isLoading ? (
				<div
					className="container homeContainer"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Loader width="40px" height="40px" />
				</div>
			) : (
				<div className="container homeContainer">
					{(filteredByTypeMovies.length > 0
						? filteredByTypeMovies
						: dataShouldRender
					).map((movie: any, index: number) => (
						<div key={index} className="home__movie-card-box">
							<MovieCard
								id={movie.id}
								title={movie.title}
								poster_path={movie.poster_path}
								release_date={movie.release_date}
							/>
						</div>
					))}
				</div>
			)}
			<div className="home__pagination-box">
				<Pagination
					onPageChange={handlePageChange}
					currentPage={
						search.searchQuery
							? pageOfSearch.searchCurrentPage
							: page.currentPage
					}
					totalPages={search.searchQuery ? pageOfSearch.totalPages : 500}
				/>
			</div>
		</main>
	);
};

export default Home;
