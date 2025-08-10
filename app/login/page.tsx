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
	const [isLoading, setIsLoading] = useState(false);

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	console.log(isLoading, "in login");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			email: userName.trim() === "" ? "Username is required" : "",
			password: password.trim() === "" ? "Password is required" : "",
		};

		setErrors(newErrors);

		if (newErrors.email || newErrors.password) return;

		setIsLoading(true);

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
		} finally {
			setIsLoading(false);
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
							showIcon={false}
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
							showIcon={false}
						/>
						<span className={`input-error ${errors.password ? "visible" : ""}`}>
							{errors.password || "Error placeholder"}
						</span>
						<div className="login__button-wrapper">
							<Button text="Login" type="submit" loading={isLoading} />
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;
