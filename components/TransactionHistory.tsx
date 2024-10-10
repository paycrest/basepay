"use client";
import type { PaymentOrderResponse } from "@/app/types";
import { classNames, formatCurrency, formatDate } from "@/app/utils";
import Image from "next/image";

import { FaCheckCircle, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { StatusIcon } from "./StatusIcon";
import { ExternalLinkIcon } from "./ImageAssets";
import Link from "next/link";

type Statuses = {
	[key: string]: string;
};

const statuses: Statuses = {
	initiated: "text-blue-600 bg-blue-100",
	pending: "text-yellow-600 bg-yellow-100",
	reverted: "text-pink-700 bg-pink-100",
	expired: "text-red-700 bg-red-100",
	settled: "text-green-700 bg-green-100",
	refunded: "text-orange-700 bg-orange-100",
};

export const TransactionHistory = ({
	transactions,
}: { transactions: PaymentOrderResponse[] }) => {
	return (
		<div className="space-y-4">
			<h2 className="text-base font-medium">Transactions</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full overflow-hidden text-sm border-spacing-y-2 border-separate">
					<thead>
						<tr>
							{["From", "Amount", "Status", "Timestamp", "Hash"].map(
								(header) => (
									<th
										key={header}
										className="py-3 text-left font-normal text-gray-500"
									>
										{header}
									</th>
								),
							)}
						</tr>
					</thead>
					<tbody className="text-text-gray">
						{transactions.map((transaction) => (
							<tr
								key={transaction.id}
								className="bg-background-neutral rounded-xl hover:bg-gray-100 transition"
							>
								<td className="py-4 whitespace-nowrap rounded-l-xl px-3">
									<div className="flex items-center gap-3">
										<Image
											src="/images/avatar-abstract.svg"
											alt="avatar"
											width={24}
											height={24}
										/>
										<span>
											{transaction.fromAddress.slice(0, 6)}...
											{transaction.fromAddress.slice(-4)}
										</span>
									</div>
								</td>
								<td className="py-4 whitespace-nowrap">
									<div className="flex items-center gap-3">
										<Image
											src={`/logos/${transaction.recipient.currency.toLowerCase().slice(0, 2)}.svg`}
											alt={transaction.recipient.currency}
											width={24}
											height={24}
										/>
										<span>
											{formatCurrency(
												Number(transaction.amount),
												transaction.recipient.currency,
												`en-${transaction.recipient.currency.toUpperCase().slice(0, 2)}`,
											)}
										</span>
									</div>
								</td>
								<td className="py-4 whitespace-nowrap">
									<span
										className={classNames(
											"flex items-center w-fit px-2.5 py-1 rounded-lg",
											statuses[transaction.status] ||
												"text-gray-500 bg-gray-100",
										)}
									>
										<StatusIcon
											status={transaction.status}
											className="mr-1 h-4 w-4"
										/>
										{transaction.status.charAt(0).toUpperCase() +
											transaction.status.slice(1)}
									</span>
								</td>
								<td className="py-4 whitespace-nowrap">
									{formatDate(transaction.createdAt)}
								</td>
								<td className="py-4 whitespace-nowrap text-right font-medium rounded-r-xl">
									<Link href="https://base.org">
										<ExternalLinkIcon className="text-text-secondary hover:text--text-primary transition" />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
