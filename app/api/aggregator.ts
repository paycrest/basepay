import axios, { type AxiosError } from "axios";
import type {
	InstitutionProps,
	LinkAddressRequest,
	LinkAddressResponse,
	LinkedAddressResponse,
	RatePayload,
	RateResponse,
	TransactionHistoryParams,
	TransactionsListResponse,
	VerifyAccountPayload,
} from "../types";
import { getAddress } from "@coinbase/onchainkit/identity";

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

export const fetchRate = async ({
	token,
	amount,
	currency,
}: RatePayload): Promise<RateResponse> => {
	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/rates/${token}/${amount}/${currency}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching rate:", error);
		throw error;
	}
};

export const linkNewAddress = async ({
	privyIdToken,
	payload,
}: {
	privyIdToken: string;
	payload: LinkAddressRequest;
}): Promise<LinkAddressResponse> => {
	privyIdToken = privyIdToken.replace(/^"(.*)"$/, "$1");

	try {
		const response = await axios.post(
			`${AGGREGATOR_URL}/linked-addresses`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${privyIdToken}`,
				},
			},
		);
		return response.data.data;
	} catch (error) {
		console.error("Error linking address:", error);
		throw error;
	}
};

export const fetchLinkedAddress = async ({
	address,
	privyIdToken,
}: {
	address: string;
	privyIdToken?: string;
}): Promise<LinkedAddressResponse> => {
	privyIdToken = privyIdToken?.replace(/^"(.*)"$/, "$1") ?? "";

	try {
		let resolvedAddress = address as `0x${string}` | null;
		if (!privyIdToken && resolvedAddress?.includes(".base.eth")) {
			resolvedAddress = await getAddress({ name: address });
		}

		const url = privyIdToken
			? `${AGGREGATOR_URL}/linked-addresses/me?owner_address=${resolvedAddress}`
			: `${AGGREGATOR_URL}/linked-addresses?owner_address=${resolvedAddress}`;

		const headers = privyIdToken
			? { Authorization: `Bearer ${privyIdToken}` }
			: undefined;

		const response = await axios.get(url, { headers });

		return {
			linkedAddress: response.data.data.linkedAddress,
			currency: response.data.data.currency,
			institution: response.data.data.institution,
			accountIdentifier: response.data.data.accountIdentifier,
			accountName: response.data.data.accountName,
			resolvedAddress,
			error: "",
		};
	} catch (error) {
		const isNotFound = (error as AxiosError).response?.status === 404;
		return {
			linkedAddress: "",
			currency: "",
			institution: "",
			accountIdentifier: "",
			accountName: "",
			resolvedAddress: "",
			error: isNotFound
				? "Linked address not found"
				: "Error fetching address status",
		};
	}
};

export const fetchTransactionHistory = async ({
	linkedAddress,
	privyIdToken,
	params,
}: {
	linkedAddress: string;
	privyIdToken: string;
	params?: TransactionHistoryParams;
}): Promise<TransactionsListResponse> => {
	privyIdToken = privyIdToken.replace(/^"(.*)"$/, "$1");

	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/linked-addresses/${linkedAddress}/transactions`,
			{
				headers: {
					Authorization: `Bearer ${privyIdToken}`,
				},
				params,
			},
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching transaction history:", error);
		throw error;
	}
};
