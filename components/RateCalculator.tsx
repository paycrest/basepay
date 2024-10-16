"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { BsArrowDown } from "react-icons/bs";
import { currencies, tokens } from "@/app/mocks";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

import { fetchRate } from "@/app/api/aggregator";
import { FormDropdown } from "./FormDropdown";
import { CalculatorIcon, XIcon } from "./ImageAssets";
import { formatCurrency } from "@/app/utils";

type FormValues = {
	amountSent: string;
	amountReceived: string;
	token: string;
	currency: string;
};

export const RateCalculator = ({
	defaultSelectedCurrency = "KES",
}: {
	defaultSelectedCurrency?: string;
}) => {
	const [rate, setRate] = useState(0);
	const [isFetchingRate, setIsFetchingRate] = useState(false);
	const [isReceiveInputActive, setIsReceiveInputActive] = useState(false);

	const { watch, setValue, register } = useForm<FormValues>();
	const { amountSent, amountReceived, token, currency } = watch();

	const formatNumberWithCommas = (value: string) => {
		const parts = value.split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		if (parts[1]) {
			parts[1] = parts[1].replace(/0+$/, "");
			if (parts[1] === "") {
				parts.pop();
			}
		}
		return parts.join(".");
	};

	const parseFormattedNumber = (value: string) => {
		return Number.parseFloat(value?.replace(/,/g, "")) || 0;
	};

	// Fetch rate based on currency, amount, and token
	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const getRate = async () => {
			setIsFetchingRate(true);
			const rate = await fetchRate({
				token: "usdt", // only USDT is supported
				amount: parseFormattedNumber(amountSent) || 1,
				currency: currency || defaultSelectedCurrency,
			});
			setRate(rate.data);
			setIsFetchingRate(false);
		};

		const debounceFetchRate = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(getRate, 1000);
		};

		debounceFetchRate();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [amountSent, currency, defaultSelectedCurrency]);

	// Calculate receive amount based on send amount and rate
	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
	useEffect(() => {
		if (rate && (amountSent || amountReceived)) {
			if (isReceiveInputActive) {
				const sentAmount = (
					parseFormattedNumber(amountReceived) / rate
				).toFixed(4);
				setValue("amountSent", formatNumberWithCommas(sentAmount));
			} else {
				const receivedAmount = (
					rate * parseFormattedNumber(amountSent)
				).toFixed(4);
				setValue("amountReceived", formatNumberWithCommas(receivedAmount));
			}
		}
	}, [amountSent, amountReceived, rate, isReceiveInputActive, setValue]);

	if (!rate) return null;

	return (
		<Menu as="div" className="fixed bottom-16 right-5 sm:right-16 z-40">
			<MenuButton className="p-4 rounded-full bg-black transition hover:bg-gray-700 active:bg-black text-white">
				{({ open }) =>
					open ? (
						<XIcon className="size-6 p-1" />
					) : (
						<CalculatorIcon className="size-6" />
					)
				}
			</MenuButton>

			<MenuItems
				anchor="top end"
				transition
				className="origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 bg-white shadow-2xl rounded-3xl p-5 space-y-4 w-96 max-w-full -mt-4"
			>
				<p className="text-text-primary text-base font-semibold">
					Rate Calculator
				</p>

				<form>
					<div className="space-y-2 rounded-2xl bg-gray-50 p-2">
						{/* Amount to send & Token */}
						<div className="relative space-y-3.5 rounded-2xl bg-white px-4 py-3">
							<label htmlFor="amount-sent" className="text-gray-500">
								Send
							</label>

							<div className="flex items-center justify-between gap-2">
								<input
									id="amount-sent"
									type="text"
									{...register("amountSent", {
										required: { value: true, message: "Amount is required" },
										min: {
											value: 0.5,
											message: "Min. amount is 0.5",
										},
										max: {
											value: 500,
											message: "Max. amount is 500",
										},
										pattern: {
											value: /^(\d{1,3}(,\d{3})*(\.\d{0,4})?|\d+(\.\d{0,4})?)$/,
											message: "Invalid number format",
										},
										onChange: (e) => {
											setIsReceiveInputActive(false);
											setValue(
												"amountSent",
												formatNumberWithCommas(
													e.target.value.replace(/,/g, ""),
												),
											);
										},
									})}
									className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
									placeholder="0"
									title="Enter amount to send"
								/>

								<FormDropdown
									defaultTitle="Select token"
									data={tokens}
									defaultSelectedItem="USDC"
									onSelect={(selectedToken) => setValue("token", selectedToken)}
								/>
							</div>

							{/* Arrow showing swap direction */}
							<div className="absolute -bottom-5 left-1/2 z-10 w-fit -translate-x-1/2 rounded-xl border-4 border-gray-50 bg-gray-50">
								<div className="rounded-lg bg-white p-1">
									{isFetchingRate ? (
										<ImSpinner3 className="animate-spin text-xl text-gray-500" />
									) : (
										<BsArrowDown className="text-xl text-gray-500" />
									)}
								</div>
							</div>
						</div>

						{/* Amount to receive & currency */}
						<div className="space-y-3.5 rounded-2xl bg-white px-4 py-3">
							<label htmlFor="amount-received" className="text-gray-500">
								Receive
							</label>

							<div className="flex items-center justify-between gap-2">
								<input
									id="amount-received"
									type="text"
									{...register("amountReceived", {
										pattern: {
											value: /^(\d{1,3}(,\d{3})*(\.\d{0,4})?|\d+(\.\d{0,4})?)$/,
											message: "Invalid number format",
										},
										onChange: (e) => {
											setIsReceiveInputActive(true);
											setValue(
												"amountReceived",
												formatNumberWithCommas(
													e.target.value.replace(/,/g, ""),
												),
											);
										},
									})}
									className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
									placeholder="0"
									title="Enter amount to receive"
								/>

								<FormDropdown
									defaultTitle="Select currency"
									data={currencies}
									defaultSelectedItem={defaultSelectedCurrency}
									onSelect={(selectedCurrency) =>
										setValue("currency", selectedCurrency)
									}
									className="min-w-64 text-sm"
								/>
							</div>
						</div>
					</div>
				</form>
				<p className="text-sm text-text-secondary">
					1 {token ?? "USDC"} ~{" "}
					{isFetchingRate
						? "..."
						: formatCurrency(
								Number(rate),
								currency ?? defaultSelectedCurrency,
								`en-${(currency ?? defaultSelectedCurrency).toUpperCase().slice(0, 2)}`,
							)}
				</p>
			</MenuItems>
		</Menu>
	);
};
