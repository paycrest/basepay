"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import type { SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

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
import { toast } from "react-toastify";
import type { FormValues } from "@/app/types";
import { linkNewAddress } from "@/app/aggregator";
import { classNames, shortenAddress } from "@/app/utils";
import { useAddressContext } from "@/context/AddressContext";

export default function GeneratePaymentLink() {
	const router = useRouter();
	const { user, ready, authenticated } = usePrivy();
	const { isAddressLinked } = useAddressContext();
	const [showPreloader, setShowPreloader] = useState(false);
	const [isPreviewVisible, setIsPreviewVisible] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const togglePreview = () => {
		setIsPreviewVisible(!isPreviewVisible);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsSubmitting(true);
		try {
			const response = await linkNewAddress({
				privyId: user?.id ?? "",
				payload: data,
			});
			if (response) {
				setShowPreloader(true);
				router.push(`/${user?.wallet?.address}`);
			}
		} catch (error) {
			console.error("Error linking address: ", error);
			toast.error("Something went wrong, please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: skipped `login` to avoid unnecessary re-renders
	useEffect(() => {
		if (ready && !authenticated) {
			setShowPreloader(true);
			router.push("/");
		}
	}, [ready, authenticated]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: this is a false positive
	useEffect(() => {
		if (isAddressLinked) {
			setShowPreloader(true);
			router.push("/dashboard");
		}
	}, [isAddressLinked]);

	return (
		<div className="min-h-screen flex flex-col overflow-hidden pt-16">
			{showPreloader && <Preloader isLoading={showPreloader} />}

			<header className="fixed left-0 top-0 z-20 w-full bg-white transition-all border-b border-border-light">
				<nav
					className="container mx-auto flex items-center justify-between py-4 text-text-primary"
					aria-label="Navbar"
				>
					<div className="flex gap-4 items-center">
						<button
							title="Back"
							type="button"
							className={`${secondaryButtonStyles} py-3.5`}
							onClick={() => router.back()}
						>
							<ArrowRightIcon className="rotate-180 text-text-secondary size-4" />
						</button>
						<h1 className="text-base text-text-primary font-medium">
							Payment link
						</h1>
					</div>

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
						className={`flex-1 p-10 ${isPreviewVisible ? "" : "mx-auto"}`}
					>
						<div className="max-w-lg mx-auto space-y-6">
							<div className="space-y-2">
								<h2 className="text-text-primary text-xl font-semibold">
									Generate payment link
								</h2>
								<p className="text-text-secondary text-sm font-normal">
									Create a direct payment link/page for your customers
								</p>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center gap-4 flex-wrap">
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
									<GreenCheckCircleIcon className="rounded-full size-4" />
								</div>

								{user?.wallet?.walletClientType !== "privy" && (
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
							className="flex-1 bg-background-neutral p-10 w-full"
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
