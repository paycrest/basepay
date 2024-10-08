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
