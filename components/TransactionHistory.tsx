"use client";
import Link from "next/link";
import Image from "next/image";
import type { TransactionHistoryResponse } from "@/app/types";
import {
	classNames,
	formatCurrency,
	formatDate,
	getExplorerLink,
	getRelativeTimeString,
	shortenAddress,
	stripTrailingZeros,
} from "@/app/utils";

import { StatusIcon } from "./StatusIcon";
import {
	AnalyticsIllustration,
	CheckmarkIcon,
	CopyIcon,
	ExternalLinkIcon,
} from "./ImageAssets";
import { base } from "viem/chains";
import { Avatar, Identity, Name, getName } from "@coinbase/onchainkit/identity";

// import { mockTransactions } from "@/app/mocks";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import moment from "moment";
import { secondaryButtonStyles } from "./Styles";
import { useCopyToClipboard } from "@/app/hooks";

type Statuses = {
	[key: string]: string;
};

const statuses: Statuses = {
	pending: "text-yellow-600 bg-yellow-100",
	settled: "text-green-700 bg-green-100",
	refunded: "text-orange-700 bg-orange-100",
};

const TableHeader = () => (
	<thead>
		<tr>
			{["From", "Amount", "Status", "Timestamp", "Receipt"].map(
				(header, index) => (
					<th
						key={header}
						className={`py-3 text-left font-normal text-gray-500 ${index > 1 ? "hidden md:table-cell" : ""}`}
					>
						{header}
					</th>
				),
			)}
		</tr>
	</thead>
);

const MobileTransactionList = ({
	transactions,
	openOrderDetails,
}: {
	transactions: TransactionHistoryResponse[];
	openOrderDetails: (order: TransactionHistoryResponse) => void;
}) => {
	const groupedTransactions = transactions.reduce(
		(acc, transaction) => {
			const transactionDate = new Date(transaction.createdAt);
			const dateKey = getRelativeTimeString(transactionDate);

			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(transaction);
			return acc;
		},
		{} as { [key: string]: TransactionHistoryResponse[] },
	);

	// Sort the keys to ensure "Today" and "Yesterday" appear first
	const sortedKeys = Object.keys(groupedTransactions).sort((a, b) => {
		const order = ["Today", "Yesterday"];
		return order.indexOf(a) - order.indexOf(b);
	});

	return (
		<div className="space-y-6 py-4">
			{sortedKeys.map((dateKey) => (
				<div key={dateKey} className="space-y-3">
					<h3 className="text-sm text-text-secondary">{dateKey}</h3>

					<div className="space-y-3">
						{groupedTransactions[dateKey].map((transaction) => (
							<button
								type="button"
								key={transaction.id}
								className="p-4 bg-background-neutral rounded-xl w-full"
								onClick={() => openOrderDetails(transaction)}
								onKeyUp={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										openOrderDetails(transaction);
									}
								}}
							>
								<div className="flex items-center justify-between">
									<Identity
										address={transaction.fromAddress}
										chain={base}
										schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
										className="flex items-center p-0"
									>
										<Avatar
											address={transaction.fromAddress}
											chain={base}
											className="size-5 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full"
											alt="avatar"
										/>
										<Name
											address={transaction.fromAddress}
											chain={base}
											className="text-sm text-text-primary -ml-2"
										/>
									</Identity>
									<div className="flex items-center gap-1">
										<StatusIcon
											status={transaction.status}
											className={classNames(
												"mr-1 size-4",
												statuses[transaction.status]?.split(" ")[0] ||
													"text-gray-500",
											)}
										/>
										<span className="font-normal text-text-primary">
											{formatCurrency(
												Number(transaction.amount) * Number(transaction.rate),
												transaction.recipient.currency,
												`en-${transaction.recipient.currency.toUpperCase().slice(0, 2)}`,
											)}
										</span>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export const TransactionHistory = ({
	transactions,
}: { transactions: TransactionHistoryResponse[] }) => {
	// transactions = mockTransactions;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] =
		useState<TransactionHistoryResponse | null>(null);

	const openOrderDetails = (order: TransactionHistoryResponse) => {
		setSelectedOrder(order);
		openModal();
	};

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	return (
		<>
			<h2 className="text-base font-medium">Transactions</h2>

			{/* Mobile View */}
			<div className="block md:hidden">
				<MobileTransactionList
					transactions={transactions}
					openOrderDetails={openOrderDetails}
				/>
			</div>

			{/* Tablet and Desktop View */}
			<div className="overflow-x-auto hidden md:block">
				<table className="min-w-full overflow-hidden text-sm border-spacing-y-2 border-separate">
					<TableHeader />
					{transactions.length === 0 ? (
						<tbody className="text-text-gray bg-background-neutral rounded-xl transition space-y-7 text-center">
							<tr>
								<td colSpan={5} className="py-10 rounded-b-xl">
									<div className="flex flex-col items-center justify-center space-y-4">
										<AnalyticsIllustration />
										<p className="text-text-secondary max-w-sm">
											You have no transactions yet. Your transactions will
											appear here when you start receiving funds{" "}
										</p>
									</div>
								</td>
							</tr>
						</tbody>
					) : (
						<tbody>
							{transactions.map((transaction) => (
								<tr
									key={transaction.id}
									className="bg-background-neutral rounded-xl hover:bg-gray-100 transition text-text-secondary hover:cursor-pointer outline-none focus:bg-gray-100"
									onClick={() => openOrderDetails(transaction)}
									onKeyUp={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											openOrderDetails(transaction);
										}
									}}
									tabIndex={0}
								>
									<td className="py-4 whitespace-nowrap rounded-l-xl px-3">
										<Identity
											address={transaction.fromAddress}
											chain={base}
											schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
											className="flex items-center"
										>
											<Avatar
												address={transaction.fromAddress}
												chain={base}
												className="size-5 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full"
												alt="avatar"
											/>
											<Name
												address={transaction.fromAddress}
												chain={base}
												className="text-sm text-text-primary -ml-2"
											/>
										</Identity>
									</td>
									<td className="py-4 whitespace-nowrap text-sm">
										<div className="flex items-center gap-3">
											<Image
												src={`/logos/${transaction.recipient.currency.toLowerCase().slice(0, 2)}.svg`}
												alt={transaction.recipient.currency}
												width={0}
												height={0}
												className="size-4"
											/>
											<span>
												{formatCurrency(
													Number(transaction.amount) * Number(transaction.rate),
													transaction.recipient.currency,
													`en-${transaction.recipient.currency.toUpperCase().slice(0, 2)}`,
												)}
											</span>
										</div>
									</td>
									<td className="py-4 whitespace-nowrap hidden md:table-cell text-sm">
										<span
											className={classNames(
												"flex items-center w-fit px-2.5 py-1 rounded-lg",
												statuses[transaction.status] ||
													"text-gray-500 bg-gray-100",
											)}
										>
											<StatusIcon
												status={transaction.status}
												className="mr-1 size-4"
											/>
											{transaction.status.charAt(0).toUpperCase() +
												transaction.status.slice(1)}
										</span>
									</td>
									<td className="py-4 whitespace-nowrap hidden md:table-cell">
										{formatDate(transaction.createdAt)}
									</td>
									<td className="py-4 whitespace-nowrap text-right font-medium rounded-r-xl hidden md:table-cell">
										<Link
											href={
												getExplorerLink(
													transaction.network,
													transaction.txHash,
												) || ""
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											<ExternalLinkIcon className="text-text-secondary hover:text--text-primary transition" />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>

			<OrderDetailSidebar
				isModalOpen={isModalOpen}
				closeModal={closeModal}
				selectedOrder={selectedOrder}
			/>
		</>
	);
};

interface OrderDetailProps {
	isModalOpen: boolean;
	closeModal: () => void;
	selectedOrder: TransactionHistoryResponse | null;
}

function OrderDetailSidebar({
	isModalOpen,
	closeModal,
	selectedOrder,
}: OrderDetailProps) {
	const [isMobile, setIsMobile] = useState(false);
	const { copiedStates, copyToClipboard } = useCopyToClipboard();
	const [fromAddressName, setFromAddressName] = useState<string | null>(null);
	const [returnAddressName, setReturnAddressName] = useState<string | null>(
		null,
	);

	const handleCopyFromAddress = () =>
		copyToClipboard("fromAddress", selectedOrder?.fromAddress || "");

	const handleCopyReturnAddress = () =>
		copyToClipboard("returnAddress", selectedOrder?.returnAddress || "");

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (!selectedOrder) return;

		const fetchFromAddressName = async () => {
			try {
				const name = await getName({
					address: selectedOrder.fromAddress,
					chain: base,
				});
				setFromAddressName(name);
			} catch (error) {
				setFromAddressName(null);
			}
		};

		const fetchReturnAddressName = async () => {
			try {
				const name = await getName({
					address: selectedOrder.returnAddress,
					chain: base,
				});
				setReturnAddressName(name);
			} catch (error) {
				setReturnAddressName(null);
			}
		};

		fetchFromAddressName();
		fetchReturnAddressName();
	}, [selectedOrder]);

	return (
		<Dialog
			open={isModalOpen}
			onClose={closeModal}
			className={classNames(
				"fixed z-50 overflow-y-auto focus:outline-none",
				isMobile ? "px-0" : "px-4 right-0 top-0 w-full max-w-md",
			)}
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/30 backdrop-blur-sm duration-100 ease-in-out data-[closed]:opacity-0"
			/>

			<DialogPanel
				transition
				className={classNames(
					"w-full flex flex-col bg-white shadow-sm overflow-y-auto transition-all transform duration-200 ease-in-out data-[closed]:opacity-0 hide-scrollbar",
					isMobile
						? "h-[95vh] rounded-t-3xl fixed bottom-0 left-0 right-0 data-[closed]:translate-y-full"
						: "h-[97vh] mt-4 rounded-3xl data-[closed]:translate-x-full",
				)}
			>
				<DialogTitle className="font-semibold text-2xl p-6 sticky top-0 left-0 w-full bg-white z-40">
					Transaction details
				</DialogTitle>

				{selectedOrder && (
					<div
						key={selectedOrder.id}
						className="space-y-6 w-full flex flex-col justify-between grow text-sm"
					>
						<dl className="space-y-6 px-6">
							<div className="space-y-3">
								<dt className="text-text-secondary">Amount</dt>
								<dd className="text-xl text-text-primary flex items-center gap-3">
									<Image
										src={`/logos/${selectedOrder.recipient.currency.toLowerCase().slice(0, 2)}.svg`}
										alt={selectedOrder.recipient.currency}
										width={0}
										height={0}
										className="size-5"
									/>
									<span className="text-xl">
										{stripTrailingZeros(
											formatCurrency(
												Number(selectedOrder.amount) *
													Number(selectedOrder.rate),
												selectedOrder.recipient.currency,
												`en-${selectedOrder.recipient.currency.toUpperCase().slice(0, 2)}`,
											),
										)}
									</span>
								</dd>
							</div>

							<hr className="border-dashed border-gray-200 px-6" />

							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">Status</dt>
								<dd className="text-text-primary flex-1">
									<div
										className={classNames(
											statuses[selectedOrder.status]?.split(" ")[0],
											"flex items-center gap-1",
										)}
									>
										<StatusIcon
											status={selectedOrder.status}
											className={classNames(
												"mr-1 size-4",
												statuses[selectedOrder.status]?.split(" ")[0] ||
													"text-gray-500",
											)}
										/>
										<p className="capitalize">{selectedOrder.status}</p>
									</div>
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">Date</dt>
								<dd className="text-text-primary flex-1">
									{moment(selectedOrder.createdAt).format("MMMM D, YYYY")} at{" "}
									{moment(selectedOrder.createdAt)
										.format("h:mm A")
										.toLowerCase()}
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">
									Order ID
								</dt>
								<dd className="text-text-primary flex-1 break-words break-all">
									{selectedOrder.id}
								</dd>
							</div>

							<hr className="border-dashed border-gray-200" />

							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">Network</dt>
								<dd className="text-text-primary flex-1 capitalize">
									{selectedOrder.network}
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">From</dt>
								<dd className="flex items-start gap-x-2 text-primary-black break-words break-all flex-1">
									<button
										type="button"
										onClick={handleCopyFromAddress}
										className="relative group flex items-center gap-2"
									>
										<span className="group-hover:text-blue-600 transition-colors cursor-pointer text-left">
											{fromAddressName ||
												shortenAddress(selectedOrder.fromAddress)}
										</span>
										{copiedStates.fromAddress ? (
											<CheckmarkIcon className="size-4 text-primary-blue flex-shrink-0" />
										) : (
											<CopyIcon className="size-4 text-text-primary group-hover:text-primary-blue transition-colors flex-shrink-0" />
										)}
									</button>
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">
									Linked address
								</dt>
								<dd className="flex items-start gap-x-2 text-primary-black break-words break-all flex-1">
									<button
										type="button"
										onClick={handleCopyReturnAddress}
										className="relative group flex items-center gap-2"
									>
										<span className="group-hover:text-blue-600 transition-colors cursor-pointer text-left">
											{returnAddressName ||
												shortenAddress(selectedOrder.returnAddress, 8)}
										</span>
										{copiedStates.returnAddress ? (
											<CheckmarkIcon className="size-4 text-primary-blue flex-shrink-0" />
										) : (
											<CopyIcon className="size-4 text-text-primary group-hover:text-primary-blue transition-colors flex-shrink-0" />
										)}
									</button>
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">
									<p>Rate</p>
								</dt>
								<dd className="text-text-primary flex-1">
									{stripTrailingZeros(
										formatCurrency(
											Number(selectedOrder.rate),
											selectedOrder.recipient.currency,
											`en-${selectedOrder.recipient.currency?.slice(0, 2)}`,
										),
									)}
									/{selectedOrder.token}
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">
									Crypto amount
								</dt>
								<dd className="text-text-primary flex-1">
									{selectedOrder.amount} {selectedOrder.token}
								</dd>
							</div>
							<hr className="border-dashed border-gray-200" />
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40">
									Account name
								</dt>
								<dd className="text-text-primary capitalize break-words flex-1">
									{selectedOrder.recipient.accountName.toLowerCase()}
								</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-text-secondary flex-1 max-w-40 leading-loose">
									Account
								</dt>
								<dd className="text-text-primary break-words flex-1 flex-wrap flex items-center">
									{selectedOrder.recipient.accountIdentifier}
									<span className="text-gray-300 px-1 text-xl">•</span>
									{selectedOrder.recipient.institution}
								</dd>
							</div>

							<hr className="border-dashed border-gray-200" />
						</dl>

						<div className="p-5 bg-gray-50 flex gap-4 items-center justify-between sticky bottom-0 left-0 w-full border-t border-gray-200 rounded-t-md">
							<button
								type="button"
								onClick={closeModal}
								className="text-text-primary transition-all px-3 py-2.5 rounded-xl hover:bg-white outline-none focus:bg-white hover:scale-105 active:scale-95 hover:ring-1 ring-gray-100 hover:shadow"
							>
								Back
							</button>
							{selectedOrder.fromAddress && (
								<Link
									href={
										getExplorerLink(
											selectedOrder.network,
											selectedOrder.txHash,
										) || ""
									}
									target="_blank"
									rel="noopener noreferrer"
									className={classNames(secondaryButtonStyles)}
								>
									View on explorer
								</Link>
							)}
						</div>
					</div>
				)}
			</DialogPanel>
		</Dialog>
	);
}
