"use client";

import React from "react";
import "@/styles/components/button.scss";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	type = "button",
	disabled = false,
	variant = "primary",
}) => {
	return (
		<button
			className={`glass-button ${variant}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
