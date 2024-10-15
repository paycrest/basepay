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

/**
 * Returns a human-readable relative time string based on the difference between the given date and the current date.
 *
 * @param date - The date to compare with the current date.
 * @returns A string representing the relative time difference. Possible values include:
 * - "Today"
 * - "Yesterday"
 * - "X days ago" (where X is the number of days less than 7)
 * - "One week ago"
 * - "One month ago"
 * - "X months ago" (where X is the number of months less than 12)
 * - "One year ago"
 * - "X years ago" (where X is the number of years less than 5)
 * - "A long time ago"
 */
export const getRelativeTimeString = (date: Date): string => {
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffDays / 365);

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return "One week ago";
	if (diffMonths === 1) return "One month ago";
	if (diffMonths < 12) return `${diffMonths} months ago`;
	if (diffYears === 1) return "One year ago";
	if (diffYears < 5) return `${diffYears} years ago`;
	return "A long time ago";
};
