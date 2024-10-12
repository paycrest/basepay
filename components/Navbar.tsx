"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout, usePrivy } from "@privy-io/react-auth";

import {
	CheckmarkIcon,
	CopyIcon,
	LogoutIcon,
	PaycrestLogo,
	SettingsIcon,
	WalletIcon,
} from "./ImageAssets";
import { Preloader } from "./Preloader";
import { useOutsideClick } from "@/app/hooks";
import { dropdownVariants } from "./Animations";
import { classNames, shortenAddress } from "@/app/utils";

export const Navbar = () => {
	const router = useRouter();
	const [isAddressCopied, setIsAddressCopied] = useState(false);
	const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const { user, logout } = usePrivy();

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(user?.wallet?.address ?? "");
		setIsAddressCopied(true);
		setTimeout(() => setIsAddressCopied(false), 2000);
	};

	const handleLogout = async () => {
		setIsSettingsDropdownOpen(false);
		setIsLoggingOut(true);
		await logout();
	};

	const settingsDropdownRef = useRef<HTMLDivElement>(null);
	useOutsideClick({
		ref: settingsDropdownRef,
		handler: () => setIsSettingsDropdownOpen(false),
	});

	if (isLoggingOut) return <Preloader isLoading={isLoggingOut} />;

	return (
		<header className="fixed left-0 top-0 z-20 w-full bg-white transition-all">
			<nav
				className="container mx-auto max-w-screen-md flex items-center justify-between p-4 text-text-primary"
				aria-label="Navbar"
			>
				<Link href="/" className="flex items-center gap-1 lg:flex-1">
					<p className="text-text-primary text-base sm:text-lg font-semibold">
						basepay
					</p>
					<PaycrestLogo className="size-2.5" />
				</Link>

				<div className="flex gap-4 text-sm font-normal">
					{/* Settings Dropdown */}
					<div ref={settingsDropdownRef} className="relative">
						<button
							type="button"
							aria-label="Wallet details"
							aria-haspopup="true"
							onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
							className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
						>
							<SettingsIcon
								className={classNames(
									"transition-transform duration-300 ease-in-out",
									isSettingsDropdownOpen ? "rotate-180" : "",
								)}
							/>
						</button>

						{/* Dropdown menu */}
						{isSettingsDropdownOpen && (
							<motion.div
								initial="closed"
								animate={isSettingsDropdownOpen ? "open" : "closed"}
								exit="closed"
								variants={dropdownVariants}
								aria-label="Dropdown menu"
								className="absolute right-0 z-10 mt-4 w-48 space-y-4 overflow-hidden rounded-xl bg-gray-50 shadow-xl"
							>
								<ul
									aria-labelledby="settings-dropdown"
									className="text-sm text-text-primary font-normal"
								>
									<li>
										<button
											type="button"
											onClick={handleCopyAddress}
											className="flex cursor-pointer items-center justify-between gap-2 px-4 py-2 transition hover:bg-gray-200 w-full group"
										>
											<div className="flex items-center gap-2.5">
												<WalletIcon className="text-text-secondary" />
												<p className="max-w-40 break-words">
													{shortenAddress(user?.wallet?.address ?? "")}
												</p>
											</div>

											<div>
												{isAddressCopied ? (
													<CheckmarkIcon className="size-4 text-primary-blue" />
												) : (
													<CopyIcon className="size-4 transition text-text-secondary group-hover:text-primary-blue" />
												)}
											</div>
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={handleLogout}
											className="flex items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 w-full"
										>
											<LogoutIcon className="text-text-secondary" />
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
