"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
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
import { shortenAddress } from "@/app/utils";

export default function GeneratePaymentLink() {
	const router = useRouter();
	const { user, ready, authenticated } = usePrivy();
	const [showPreloader, setShowPreloader] = useState(false);
	const [isPreviewVisible, setIsPreviewVisible] = useState(true);

	const togglePreview = () => {
		setIsPreviewVisible(!isPreviewVisible);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: skipped `login` to avoid unnecessary re-renders
	useEffect(() => {
		if (ready && !authenticated) {
			setShowPreloader(true);
			router.push("/");
		}
	}, [ready, authenticated]);

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
						</div>

						<GeneratePaymentLinkForm />
					</div>
				</AnimatedItem>

				<AnimatePresence mode="wait">
					{isPreviewVisible && (
						<motion.div
							className="flex-1 bg-background-neutral p-10"
							variants={previewVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<div className="max-w-lg mx-auto space-y-14">
								<div className="space-y-4">
									<h3 className="text-text-primary text-base font-medium">
										Preview
									</h3>
									<p className="text-text-secondary text-sm font-normal">
										What the page will look like for your customers
									</p>
								</div>

								<PaymentLinkPreview />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</AnimatedContainer>
		</div>
	);
}
