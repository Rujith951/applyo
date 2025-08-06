"use client";

import React from "react";
import "@/styles/components/input.scss";

interface InputProps {
	label?: string;
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	// error?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	// error,
}) => {
	return (
		<div style={{ width: "100%" }}>
			{label && <label>{label}</label>}
			<input
				className="glass-input"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{/* <span className={`input-error ${error ? "visible" : "visible"}`}>
				{error || "Error placeholder"}
			</span> */}
		</div>
	);
};

export default Input;
