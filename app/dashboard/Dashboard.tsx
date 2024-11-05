"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "framer-motion";

import { classNames, shortenAddress } from "../utils";
import {
	AnimatedContainer,
	AnimatedItem,
	Footer,
	Navbar,
	Preloader,
	primaryButtonStyles,
	RateCalculator,
	TransactionHistory,
} from "@/components";
import {
	ArrowRightIcon,
	BannerIcon,
	CheckmarkCircleIcon,
	CheckmarkIcon,
	CopyIcon,
	DropdownIcon,
	GreenCheckCircleIcon,
	StickyNoteIcon,
	WifiCircleIcon,
} from "@/components/ImageAssets";
import type {
	TransactionHistoryResponse,
	TransactionsListResponse,
} from "../types";
import { fetchTransactionHistory } from "../api/aggregator";
import { useAddressContext } from "@/context/AddressContext";

const Card = ({
	title,
	content,
}: { title: string; content: string | number }) => (
	<div className="bg-gray-50 rounded-2xl border-border-light px-4 py-3 flex-1 space-y-8">
		<h3 className="text-text-secondary text-sm font-normal">{title}</h3>
		<p className="text-text-primary text-2xl font-semibold">{content}</p>
	</div>
);

export default function Dashboard() {
	const router = useRouter();
	const { ready, user } = usePrivy();
	const { isAddressLinked, basename, avatar, linkedAddress, accountDetails } =
		useAddressContext();

	const [tsxHistoryResponse, setTxHistoryResponse] =
		useState<TransactionsListResponse>();
	const [transactions, setTransactions] = useState<
		TransactionHistoryResponse[]
	>([]);
	const [isLinkedAddressCopied, setIsLinkedAddressCopied] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleCopyLinkedAddress = () => {
		navigator.clipboard.writeText(`https://www.basepay.link/${basename}`);
		setIsLinkedAddressCopied(true);
		setTimeout(() => setIsLinkedAddressCopied(false), 2000);
	};

	const cardData = [
		{
			id: 1,
			title: "Total settled",
			content: `$${transactions
				.filter((transaction) => transaction.status === "settled")
				.reduce((sum, transaction) => {
					const amount = Number.parseFloat(
						transaction.amount as unknown as string,
					);
					return sum + (Number.isNaN(amount) ? 0 : amount);
				}, 0)}`,
		},
		{
			id: 2,
			title: "Total transactions",
			content: tsxHistoryResponse?.total ?? 0,
		},
	];

	useEffect(() => {
		const privyIdToken = localStorage.getItem("privy:id_token");
		if (!privyIdToken) {
			toast.error("Privy token not found, please login again.");
			return;
		}

		const getTransactionHistory = async () => {
			if (!ready || !linkedAddress || !isAddressLinked || !privyIdToken) return;

			const response = await fetchTransactionHistory({
				linkedAddress,
				privyIdToken,
				params: {
					page: 1,
					pageSize: 50,
				},
			});
			response.transactions = response?.transactions.map(a => {
				if (a.status === "refunded") {
					a.status = "pending"
				}
				return a
			})

			setTxHistoryResponse(response);
			setTransactions(response.transactions);
		};

		getTransactionHistory();

		const intervalId = setInterval(getTransactionHistory, 10 * 1000); // Poll every 10 seconds

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [isAddressLinked, ready, linkedAddress]);

	if (!ready) return <Preloader isLoading={!ready} />;

	return (
		<>
			<Navbar />

			<RateCalculator
				defaultSelectedCurrency={accountDetails?.currency || "KES"}
			/>

			<AnimatedContainer className="flex flex-col gap-8 max-w-screen-md mx-auto px-4 pt-20 min-h-screen">
				<div className="flex-grow space-y-6">
					{user?.wallet?.walletClientType !== "privy" &&
						basename &&
						!basename?.includes(".base.eth") && (
							<AnimatedItem className="relative rounded-2xl p-3 bg-gray-50 border border-border-light space-y-4 overflow-hidden">
								<div className="absolute inset-0 w-full h-full bg-[url('/images/banner-gradient-bg.svg')] bg-center bg-no-repeat bg-cover scale-110" />
								<div className="space-y-2 relative">
									<BannerIcon className="size-6" />
									<h3 className="font-medium bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent">
										Get your basename
									</h3>
									<p className="text-text-secondary text-sm font-normal">
										Claim your unique digital identity. Simple, memorable, and
										all yours.
									</p>
								</div>
								<Link
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.base.org/names"
									className="relative inline-flex items-center justify-center pt-[1.5px] p-0.5 overflow-hidden text-sm font-medium text-text-primary rounded-[0.875rem] group bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400  outline-none focus:ring-primary-blue focus:ring active:translate-y-0.5 transition-all ease-in-out focus:ring-offset-2 focus:ring-offset-white"
								>
									<span className="px-4 py-2.5 transition-all ease-in duration-75 bg-white rounded-xl group-hover:bg-opacity-0 group-hover:text-white flex gap-2 items-center">
										Get started{" "}
										<ArrowRightIcon className="text-primary-blue group-hover:text-white" />
									</span>
								</Link>
								<div className="absolute top-2 right-4 hidden sm:block">
									<Image
										src="/images/banner-illustration.svg"
										alt="banner illustration"
										width={120}
										height={120}
									/>
								</div>
							</AnimatedItem>
						)}

					<AnimatedItem className="flex sm:justify-between sm:items-center gap-4 flex-col sm:flex-row">
						{basename ? (
							<div className="flex items-center gap-2">
								{avatar ? (
									<Image
										src={avatar}
										alt="avatar"
										width={500}
										height={500}
										className="size-8 rounded-full"
									/>
								) : (
									<div className="size-8 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full" />
								)}
								<p className="text-text-primary text-sm font-medium">
									{basename.includes(".base.eth")
										? basename
										: shortenAddress(basename, 4, 6)}
								</p>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<div className="size-8 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-pulse" />
								<div className="bg-gray-200 h-5 w-40 rounded-lg animate-pulse" />
							</div>
						)}

						<div className="flex gap-3 items-center">
							{!isAddressLinked && basename && (
								<button
									type="button"
									onClick={() => router.push("/generate")}
									className={classNames(
										primaryButtonStyles,
										"w-full sm:w-auto",
									)}
								>
									Link address
								</button>
							)}

							{isAddressLinked && basename && (
								<>
									<button
										type="button"
										title="Copy payment link and open in new tab"
										onClick={() => {
											handleCopyLinkedAddress();
											window.open(
												`https://www.basepay.link/${basename}`,
												"_blank",
											);
										}}
										className="px-4 py-3 rounded-full border border-border-light flex items-center gap-2.5 hover:bg-gray-50 transition group"
									>
										<p className="font-medium text-sm bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:via-orange-700 group-hover:to-fuchsia-600 transition">
											basepay.link/
											{basename?.includes(".base.eth")
												? basename
												: shortenAddress(basename, 5)}
										</p>
										{isLinkedAddressCopied ? (
											<CheckmarkIcon className="size-4 text-primary-blue" />
										) : (
											<CopyIcon className="size-4 text-primary-blue" />
										)}
									</button>
									<button
										type="button"
										title="Linked account details"
										className="flex items-center justify-center gap-2 rounded-full border border-border-light p-2.5"
										onClick={() => setIsDropdownOpen((prev) => !prev)}
									>
										<DropdownIcon
											className={classNames(
												"size-6 text-gray-400 transition-transform",
												isDropdownOpen ? "rotate-180" : "",
											)}
										/>
									</button>
								</>
							)}
						</div>
					</AnimatedItem>

					<AnimatePresence mode="wait">
						{isAddressLinked && isDropdownOpen && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.1 }}
							>
								<div className="bg-background-neutral rounded-2xl border border-border-neutral space-y-3 py-4 text-sm">
									<div className="px-4 flex justify-between">
										<div className="flex items-center gap-2.5 text-text-primary">
											<WifiCircleIcon className="size-5" />
											<p>Status</p>
										</div>
										<div className="flex items-center gap-2.5">
											<div className="flex gap-2 items-center rounded-full bg-green-100 px-2 py-1 text-green-700">
												<GreenCheckCircleIcon className="size-4 rounded-full" />
												<p>Active</p>
											</div>
											{/* <button
												onClick={() => router.push("/generate")}
												type="button"
												title="Edit"
												className="group"
											>
												<TbPencilMinus className="size-4 transition text-text-secondary group-hover:text-text-primary" />
											</button> */}
										</div>
									</div>

									{accountDetails && (
										<>
											<hr className="border-t border-border-light" />

											<div className="px-4 flex justify-between">
												<div className="flex items-center gap-2.5 text-text-primary">
													<StickyNoteIcon className="size-5" />
													<p>Cash account</p>
												</div>
												<div className="rounded-full bg-white px-2 py-1 text-text-secondary">
													{accountDetails?.institution} •{" "}
													{accountDetails?.accountIdentifier}
												</div>
											</div>
										</>
									)}

									<hr className="border-t border-border-light" />

									<div className="px-4 flex justify-between">
										<div className="flex items-center gap-2.5 text-text-primary">
											<CheckmarkCircleIcon className="size-5" />
											<p>Supported tokens</p>
										</div>
										<div className="flex gap-3">
											{["usdc"].map((token) => (
												<div
													key={token}
													className="bg-background-neutral rounded-full px-2 py-1 flex items-center gap-1"
												>
													<Image
														src={`/logos/${token}.svg`}
														alt={token}
														width={0}
														height={0}
														className="size-4"
													/>
													<p className="text-text-primary">
														{token.toUpperCase()}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					<AnimatedItem className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
						{cardData.map((item) => (
							<Card key={item.id} title={item.title} content={item.content} />
						))}
					</AnimatedItem>

					<AnimatedItem>
						<TransactionHistory transactions={transactions} />
					</AnimatedItem>
				</div>

				<Footer />
			</AnimatedContainer>
		</>
	);
}
