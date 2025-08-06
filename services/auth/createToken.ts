import { ENDPOINTS } from "@/constants/endPoints";

const { requestToken } = ENDPOINTS.AUTH;

export const createToken = async () => {
	try {
		const res = await fetch(requestToken);

		const data = await res.json();

		if (!data.success) {
			// throw new Error(data.status_message);
			const error = new Error(data.status_message);
			error.name = "InvalidAPIKey";
			throw error;
		}

		return data;
	} catch (err) {
		throw err;
	}
};
