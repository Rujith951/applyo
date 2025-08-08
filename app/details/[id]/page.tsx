"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiPlay } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";

import "@/styles/pages/movieDetails.scss";
import {
	fetchMovieDetails,
	fetchVideo,
	MovieDetailsInterface,
} from "@/services/movies/fetchMovieDetails";
import Header from "@/components/Header";
import { ENDPOINTS } from "@/constants/endPoints";

const MovieDetails = () => {
	const [movie, setMovie] = useState<MovieDetailsInterface | null>(null);
	const [videoKey, setVideoKey] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);

	console.log(movie, "movie");

	const params = useParams();
	const id = params?.id;

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!id || Array.isArray(id)) return;

		const onLoad = async () => {
			const data = await fetchMovieDetails(id);
			setMovie(data);

			const key = await fetchVideo(id);
			setVideoKey(key);
		};

		onLoad();
	}, [id]);

	if (!movie) return <div className="loading">Loading...</div>;

	return (
		<main className="details">
			{open && (
				<div className="videoOverlay">
					<div className="videoOverlay__vidoe-box">
						<iframe
							src={`https://www.youtube.com/embed/${videoKey}`}
							frameBorder="0"
							allowFullScreen
						></iframe>
						<div
							className="videoOverlay__crossBox"
							onClick={() => setOpen(false)}
						>
							<RxCrossCircled color="white" size={25} />
						</div>
					</div>
				</div>
			)}

			<Header />

			<div
				className="backdrop"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
				}}
			>
				<div className="overlay">
					<div className="overlay__details-box">
						<h1>{movie.title || movie.name}</h1>
						<div className="meta">
							<span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
							<span className="release">
								<strong>Release Date:</strong> {movie.release_date || "N/A"}
							</span>
							<div className="genres">
								{movie.genres.map(genre => (
									<span key={genre.id} className="genre">
										{genre.name}
									</span>
								))}
							</div>

							<p>
								<strong>Runtime:</strong> {movie.runtime ?? "N/A"} min
							</p>
							<p>
								<strong>Revenue:</strong> $
								{movie.revenue?.toLocaleString() ?? "N/A"}
							</p>
							<p>
								<strong>Votes:</strong> {movie.vote_count ?? "N/A"}
							</p>
							<p>
								<strong>Production Countries:</strong>{" "}
								{movie.production_countries?.map(c => c.name).join(", ") ||
									"N/A"}
							</p>
							<p>
								<strong>Production Companies:</strong>{" "}
								{movie.production_companies?.map(c => c.name).join(", ") ||
									"N/A"}
							</p>
						</div>

						<p className="overview">
							<strong>Overview:</strong> {movie.overview}
						</p>
					</div>

					<div
						className="overlay__playButton-box"
						onClick={() => {
							if (windowWidth <= 820) {
								setOpen(true);
							}
						}}
						style={{
							backgroundImage:
								movie.poster_path && windowWidth <= 820
									? `url(${ENDPOINTS.IMAGE.base}${movie.poster_path})`
									: "none",
						}}
					>
						<div
							className="overlay__playButton-boxIcon-box"
							onClick={() => setOpen(true)}
						>
							<FiPlay size={30} color="#fff" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default MovieDetails;
