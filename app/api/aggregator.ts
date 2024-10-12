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
import { createThirdwebClient } from "thirdweb";
import {
	BASENAME_RESOLVER_ADDRESS,
	resolveAddress,
	resolveL2Name,
} from "thirdweb/extensions/ens";
import { base as thirdwebBase } from "thirdweb/chains";

const AGGREGATOR_URL = process.env.NEXT_PUBLIC_AGGREGATOR_URL;

const client = createThirdwebClient({
	secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY ?? "",
});

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
}: { address: string }): Promise<LinkedAddressResponse> => {
	try {
		const resolvedAddress = await resolveAddress({
			client,
			name: address,
			resolverAddress: BASENAME_RESOLVER_ADDRESS,
			resolverChain: thirdwebBase,
		});

		const response = await axios.get(
			`${AGGREGATOR_URL}/linked-addresses?owner_address=${resolvedAddress}`,
		);

		return {
			linkedAddress: response.data.data.linkedAddress,
			currency: response.data.data.currency,
			resolvedAddress,
			error: "",
		};
	} catch (error) {
		if ((error as AxiosError).response?.status === 404) {
			return {
				linkedAddress: "",
				currency: "",
				resolvedAddress: "",
				error: "Linked address not found",
			};
		}
		console.error("Error fetching address status:", error);
		return {
			linkedAddress: "",
			currency: "",
			resolvedAddress: "",
			error: "Error fetching address status",
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

export const getBasename = async (address: string): Promise<string | null> => {
	try {
		const basename = await resolveL2Name({
			client,
			address,
			resolverAddress: BASENAME_RESOLVER_ADDRESS,
			resolverChain: thirdwebBase,
		});

		return basename;
	} catch (error) {
		console.error("Error fetching basename:", error);
		throw error;
	}
};
