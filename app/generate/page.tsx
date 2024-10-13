"use client";
import Link from "next/link";
import { toast } from "sonner";
import { base } from "viem/chains";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import type { SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Identity, Name } from "@coinbase/onchainkit/identity";

import {
	AnimatedContainer,
	AnimatedItem,
	GeneratePaymentLinkForm,
	PaymentLinkPreview,
	Preloader,
	previewVariants,
	secondaryButtonStyles,
} from "@/components";
import {
	ArrowRightIcon,
	BannerIcon,
	GreenCheckCircleIcon,
} from "@/components/ImageAssets";
import { classNames } from "@/app/utils";
import type { FormValues } from "@/app/types";
import { linkNewAddress } from "@/app/api/aggregator";
import { useAddressContext } from "@/context/AddressContext";

export default function GeneratePaymentLink() {
	const router = useRouter();
	const { user, ready, authenticated } = usePrivy();
	const { isAddressLinked, basename } = useAddressContext();
	const [showPreloader, setShowPreloader] = useState(false);
	const [isPreviewVisible, setIsPreviewVisible] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const togglePreview = () => {
		setIsPreviewVisible(!isPreviewVisible);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const privyIdToken = localStorage.getItem("privy:id_token");
		if (!privyIdToken) {
			toast.error("Privy token not found, please login again.");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await linkNewAddress({
				privyIdToken,
				payload: data,
			});
			if (response) {
				setShowPreloader(true);
				router.push(`/${basename}`);
			}
		} catch (error) {
			console.error("Error linking address: ", error);
			toast.error("Something went wrong, please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: skipped `router.push` to avoid unnecessary re-renders
	useEffect(() => {
		if (!ready || !authenticated || isAddressLinked) {
			if (!basename) return;
			toast.warning("Your address is already linked", {
				description: "Redirecting to dashboard...",
			});
			setShowPreloader(true);
			router.push("/");
		}
	}, [ready, authenticated, isAddressLinked, basename]);

	return (
		<div className="min-h-screen flex flex-col overflow-hidden pt-16">
			{showPreloader && <Preloader isLoading={showPreloader} />}

			<header className="fixed left-0 top-0 z-20 w-full bg-white transition-all border-b border-border-light">
				<nav
					className="container mx-auto flex items-center justify-between p-4 text-text-primary"
					aria-label="Navbar"
				>
					<button
						title="Back"
						type="button"
						className={`${secondaryButtonStyles} py-3.5`}
						onClick={() => router.back()}
					>
						<ArrowRightIcon className="rotate-180 text-text-secondary size-4" />
					</button>

					<button
						type="button"
						className={secondaryButtonStyles}
						onClick={togglePreview}
					>
						{isPreviewVisible ? "Hide Preview" : "Show Preview"}
					</button>
				</nav>
			</header>

			<AnimatedContainer className="flex flex-col flex-grow lg:flex-row">
				{!isSubmitting && (
					<AnimatedItem
						className={`flex-1 px-4 py-10 sm:px-10 ${isPreviewVisible ? "" : "mx-auto"}`}
					>
						<div className="max-w-lg mx-auto space-y-6">
							<div className="space-y-2">
								<h2 className="text-text-primary text-xl font-semibold">
									Generate linked address
								</h2>
								<p className="text-text-secondary text-sm font-normal">
									Create a linked address to receive money
								</p>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center gap-4 flex-wrap">
									{user?.wallet?.address && (
										<Identity
											address={user?.wallet?.address as `0x${string}`}
											chain={base}
											schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
											className="flex items-center"
										>
											<Avatar
												address={user?.wallet?.address as `0x${string}`}
												chain={base}
												className="w-8 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full"
												alt="avatar"
											/>
											<Name
												address={user?.wallet?.address as `0x${string}`}
												chain={base}
												className="text-text-primary font-medium text-base"
											/>
										</Identity>
									)}
									<GreenCheckCircleIcon className="rounded-full size-4" />
								</div>

								{user?.wallet?.walletClientType !== "privy" &&
									basename &&
									!basename?.includes(".base.eth") && (
										<div className="p-4 rounded-xl bg-background-neutral flex justify-between items-center">
											<div className="flex items-center gap-2.5">
												<BannerIcon className="size-6" />
												<h3 className="font-medium text-base bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent">
													Get your basename
												</h3>
											</div>
											<Link
												target="_blank"
												rel="noopener noreferrer"
												href="https://www.base.org/names"
												className="flex gap-1 items-center text-primary-blue hover:text-blue-800 transition font-medium"
											>
												Continue
												<ArrowRightIcon />
											</Link>
										</div>
									)}
							</div>

							<GeneratePaymentLinkForm onSubmit={onSubmit} />
						</div>
					</AnimatedItem>
				)}

				<AnimatePresence mode="wait">
					{(isPreviewVisible || isSubmitting) && (
						<motion.div
							className="flex-1 bg-background-neutral px-4 py-10 sm:px-10 w-full"
							variants={previewVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<div
								className={classNames(
									"max-w-lg mx-auto space-y-10",
									isSubmitting ? "pt-20" : "",
								)}
							>
								{!isSubmitting && (
									<div className="space-y-4">
										<h3 className="text-text-primary text-base font-medium">
											Preview
										</h3>
										<p className="text-text-secondary text-sm font-normal">
											What the page will look like for your customers
										</p>
									</div>
								)}

								<PaymentLinkPreview isSubmitting={isSubmitting} />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</AnimatedContainer>
		</div>
	);
}
