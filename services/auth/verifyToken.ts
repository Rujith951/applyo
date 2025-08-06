import { ENDPOINTS } from "@/constants/endPoints";

type verifyPayload = {
	username: string;
	password: string;
	request_token: string;
};

const { validateLogin } = ENDPOINTS.AUTH;

export const verifyToken = async (payload: verifyPayload) => {
	try {
		const response = await fetch(validateLogin, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (!data.success) {
			// throw new Error(data.status_message);
			const error = new Error(data.status_message);
			error.name = "LoginError";
			throw error;
		}

		return data;
	} catch (err) {
		console.error("verifyToken error:", err);
		throw err;
	}
};
