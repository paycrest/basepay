"use client";
import Link from "next/link";
import Image from "next/image";
import type { TransactionHistoryResponse } from "@/app/types";
import {
	classNames,
	formatCurrency,
	formatDate,
	getRelativeTimeString,
} from "@/app/utils";

import { StatusIcon } from "./StatusIcon";
import { AnalyticsIllustration, ExternalLinkIcon } from "./ImageAssets";
import { base } from "viem/chains";
import { Avatar, Identity, Name } from "@coinbase/onchainkit/identity";

import { mockTransactions } from "@/app/mocks";

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
}: { transactions: TransactionHistoryResponse[] }) => {
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
							<div
								key={transaction.id}
								className="p-4 bg-background-neutral rounded-xl"
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
							</div>
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
	transactions = mockTransactions;

	return (
		<>
			<h2 className="text-base font-medium">Transactions</h2>

			{/* Mobile View */}
			<div className="block md:hidden">
				<MobileTransactionList transactions={transactions} />
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
									className="bg-background-neutral rounded-xl hover:bg-gray-100 transition text-text-secondary"
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
											href={`https://basescan.org/tx/${transaction.txHash}`}
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
		</>
	);
};
