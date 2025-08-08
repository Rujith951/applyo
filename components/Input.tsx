"use client";

import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "@/styles/components/input.scss";

interface InputProps {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchText?: string;
	setSearchText?: React.Dispatch<React.SetStateAction<string>>;
	showIcon: boolean;
}

const Input: React.FC<InputProps> = ({
	type = "text",
	placeholder,
	value,
	onChange,
	searchText,
	setSearchText,
	showIcon,
}) => {
	const clearSearch = () => setSearchText?.("");

	return (
		<div className="glass-inputBox">
			<input
				className="input"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{searchText ? (
				<FaTimes
					style={{ display: showIcon ? "block" : "none" }}
					className="icon clear-icon"
					onClick={clearSearch}
				/>
			) : (
				<FaSearch
					style={{ display: showIcon ? "block" : "none" }}
					className="icon search-icon"
				/>
			)}
		</div>
	);
};

export default Input;
