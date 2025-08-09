"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import Button from "./Button";
import Input from "./Input";

import { useMoviesContext } from "@/context/moviesContext";

import { debounce } from "@/constants/helpers/debounce";

import "@/styles/components/header.scss";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const {
		search: { setSearchQuery },
		type: { setTypeOf },
	} = useMoviesContext();
	const isDetails = pathname.startsWith("/details");

	const [selected, setSelected] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [isMenu, setIsMenu] = useState(false);
	const [inputValue, setInputValue] = useState("");
	// const [windowWidth, setWindowWidth] = useState(0);

	console.log(isMenu, "ismenu");

	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setShowDropdown(prev => !prev);

	const handleOptionClick = (option: string) => {
		setSelected(option);
		setTypeOf(option);
		setShowDropdown(false);
	};

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setSearchQuery(value);

				setIsMenu(false);
			}, 800),
		[]
	);

	useEffect(() => {
		debouncedSearch(inputValue);
	}, [inputValue, debouncedSearch]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		}

		if (showDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	// useEffect(() => {
	// 	setWindowWidth(window.innerWidth);

	// 	const handleResize = () => setWindowWidth(window.innerWidth);
	// 	window.addEventListener("resize", handleResize);

	// 	return () => window.removeEventListener("resize", handleResize);
	// }, [setSearchQuery]);

	return (
		<header
			className="header"
			style={{
				backgroundColor: isDetails ? "rgba(0, 0, 0, 0.9)" : undefined,
				overflow: isDetails ? "hidden" : undefined,
			}}
		>
			<main className="container headerContainer">
				<div
					className="header__logo-box"
					onClick={() => {
						if (isDetails) {
							router.push("/");
						}
					}}
					style={{ cursor: isDetails ? "pointer" : undefined }}
				>
					<Image
						src="/assets/tmdb.svg"
						alt="TMDB Logo"
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div
					style={{ display: isDetails ? "none" : undefined }}
					className={`header__search-logout-wrap mobile-search-logout-wrap ${
						isMenu ? "move" : ""
					}`}
				>
					<div className="filterWrapper" ref={dropdownRef}>
						<div
							className="header__filter-menu filterIconBox"
							onClick={toggleDropdown}
						>
							<CiFilter className="filterIcon" color="white" size={19} />
							<span className="filterLabel">{selected}</span>
						</div>

						{showDropdown && (
							<div className="dropdownBox">
								<div
									className="customOption"
									onClick={() => handleOptionClick("movie")}
								>
									Movies
								</div>
								<div
									className="customOption"
									onClick={() => handleOptionClick("tv")}
								>
									Tv
								</div>
							</div>
						)}
					</div>

					<div className="header__search">
						<Input
							type="text"
							value={inputValue}
							placeholder="Search movies"
							onChange={e => setInputValue(e.target.value)}
							searchText={inputValue}
							setSearchText={setInputValue}
							showIcon={true}
						/>
					</div>
					<div
						className="header__logout-button"
						onClick={() => {
							setIsMenu(false);
							localStorage.removeItem("userPayload");
							router.push("/login");
						}}
					>
						<Button text="Logout" variant="danger" />
					</div>
				</div>
				<div
					onClick={() => setIsMenu(prev => !prev)}
					className="header__filter-menu menuBox"
					style={{
						display: isDetails ? "none" : undefined,
					}}
				>
					{isMenu ? (
						<RxCross2 color="white" size={20} />
					) : (
						<RxHamburgerMenu color="white" size={20} />
					)}
				</div>
			</main>
			<div className="header__shimmer"></div>
		</header>
	);
};

export default Header;
