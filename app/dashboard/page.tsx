"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "framer-motion";

import { classNames, shortenAddress } from "../utils";
import {
	AnimatedContainer,
	AnimatedItem,
	Navbar,
	Preloader,
	primaryButtonStyles,
} from "@/components";
import {
	ArrowRightIcon,
	BannerIcon,
	CheckmarkCircleIcon,
	CopyIcon,
	DropdownIcon,
	GreenCheckCircleIcon,
	StickyNoteIcon,
	TagsIcon,
	WalletIcon,
	WifiCircleIcon,
} from "@/components/ImageAssets";
import { useState } from "react";
import { PiCheck } from "react-icons/pi";
import { TbPencilMinus } from "react-icons/tb";

const data = [
	{
		id: 1,
		title: "Total settled",
		content: "N0.00",
	},
	{
		id: 2,
		title: "Total transactions",
		content: "0",
	},
];

const Card = ({ title, content }: { title: string; content: string }) => (
	<div className="bg-gray-50 rounded-2xl border-border-light px-4 py-3 flex-1 space-y-8">
		<h3 className="text-text-secondary text-sm font-normal">{title}</h3>
		<p className="text-text-primary text-2xl font-semibold">{content}</p>
	</div>
);

export default function Dashboard() {
	const router = useRouter();
	const { ready, user } = usePrivy();
	const [isAddressCopied, setIsAddressCopied] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(user?.wallet?.address ?? "");
		setIsAddressCopied(true);
		setTimeout(() => setIsAddressCopied(false), 2000);
	};

	if (!ready) return <Preloader isLoading={!ready} />;

	return (
		<div className="bg-white space-y-10 max-w-screen-md mx-auto px-4">
			<Navbar />

			<AnimatedContainer className="space-y-4">
				{user?.wallet?.walletClientType !== "privy" && (
					<AnimatedItem className="relative rounded-2xl p-3 bg-gray-50 border border-border-light space-y-4 overflow-hidden">
						<div className="absolute inset-0 w-full h-full bg-[url('/images/banner-gradient-bg.svg')] bg-center bg-no-repeat bg-cover scale-110" />

						<div className="space-y-2 relative">
							<BannerIcon className="size-6" />
							<h3 className="font-medium bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent">
								Get your basename
							</h3>
							<p className="text-text-secondary text-sm font-normal">
								Claim your unique digital identity. Simple, memorable, and all
								yours.
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

				<AnimatedItem className="flex justify-between items-center gap-4 flex-wrap">
					<div className="flex gap-2 items-center">
						<Image
							src="/images/avatar.svg"
							alt="avatar"
							width={24}
							height={24}
						/>

						<p className="text-text-primary font-medium text-base">
							{shortenAddress(user?.wallet?.address ?? "", 8)}
						</p>
					</div>

					<div className="flex gap-3 items-center">
						<button
							type="button"
							onClick={() => router.push("/dashboard/generate")}
							className={primaryButtonStyles}
						>
							Generate link
						</button>

						<button
							type="button"
							title="Copy wallet address"
							onClick={handleCopyAddress}
							className="px-4 py-3 rounded-full border border-border-light flex items-center gap-2.5 hover:bg-gray-50 transition group"
						>
							<p className="font-medium text-sm bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:via-orange-700 group-hover:to-fuchsia-600 transition">
								jeremy0x.base.eth
							</p>

							{isAddressCopied ? (
								<PiCheck className="size-4 text-primary-blue" />
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
									"size-7 text-gray-400 transition-transform",
									isDropdownOpen ? "rotate-180" : "",
								)}
							/>
						</button>
					</div>
				</AnimatedItem>

				<AnimatePresence mode="wait">
					{isDropdownOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.1 }}
						>
							<div className="bg-background-neutral rounded-2xl border border-border-neutral space-y-3 py-4 text-sm">
								<div className="px-4 flex justify-between">
									<div className="flex items-center gap-2.5 text-text-primary">
										<WalletIcon className="size-5" />
										<p>Wallet address</p>
									</div>
									<div className="rounded-full bg-white px-2 py-1 text-text-secondary">
										{shortenAddress(user?.wallet?.address ?? "", 5)}
									</div>
								</div>

								<hr className="border-t border-border-light" />

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
										<button
											onClick={() => router.push("/dashboard/generate")}
											type="button"
											title="Edit"
											className="group"
										>
											<TbPencilMinus className="size-4 transition text-text-secondary group-hover:text-text-primary" />
										</button>
									</div>
								</div>

								<hr className="border-t border-border-light" />

								<div className="px-4 flex justify-between">
									<div className="flex items-center gap-2.5 text-text-primary">
										<TagsIcon className="size-5" />
										<p>Transactions</p>
									</div>
									<div className="rounded-full bg-white px-2 py-1 text-text-secondary">
										2,394
									</div>
								</div>

								<hr className="border-t border-border-light" />

								<div className="px-4 flex justify-between">
									<div className="flex items-center gap-2.5 text-text-primary">
										<StickyNoteIcon className="size-5" />
										<p>Bank account</p>
									</div>
									<div className="rounded-full bg-white px-2 py-1 text-text-secondary">
										PalmPay • 7042158996
									</div>
								</div>

								<hr className="border-t border-border-light" />

								<div className="px-4 flex justify-between">
									<div className="flex items-center gap-2.5 text-text-primary">
										<CheckmarkCircleIcon className="size-5" />
										<p>Supported</p>
									</div>
									<div className="flex gap-3">
										{["usdc", "usdt"].map((token) => (
											<div
												key={token}
												className="bg-background-neutral rounded-full px-2 py-1 flex gap-1"
											>
												<Image
													src={`/logos/${token}.svg`}
													alt="usdt"
													width={16}
													height={16}
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

				<AnimatedItem className="flex items-center justify-center gap-4">
					{data.map((item) => (
						<Card key={item.id} title={item.title} content={item.content} />
					))}
				</AnimatedItem>
			</AnimatedContainer>
		</div>
	);
}
