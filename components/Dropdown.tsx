"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiCheck } from "react-icons/pi";
import { MdOutlineLockClock } from "react-icons/md";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useOutsideClick } from "@/app/hooks";
import { dropdownVariants } from "./Animations";

export interface DropdownItem {
	name: string;
	label?: string;
	imageUrl?: string;
	disabled?: boolean;
}

interface FlexibleDropdownProps {
	data: DropdownItem[];
	defaultSelectedItem?: string;
	onSelect?: (name: string) => void;
	children: (props: {
		selectedItem: DropdownItem | undefined;
		isOpen: boolean;
		toggleDropdown: () => void;
	}) => ReactNode;
	className?: string;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export const Dropdown = ({
	defaultSelectedItem,
	onSelect,
	data,
	children,
	className,
}: FlexibleDropdownProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
		defaultSelectedItem
			? data?.find((item) => item.name === defaultSelectedItem)
			: undefined,
	);

	const handleChange = (item: DropdownItem) => {
		setSelectedItem(item);
		onSelect?.(item.name);
		setIsOpen(false);
	};

	useEffect(() => {
		if (defaultSelectedItem && data) {
			const newSelectedItem = data.find(
				(item) => item.name === defaultSelectedItem,
			);
			newSelectedItem && setSelectedItem(newSelectedItem);
		} else {
			setSelectedItem(undefined);
		}
	}, [defaultSelectedItem, data]);

	const dropdownRef = useRef<HTMLDivElement>(null);
	useOutsideClick({
		ref: dropdownRef,
		handler: () => setIsOpen(false),
	});

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<div ref={dropdownRef} className="relative z-50">
			{children({ selectedItem, isOpen, toggleDropdown })}

			{/* Dropdown content */}
			{isOpen && (
				<motion.div
					initial="closed"
					animate={isOpen ? "open" : "closed"}
					exit="closed"
					variants={dropdownVariants}
					aria-label="Dropdown menu"
					className={classNames(
						"absolute right-0 bottom-0 z-50 mt-2 max-h-52 w-full max-w-full overflow-y-auto rounded-xl bg-gray-50 shadow-xl",
						className ?? "min-w-40",
					)}
				>
					<ul aria-labelledby="networks-dropdown">
						{data?.map((item) => (
							<li key={item.name}>
								<button
									type="button"
									onClick={() => !item.disabled && handleChange(item)}
									className={classNames(
										"w-full flex items-center justify-between gap-2 px-3 py-2 transition-all hover:bg-gray-200",
										item?.disabled
											? "pointer-events-none cursor-not-allowed"
											: "cursor-pointer",
									)}
								>
									<div className="flex items-center gap-1">
										{item.imageUrl && (
											<Image
												src={item.imageUrl ?? ""}
												alt="image"
												loading="lazy"
												width={20}
												height={20}
												className="me-2 h-5 w-5 rounded-full object-cover"
											/>
										)}

										<span className="text-neutral-900">
											{item.label ?? item.name}
										</span>
									</div>

									{item.disabled ? (
										<MdOutlineLockClock className="text-lg text-gray-400" />
									) : (
										<PiCheck
											className={classNames(
												"text-lg text-gray-400 transition-transform",
												selectedItem?.name === item.name ? "" : "hidden",
											)}
										/>
									)}
								</button>
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</div>
	);
};
