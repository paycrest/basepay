"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";

import { classNames } from "@/app/utils";
import {
	CopyIcon,
	DropdownIcon,
	LogoutIcon,
	PaycrestLogo,
	SettingsIcon,
	WalletIcon,
} from "./ImageAssets";
import { PiCheck } from "react-icons/pi";
import { dropdownVariants } from "./Animations";
import { useOutsideClick } from "@/app/hooks";

export const Navbar = () => {
	const router = useRouter();
	const [isAddressCopied, setIsAddressCopied] = useState(false);
	const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
	const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

	const { ready, authenticated, logout, user } = usePrivy();

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(user?.wallet?.address ?? "");
		setIsAddressCopied(true);
		setTimeout(() => setIsAddressCopied(false), 2000);
	};

	const walletDropdownRef = useRef<HTMLDivElement>(null);
	useOutsideClick({
		ref: walletDropdownRef,
		handler: () => setIsWalletDropdownOpen(false),
	});

	const settingsDropdownRef = useRef<HTMLDivElement>(null);
	useOutsideClick({
		ref: settingsDropdownRef,
		handler: () => setIsSettingsDropdownOpen(false),
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: skipped `login` to avoid unnecessary re-renders
	useEffect(() => {
		if (ready && !authenticated) {
			router.push("/");
		}
	}, [ready, authenticated]);

	if (!ready) return <></>;

	return (
		<header className="sticky left-0 top-0 z-20 w-full bg-white transition-all">
			<nav
				className="container mx-auto flex items-center justify-between py-4 text-text-primary"
				aria-label="Navbar"
			>
				<Link href="/" className="flex items-center gap-1 lg:flex-1">
					<p className="text-text-primary text-base sm:text-lg font-semibold">
						basepay
					</p>
					<PaycrestLogo className="size-2.5" />
				</Link>

				<div className="flex gap-4 text-sm font-normal">
					{/* Wallet Details */}
					<div ref={walletDropdownRef} className="relative">
						<button
							type="button"
							aria-label="Wallet details"
							aria-haspopup="true"
							onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
							className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
						>
							<div className="px-0.5 py-2.5">
								<Image
									src="/logos/coinbase.svg"
									alt="Coinbase logo"
									width={20}
									height={20}
								/>
							</div>
							<div className="h-10 w-px border-r border-dashed border-border-light" />
							<div className="flex items-center gap-2 py-2.5">
								<p className="hidden sm:block">293 USDC</p>
								<DropdownIcon
									className={classNames(
										"transition-transform",
										isWalletDropdownOpen ? "rotate-180" : "",
									)}
								/>
							</div>
						</button>

						{/* Wallet Dropdown menu */}
						{isWalletDropdownOpen && (
							<motion.div
								initial="closed"
								animate={isWalletDropdownOpen ? "open" : "closed"}
								exit="closed"
								variants={dropdownVariants}
								aria-label="Dropdown menu"
								className="absolute right-0 z-10 mt-4 max-h-52 min-w-64 max-w-full space-y-4 overflow-y-auto rounded-xl bg-gray-50 p-4 shadow-xl"
							>
								<p className="text-gray-500 capitalize">
									{user?.wallet?.walletClientType ?? "Privy"}
								</p>
								<div className="flex items-center gap-2">
									<Image
										src="/logos/usdt.svg"
										alt="USDC logo"
										width={14}
										height={14}
									/>
									<p className="text-text-primary">62.8974028 USDT</p>
								</div>
							</motion.div>
						)}
					</div>

					{/* Settings Dropdown */}
					<div ref={settingsDropdownRef} className="relative">
						<button
							type="button"
							aria-label="Wallet details"
							aria-haspopup="true"
							onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
							className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
						>
							<SettingsIcon />
						</button>

						{/* Dropdown menu */}
						{isSettingsDropdownOpen && (
							<motion.div
								initial="closed"
								animate={isSettingsDropdownOpen ? "open" : "closed"}
								exit="closed"
								variants={dropdownVariants}
								aria-label="Dropdown menu"
								className="absolute right-0 z-10 mt-4 w-fit space-y-4 overflow-hidden rounded-xl bg-gray-50 shadow-xl"
							>
								<ul
									aria-labelledby="settings-dropdown"
									className="text-sm text-text-primary font-normal"
								>
									<li className="flex cursor-pointer items-center justify-between gap-2 px-4 py-2 transition hover:bg-gray-200">
										<div className="flex items-center gap-2.5">
											<WalletIcon />
											<p className="max-w-60 break-words">
												{user?.wallet?.address ?? ""}
											</p>
										</div>

										<button
											type="button"
											onClick={handleCopyAddress}
											title="Copy wallet address"
										>
											{isAddressCopied ? (
												<PiCheck className="size-4" />
											) : (
												<CopyIcon className="size-4 transition hover:text-black" />
											)}
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={logout}
											className="flex items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 w-full"
										>
											<LogoutIcon />
											<p>Sign out</p>
										</button>
									</li>
								</ul>
							</motion.div>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};
