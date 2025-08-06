"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

import Header from "@/components/Header";

import "@/styles/pages/home.scss";

const Home = () => {
	const router = useRouter();

	useLayoutEffect(() => {
		const ciphertext = localStorage.getItem("userPayload");
		if (!ciphertext) {
			return router.replace("/login");
		}
		const bytes = CryptoJS.AES.decrypt(
			ciphertext,
			process.env.NEXT_PUBLIC_SECRET_KEY!
		);
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

	return (
		<main className="home">
			<Header />
			<div className="container homeContainer"></div>
		</main>
	);
};

export default Home;
