"use client";

import React from "react";
import "@/styles/components/button.scss";
import Loader from "./Loader";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger";
	loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	type = "button",
	disabled = false,
	variant = "primary",
	loading = false,
}) => {
	return (
		<button
			className={`glass-button ${variant} ${loading ? "loading" : ""}`}
			onClick={onClick}
			type={type}
			disabled={disabled || loading}
		>
			<span>{text}</span>
			{loading && <Loader width="12px" height="12px" />}
		</button>
	);
};

export default Button;
