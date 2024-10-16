import { useEffect, useState } from "react";
import type { CopiedStates, OutsideClickHandlerProps } from "./types";

/**
 * Custom hook that triggers a handler function when a click is detected outside of the specified element.
 *
 * @param {Object} props - The properties object.
 * @param {React.RefObject<HTMLElement>} props.ref - The reference to the element to detect outside clicks.
 * @param {Function} props.handler - The function to call when an outside click is detected.
 *
 * @example
 * const ref = useRef(null);
 * const handleClickOutside = () => {
 *   console.log('Clicked outside');
 * };
 * useOutsideClick({ ref, handler: handleClickOutside });
 */
export const useOutsideClick = ({ ref, handler }: OutsideClickHandlerProps) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
};

/**
 * Custom hook that provides functionality to copy text to the clipboard and manage copied states.
 *
 * @returns An object containing:
 * - `copiedStates`: An object representing the states of copied items.
 * - `copyToClipboard`: A function to copy a specified value to the clipboard and update the copied state.
 */
export const useCopyToClipboard = () => {
	const [copiedStates, setCopiedStates] = useState<CopiedStates>({});

	/**
	 * Copies the specified value to the clipboard and updates the copied state.
	 * @param key - The key associated with the value being copied.
	 * @param value - The value to be copied to the clipboard.
	 */
	const copyToClipboard = (key: string, value: string) => {
		navigator.clipboard.writeText(value);
		setCopiedStates((prev: CopiedStates) => ({ ...prev, [key]: true }));
		setTimeout(() => {
			setCopiedStates((prev) => ({ ...prev, [key]: false }));
		}, 1000);
	};

	return { copiedStates, copyToClipboard };
};
