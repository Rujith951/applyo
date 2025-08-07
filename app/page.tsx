"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

import Header from "@/components/Header";

import "@/styles/pages/home.scss";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";
import { MoviesContext, useMoviesContext } from "@/context/moviesContext";

const Home = () => {
	const router = useRouter();
	const [state, setState] = useState<any>([]);
	console.log(state, "state");

	useLayoutEffect(() => {
		const ciphertext = localStorage.getItem("userPayload");
		if (!ciphertext) {
			return router.replace("/login");
		}
		// const bytes = CryptoJS.AES.decrypt(
		// 	ciphertext,
		// 	process.env.NEXT_PUBLIC_SECRET_KEY!
		// );
		// const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		window.history.pushState(null, "", window.location.href);
		const onPopState = () => {
			window.history.pushState(null, "", window.location.href);
		};
		window.addEventListener("popstate", onPopState);
		return () => {
			window.removeEventListener("popstate", onPopState);
		};
	}, [router]);

	useEffect(() => {
		f();
	}, []);

	async function f() {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
		);

		const data = await response.json();
		setState(data.results);
	}

	return (
		<main className="home">
			<Header />
			<div className="container homeContainer">
				{state.map((movie: any, index: any) => (
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
			<div className="home__pagination-box">
				<Pagination />
			</div>
		</main>
	);
};

export default Home;
