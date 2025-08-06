"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { createToken } from "@/services/auth/createToken";
import { verifyToken } from "@/services/auth/verifyToken";

import "@/styles/pages/login.scss";

const Login = () => {
	const [userName, SetUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	try {
	// 		const tokenData = await createToken();

	// 		if (tokenData.success) {
	// 			const payload = {
	// 				username: userName,
	// 				password: password,
	// 				request_token: tokenData.request_token,
	// 			};

	// 			const verifyData = await verifyToken(payload);
	// 			if (verifyData.success) {
	// 				const ciphertext = CryptoJS.AES.encrypt(
	// 					JSON.stringify(payload),
	// 					process.env.NEXT_PUBLIC_SECRET_KEY
	// 				).toString();
	// 				localStorage.setItem("userPayload", ciphertext);
	// 				toast.success("verifyData is verified");
	// 				router.push("/");
	// 			}
	// 		}
	// 	} catch (error: unknown) {
	// 		console.log(error, "in catch in Lo");

	// 		if (error instanceof Error) {
	// 			if (error.name === "InvalidAPIKey") {
	// 				toast.error("Your API_KEY is invalid, You must granted a valid KEY");
	// 			} else if (error.name === "LoginError") {
	// 				if (error.message.toLowerCase().includes("username")) {
	// 					setErrors(prev => ({ ...prev, email: "Username is incorrect" }));
	// 				} else if (error.message.toLowerCase().includes("password")) {
	// 					setErrors(prev => ({ ...prev, password: "Password is incorrect" }));
	// 				} else {
	// 					toast.error("Login failed. Check credentials.");
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			email: userName.trim() === "" ? "Username is required" : "",
			password: password.trim() === "" ? "Password is required" : "",
		};

		setErrors(newErrors);

		if (newErrors.email || newErrors.password) return;

		try {
			const tokenData = await createToken();

			if (tokenData.success) {
				const payload = {
					username: userName,
					password: password,
					request_token: tokenData.request_token,
				};

				const verifyData = await verifyToken(payload);
				if (verifyData.success) {
					const ciphertext = CryptoJS.AES.encrypt(
						JSON.stringify(payload),
						process.env.NEXT_PUBLIC_SECRET_KEY!
					).toString();
					localStorage.setItem("userPayload", ciphertext);
					toast.success("Logged in successfully");
					router.push("/");
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.name === "InvalidAPIKey") {
					toast.error("Your API_KEY is invalid");
				} else if (error.name === "LoginError") {
					if (error.message.toLowerCase().includes("username")) {
						toast.error("userName/password is incorrect");
					} else {
						toast.error("Login failed. Check credentials.");
					}
				}
			}
		}
	};

	return (
		<main className="login">
			<div className="container loginContainer">
				<div className="login__form-box">
					<h1 className="heading">Login Form</h1>
					<form className="login__form" onSubmit={handleSubmit}>
						<Input
							type="text"
							placeholder="Enter userName"
							value={userName}
							onChange={e => {
								SetUserName(e.target.value);
								if (errors.email) {
									setErrors(prev => ({ ...prev, email: "" }));
								}
							}}
						/>
						<span className={`input-error ${errors.email ? "visible" : ""}`}>
							{errors.email || "Error placeholder"}
						</span>
						<Input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={e => {
								setPassword(e.target.value);
								if (errors.password) {
									setErrors(prev => ({ ...prev, password: "" }));
								}
							}}
						/>
						<span className={`input-error ${errors.password ? "visible" : ""}`}>
							{errors.password || "Error placeholder"}
						</span>
						<div className="login__button-wrapper">
							<Button text="Login" type="submit" />
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;

// if (ciphertext) {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//   const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   console.log(decrypted);
// }to decrypt
