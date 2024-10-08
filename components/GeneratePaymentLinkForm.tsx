import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ImSpinner } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { PiCaretDown } from "react-icons/pi";

import {
	AnimatedContainer,
	AnimatedItem,
	dropdownVariants,
} from "./Animations";
import {
	inputClasses,
	primaryButtonStyles,
	secondaryButtonStyles,
} from "./Styles";
import { classNames } from "@/app/utils";
import { useOutsideClick } from "@/app/hooks";
import type { InstitutionProps } from "@/app/types";
import { GreenCheckCircleIcon } from "./ImageAssets";
import { Dropdown } from "./Dropdown";
import { currencies, institutions } from "@/app/mocks";
import { BankDropdown } from "./BankDropdown";

export const GeneratePaymentLinkForm = () => {
	const { register, setValue } = useForm();
	const [isFetchingInstitutions, setIsFetchingInstitutions] = useState(false);
	const [selectedInstitution, setSelectedInstitution] =
		useState<InstitutionProps | null>(null);

	return (
		<AnimatedContainer className="space-y-6">
			<AnimatedItem className="space-y-3 bg-background-neutral rounded-2xl">
				<div className="p-4 pb-0">
					<div className="rounded-2xl border-border-light border bg-white p-4 space-y-2 text-sm font-normal">
						<p className="text-text-primary font-medium">Supported Tokens</p>
						<p className="text-text-secondary">
							Your customers can pay you with any of these tokens and you will
							receive your payment directly in your bank account
						</p>
						<div className="flex gap-3">
							<div className="bg-background-neutral rounded-full px-2 py-1 flex gap-1">
								<Image
									src="/logos/usdt.svg"
									alt="usdt"
									width={16}
									height={16}
								/>
								<p className="text-text-primary">USDT</p>
							</div>
							<div className="bg-background-neutral rounded-full px-2 py-1 flex gap-1">
								<Image
									src="/logos/usdc.svg"
									alt="usdc"
									width={16}
									height={16}
								/>
								<p className="text-text-primary">USDC</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-1 px-4">
					<p className="text-text-primary font-medium">Basic details</p>
					<p className="text-text-secondary font-normal text-sm">
						Personalize your basepay link
					</p>
				</div>

				<div className="rounded-2xl border-border-light border bg-white p-4 space-y-2 text-sm font-normal">
					<p className="text-text-primary font-medium">
						Full name/trading name{" "}
						<span className="font-normal">(optional)</span>
					</p>

					<input
						type="text"
						placeholder="Enter your full name or trading name"
						{...register("name")}
						className={inputClasses}
					/>
				</div>
			</AnimatedItem>

			<AnimatedItem className="space-y-3 bg-background-neutral rounded-2xl">
				<div className="space-y-1 px-4">
					<p className="text-text-primary font-medium">Account information</p>
					<p className="text-text-secondary font-normal text-sm">
						Specify account to receive payments
					</p>
				</div>

				<div className="rounded-2xl border-border-light border bg-white p-4 space-y-3 text-sm font-normal">
					<div className="space-y-2">
						<p className="text-text-primary font-medium">Currency</p>

						<Dropdown
							data={currencies}
							onSelect={(selectedCurrency) =>
								setValue("currency", selectedCurrency)
							}
							className="w-full"
						>
							{({ selectedItem, isOpen, toggleDropdown }) => (
								<button
									type="button"
									onClick={toggleDropdown}
									disabled={isFetchingInstitutions}
									className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left text-sm text-neutral-900 outline-none transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
								>
									{selectedItem?.name ? (
										<div className="flex items-center gap-1.5">
											<Image
												alt={selectedItem?.name}
												src={selectedItem?.imageUrl ?? ""}
												width={20}
												height={20}
												className="size-5 object-contain"
											/>
											<p className="">{selectedItem?.name}</p>
										</div>
									) : (
										<p className="whitespace-nowrap">Select currency</p>
									)}

									<PiCaretDown
										className={classNames(
											"text-lg text-text-secondary transition-transform",
											isOpen ? "rotate-180" : "",
											selectedItem?.name ? "ml-5" : "",
										)}
									/>
								</button>
							)}
						</Dropdown>
					</div>

					<div className="relative flex flex-row items-start gap-4">
						{/* Bank */}
						<BankDropdown
							institutions={institutions}
							isFetchingInstitutions={isFetchingInstitutions}
							selectedInstitution={selectedInstitution}
							setSelectedInstitution={setSelectedInstitution}
						/>

						{/* Account number */}
						<div className="flex-1 space-y-2">
							<p className="text-text-primary font-medium">Account number</p>

							<input
								type="number"
								placeholder="Enter account number"
								{...register("accountIdentifier", {
									required: {
										value: true,
										message: "Account number is required",
									},
									minLength: {
										value: 10,
										message: "Account number is invalid",
									},
								})}
								className={inputClasses}
							/>
						</div>
					</div>

					<AnimatedItem className="flex items-center justify-between">
						<p className="rounded-lg bg-[#e5f0fe] px-3 py-1 capitalize text-[#003d93]">
							Bruce Wayne Enterprises
						</p>
						<GreenCheckCircleIcon className="rounded-full size-4" />
					</AnimatedItem>
				</div>
			</AnimatedItem>

			<AnimatedItem className="flex justify-end space-x-3">
				<button type="button" className={secondaryButtonStyles}>
					Back
				</button>
				<button type="submit" className={`w-fit ${primaryButtonStyles}`}>
					Generate payment link
				</button>
			</AnimatedItem>
		</AnimatedContainer>
	);
};
