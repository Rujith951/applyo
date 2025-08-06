import React from "react";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import Button from "./Button";

import "@/styles/components/header.scss";
import Input from "./Input";

const Header = () => {
	return (
		<header className="header">
			<main className="container headerContainer">
				<div className="header__logo-box">
					<Image
						src="/assets/tmdb.svg"
						alt="TMDB Logo"
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="header__search-logout-wrap">
					<div className="header__filter-menu filterIconBox">
						<CiFilter className="filterIcon" color="white" size={20} />
					</div>
					<div className="header__search">
						<Input
							type="text"
							value={"rujith"}
							placeholder="Search movies"
							onChange={() => {}}
						/>
					</div>
					<div className="header__logout-button">
						<Button text="Logout" variant="danger" />
					</div>
				</div>
				<div className="header__filter-menu menuBox">
					<RxHamburgerMenu color="white" size={20} />
				</div>
			</main>
			<div className="header__shimmer"></div>
		</header>
	);
};

export default Header;
