import Image from "next/image";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiCaretDown } from "react-icons/pi";

import { classNames } from "@/app/utils";
import { currencies } from "@/app/mocks";
import type { FormValues, InstitutionProps } from "@/app/types";
import {
	fetchAccountName,
	fetchSupportedInstitutions,
} from "@/app/api/aggregator";

import {
	inputClasses,
	primaryButtonStyles,
	secondaryButtonStyles,
} from "./Styles";
import { Dropdown } from "./Dropdown";
import { InputError } from "./InputError";
import { BankDropdown } from "./BankDropdown";
import { GreenCheckCircleIcon } from "./ImageAssets";
import { AnimatedContainer, AnimatedItem } from "./Animations";

export const GeneratePaymentLinkForm = ({
	onSubmit,
}: {
	onSubmit: SubmitHandler<FormValues>;
}) => {
	const router = useRouter();
	const formMethods = useForm<FormValues>({ mode: "onChange" });
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { isValid, isDirty, isSubmitting },
	} = formMethods;
	const { currency, accountIdentifier, institution, accountName } = watch();

	const [isFetchingInstitutions, setIsFetchingInstitutions] = useState(false);
	const [isFetchingRecipientName, setIsFetchingRecipientName] = useState(false);
	const [recipientNameError, setRecipientNameError] = useState("");
	const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);
	const [selectedInstitution, setSelectedInstitution] =
		useState<InstitutionProps | null>(null);

	// Fetch supported institutions based on currency
	useEffect(() => {
		const getInstitutions = async (currencyValue: string) => {
			if (!currencyValue) return;
			setIsFetchingInstitutions(true);

			const institutions = await fetchSupportedInstitutions(currencyValue);
			setInstitutions(institutions);

			setIsFetchingInstitutions(false);
		};

		getInstitutions(currency);
	}, [currency]);

	// Fetch recipient name based on institution and account identifier
	// biome-ignore lint/correctness/useExhaustiveDependencies: effect only runs when institution or accountIdentifier changes
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		const getRecipientName = async () => {
			if (
				!institution ||
				!accountIdentifier ||
				accountIdentifier.toString().length < 10
			)
				return;

			setIsFetchingRecipientName(true);

			try {
				const accountName = await fetchAccountName({
					institution: institution.toString(),
					accountIdentifier: accountIdentifier.toString(),
				});

				setValue("accountName", accountName);
				if (recipientNameError) setRecipientNameError("");
			} catch (error) {
				setValue("accountName", "");
				setRecipientNameError("No recipient account found");
			} finally {
				setIsFetchingRecipientName(false);
			}
		};

		const debounceFetchRecipientName = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(getRecipientName, 1000);
		};

		debounceFetchRecipientName();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [accountIdentifier, institution]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<AnimatedContainer className="space-y-6">
				<AnimatedItem className="space-y-3 bg-background-neutral rounded-2xl p-4">
					<div className="rounded-2xl border-border-light border bg-white p-4 space-y-2 text-sm font-normal">
						<p className="text-text-primary font-medium">Supported Tokens</p>
						<p className="text-text-secondary">
							Anyone can send you funds with any of these tokens and you will
							receive it directly in your bank or mobile money account
						</p>
						<div className="flex gap-3">
							{["usdc"].map((token) => (
								<div
									key={token}
									className="bg-background-neutral rounded-full px-2 py-1 flex gap-1"
								>
									<Image
										src={`/logos/${token}.svg`}
										alt={token}
										width={0}
										height={0}
										className="size-4"
									/>
									<p className="text-text-primary">{token.toUpperCase()}</p>
								</div>
							))}
						</div>
					</div>
				</AnimatedItem>

				<AnimatedItem className="space-y-3 bg-background-neutral rounded-2xl">
					<div className="space-y-1 px-4">
						<p className="text-text-primary font-medium">Account information</p>
						<p className="text-text-secondary font-normal text-sm">
							Specify account to receive funds
						</p>
					</div>

					<div className="rounded-2xl border-border-light border bg-white p-4 space-y-3 text-sm font-normal">
						<div className="space-y-2 z-50">
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
										className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left text-sm text-neutral-900 outline-none transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-progress"
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
												<p className="">{selectedItem?.label}</p>
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
								formMethods={formMethods}
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

						<AnimatedContainer>
							{isFetchingRecipientName ? (
								<AnimatedItem>
									<div className="w-56 max-w-full h-7 rounded-lg bg-gradient-to-r from-gray-300 to-white animate-pulse" />
								</AnimatedItem>
							) : (
								<>
									{accountName ? (
										<AnimatedItem className="flex items-center justify-between relative z-0">
											<p className="rounded-lg bg-[#e5f0fe] px-3 py-1 capitalize text-[#003d93]">
												{accountName.toLowerCase()}
											</p>
											<GreenCheckCircleIcon className="rounded-full size-4" />
										</AnimatedItem>
									) : recipientNameError ? (
										<InputError message={recipientNameError} />
									) : null}
								</>
							)}
						</AnimatedContainer>
					</div>
				</AnimatedItem>

				<AnimatedItem className="flex justify-end space-x-3">
					<button
						type="reset"
						disabled={
							isSubmitting || isFetchingInstitutions || isFetchingRecipientName
						}
						className={secondaryButtonStyles}
						onClick={() => router.push("/")}
					>
						Back
					</button>
					<button
						type="submit"
						disabled={
							!isValid ||
							!isDirty ||
							isSubmitting ||
							isFetchingInstitutions ||
							isFetchingRecipientName ||
							recipientNameError !== "" ||
							!accountName
						}
						className={`w-fit ${primaryButtonStyles}`}
					>
						{isSubmitting
							? "Creating linked address..."
							: "Create linked address"}
					</button>
				</AnimatedItem>
			</AnimatedContainer>
		</form>
	);
};
