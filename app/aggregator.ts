import axios from "axios";
import type { InstitutionProps, VerifyAccountPayload } from "./types";

const AGGREGATOR_URL = process.env.NEXT_PUBLIC_AGGREGATOR_URL;

export const fetchSupportedInstitutions = async (
	currency: string,
): Promise<InstitutionProps[]> => {
	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/institutions/${currency}`,
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching supported institutions: ", error);
		throw error;
	}
};

export const fetchAccountName = async (
	payload: VerifyAccountPayload,
): Promise<string> => {
	try {
		const response = await axios.post(
			`${AGGREGATOR_URL}/verify-account`,
			payload,
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching account name: ", error);
		throw error;
	}
};
