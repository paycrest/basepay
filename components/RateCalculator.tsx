"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { BsArrowDown } from "react-icons/bs";
import { currencies, tokens } from "@/app/mocks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { fetchRate } from "@/app/aggregator";
import { FormDropdown } from "./FormDropdown";
import { CalculatorIcon, PaycrestLogo, XIcon } from "./ImageAssets";

type FormValues = {
	amountSent: number;
	amountReceived: number;
	token: string;
	currency: string;
};

export const RateCalculator = () => {
	const [rate, setRate] = useState(0);
	const [isFetchingRate, setIsFetchingRate] = useState(false);
	const [isReceiveInputActive, setIsReceiveInputActive] = useState(false);

	const { watch, setValue, register } = useForm<FormValues>();
	const { amountSent, amountReceived, token, currency } = watch();

	// Fetch rate based on currency, amount, and token
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const getRate = async () => {
			setIsFetchingRate(true);
			const rate = await fetchRate({
				token: "usdt", // only USDT is supported
				amount: amountSent || 1,
				currency: currency || "KES",
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
	}, [amountSent, currency]);

	// Calculate receive amount based on send amount and rate
	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
	useEffect(() => {
		if (rate && (amountSent || amountReceived)) {
			if (isReceiveInputActive) {
				setValue(
					"amountSent",
					Number((Number(amountReceived) / rate).toFixed(4)),
				);
			} else {
				setValue("amountReceived", Number((rate * amountSent).toFixed(4)));
			}
		}
	}, [amountSent, amountReceived, rate]);

	return (
		<Menu
			as="div"
			className="fixed bottom-5 sm:bottom-10 right-5 sm:right-20 z-50"
		>
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
				<div className="space-y-2">
					<div className="flex items-center gap-1">
						<p className="text-text-primary sm:text-lg font-semibold">
							basepay
						</p>
						<PaycrestLogo className="size-2.5" />
					</div>
					<p className="text-text-secondary text-sm">Exchange Calculator</p>
				</div>
				<form>
					<div className="space-y-2 rounded-2xl bg-gray-50 p-2">
						<h3 className="px-2 font-medium">Swap</h3>

						{/* Amount to send & Token */}
						<div className="relative space-y-3.5 rounded-2xl bg-white px-4 py-3">
							<label htmlFor="amount-sent" className="text-gray-500">
								Send
							</label>

							<div className="flex items-center justify-between gap-2">
								<input
									id="amount-sent"
									type="number"
									step="0.0001"
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
											value: /^\d+(\.\d{1,4})?$/,
											message: "Max. of 4 decimal places + no leading dot",
										},
										onChange: () => setIsReceiveInputActive(false),
									})}
									className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
									placeholder="0"
									title="Enter amount to send"
								/>

								<FormDropdown
									defaultTitle="Select token"
									data={tokens}
									defaultSelectedItem="USDT"
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
									type="number"
									step="0.0001"
									{...register("amountReceived", {
										onChange: () => setIsReceiveInputActive(true),
									})}
									className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
									placeholder="0"
									title="Enter amount to receive"
								/>

								<FormDropdown
									defaultTitle="Select currency"
									data={currencies}
									defaultSelectedItem="KES"
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
					1 {token ?? "USDT"} ~ {isFetchingRate ? "..." : rate}{" "}
					{currency ?? "KES"}
				</p>
			</MenuItems>
		</Menu>
	);
};
