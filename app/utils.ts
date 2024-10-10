import { format } from "date-fns";
import type { InstitutionProps } from "./types";

/**
 * Concatenates and returns a string of class names.
 *
 * @param classes - The class names to concatenate.
 * @returns A string of concatenated class names.
 */
export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

/**
 * Shortens the given address by replacing the middle characters with ellipsis.
 * @param address - The address to be shortened.
 * @param chars - The number of characters to keep at the beginning and end of the address. Default is 4.
 * @returns The shortened address.
 */
export function shortenAddress(address: string, chars = 4): string {
	if (address.length <= 2 * chars) {
		return address;
	}
	return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep. If undefined, the function will not pause.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retrieves the institution name based on the provided institution code.
 *
 * @param code - The institution code.
 * @returns The institution name associated with the provided code, or undefined if not found.
 */
export function getInstitutionNameByCode(
	code: string,
	supportedInstitutions: InstitutionProps[],
): string | undefined {
	const institution = supportedInstitutions.find((inst) => inst.code === code);
	return institution ? institution.name : undefined;
}

/**
 * Formats a number as a currency string.
 *
 * @param value - The number to format.
 * @param currency - The currency code to use.
 * @param locale - The locale to use, e.g., "en-US".
 * @returns The formatted currency string.
 */
export const formatCurrency = (
	value: number,
	currency: string,
	locale: string,
) => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(value);
};

/**
 * Formats a given date string, number, or Date object into a specific string format.
 *
 * @param dateString - The date to format, which can be a string, number, or Date object.
 * @returns A formatted date string in the format "dd MMM, yyyy HH:mm.
 */
export const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	return format(date, "dd, MMM yyyy HH:mm");
};
