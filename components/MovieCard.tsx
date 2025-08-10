"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/constants/endPoints";
import "@/styles/components/movieCard.scss";

type MovieCardProps = {
	id: number;
	title?: string;
	name?: string;
	poster_path: string;
	release_date?: string;
	first_air_date?: string;
};

const MovieCard = ({
	id,
	title,
	name,
	poster_path,
	release_date,
	first_air_date,
}: MovieCardProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/details/${id}`);
	};

	const imageSrc = poster_path
		? `${ENDPOINTS.IMAGE.base}${poster_path}`
		: "/assets/Noimg.jpg";

	return (
		<div
			className="movie-card"
			onClick={handleCardClick}
			style={{ cursor: "pointer" }}
		>
			<div className="movie-card__poster">
				<img
					className="movie-card__posterImg"
					src={imageSrc}
					alt={title || name || "No title"}
					onError={e => {
						(e.target as HTMLImageElement).src = "/assets/Noimg.jpg";
					}}
				/>
			</div>
			<div className="movie-card__details">
				<h3 className="movie-card__title">{title || name}</h3>
				<p className="movie-card__date">
					Release: {release_date || first_air_date || "N/A"}
				</p>
			</div>
		</div>
	);
};

export default MovieCard;
