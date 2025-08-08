"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/constants/endPoints";
import "@/styles/components/movieCard.scss";

type MovieCardProps = {
	id: number;
	title: string;
	poster_path: string;
	release_date: string;
};

const MovieCard = ({
	id,
	title,
	poster_path,
	release_date,
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
					alt={title}
					onError={e => {
						(e.target as HTMLImageElement).src = "/assets/Noimg.jpg";
					}}
				/>
			</div>
			<div className="movie-card__details">
				<h3 className="movie-card__title">{title}</h3>
				<p className="movie-card__date">Release: {release_date}</p>
			</div>
		</div>
	);
};

export default MovieCard;
