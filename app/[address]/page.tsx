"use client";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { QRCode } from "react-qrcode-logo";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";
import { notFound, usePathname } from "next/navigation";

import {
	CheckmarkIcon,
	CopyIcon,
	PaycrestLogo,
} from "@/components/ImageAssets";
import {
	AnimatedContainer,
	AnimatedItem,
	BasepayPdf,
	Navbar,
	Preloader,
	primaryButtonStyles,
	RateCalculator,
	secondaryButtonStyles,
} from "@/components";
import { classNames } from "../utils";
import type { LinkedAddressResponse } from "../types";
import { fetchLinkedAddress, fetchRate } from "../api/aggregator";
import { useAddressContext } from "@/context/AddressContext";

export default function BasepayLink() {
	const pathname = usePathname();
	const rawAddress = pathname.split("/").pop() as string;

	const { ready, user } = usePrivy();
	const { basename } = useAddressContext();

	const [rate, setRate] = useState(0);
	const [hasError, setHasError] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [isPageLoading, setIsPageLoading] = useState(true);
	const [isAddressLinked, setIsAddressLinked] = useState(false);
	const [isAddressCopied, setIsAddressCopied] = useState(false);
	const [exportFormat, setExportFormat] = useState<"pdf" | "png">("pdf");
	const [addressStatusResponse, setAddressStatusResponse] =
		useState<LinkedAddressResponse>();

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(addressStatusResponse?.linkedAddress ?? "");
		setIsAddressCopied(true);
		setTimeout(() => setIsAddressCopied(false), 2000);
	};

	const basepayPdfRef = useRef<HTMLDivElement | null>(null);

	const handleExport = async () => {
		setIsGenerating(true);

		try {
			if (basepayPdfRef.current) {
				const canvas = await html2canvas(basepayPdfRef.current, {
					scale: 2,
					useCORS: true,
					logging: false,
				});

				if (exportFormat === "png") {
					// Export as PNG
					const blob = await new Promise<Blob>((resolve) => {
						canvas.toBlob((blob) => {
							resolve(blob as Blob);
						}, "image/png");
					});

					const url = URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = url;
					link.download = "basepay_image.png";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);
				} else {
					// Export as PDF
					const imgWidth = 297; // A4 width in mm
					const imgHeight = (canvas.height * imgWidth) / canvas.width;

					const pdf = new jsPDF("l", "mm", "a4");
					pdf.addImage(
						canvas.toDataURL("image/png"),
						"PNG",
						0,
						0,
						imgWidth,
						imgHeight,
					);

					pdf.save("basepay_document.pdf");
				}
			}
		} catch (error) {
			console.error("Error generating export:", error);
			toast.error("Error generating export");
		} finally {
			setIsGenerating(false);
		}
	};

	useEffect(() => {
		const checkAddress = async () => {
			if (rawAddress) {
				setIsPageLoading(true);
				try {
					const response = await fetchLinkedAddress({
						address: rawAddress,
					});
					setIsAddressLinked(!!response.linkedAddress);
					setAddressStatusResponse(response);
				} catch (error) {
					console.error("Error fetching linked address:", error);
					setHasError(true);
				} finally {
					setIsPageLoading(false);
				}
			}
		};

		checkAddress();
	}, [rawAddress]);

	useEffect(() => {
		const getRate = async () => {
			if (!isAddressLinked) return;
			const rate = await fetchRate({
				currency: "ngn",
				amount: 1,
				token: "usdt",
			});
			setRate(rate.data);
		};

		getRate();
	}, [isAddressLinked]);

	useEffect(() => {
		if (
			((!rawAddress?.startsWith("0x") || rawAddress.length !== 42) &&
				!rawAddress?.includes(".base.eth") &&
				!isAddressLinked) ||
			hasError
		) {
			notFound();
		}
	}, [rawAddress, isAddressLinked, hasError]);

	if (!ready || isPageLoading) return <Preloader isLoading={true} />;

	return (
		<>
			<RateCalculator />
			{ready && user && <Navbar />}

			<AnimatedContainer
				className={classNames(
					"w-full min-h-screen lg:content-center",
					ready && user ? "pt-20" : "pt-10",
				)}
			>
				<div className="p-6 text-sm space-y-5 max-w-md mx-auto">
					<AnimatedItem>
						<Link
							href="/"
							title="Go to basepay"
							className="flex items-center justify-center gap-1 pb-2"
						>
							<p className="text-text-primary text-base sm:text-lg font-semibold">
								basepay
							</p>
							<PaycrestLogo className="size-2.5" />
						</Link>
					</AnimatedItem>

					<AnimatedItem className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="text-text-secondary">Supported tokens</p>
							<div className="flex gap-2">
								{["usdc"].map((token) => (
									<div key={token} className="flex gap-1 items-center">
										<Image
											src={`/logos/${token}.svg`}
											alt={token}
											width={0}
											height={0}
											className="size-4"
										/>
										<p className="text-text-primary">{token.toUpperCase()}</p>
									</div>
								))}
							</div>
						</div>

						<div className="flex items-center justify-between">
							<p className="text-text-secondary">Network</p>
							<div className="flex gap-2">
								<div className="flex gap-1 items-center">
									<Image
										src={"/logos/base.svg"}
										alt="base"
										width={16}
										height={16}
									/>
									<p className="text-text-primary">Base</p>
								</div>
							</div>
						</div>

						{rate > 0 && (
							<div className="flex items-center justify-between">
								<p className="text-text-secondary">Rate</p>
								<p className="text-text-primary">$1 ~ {rate} NGN</p>
							</div>
						)}
					</AnimatedItem>

					<AnimatedItem className="w-full">
						<QRCode
							value={addressStatusResponse?.linkedAddress}
							qrStyle="dots"
							eyeRadius={20}
							eyeColor="#121217"
							fgColor="#121217"
							bgColor="#F9FAFB"
							size={400}
							quietZone={40}
							logoImage="/images/link.svg"
							style={{
								borderRadius: "32px",
								margin: "0 auto",
								width: "100%",
								maxWidth: "400px",
								objectFit: "contain",
								height: "auto",
								border: "1px solid #EBEBEF",
							}}
						/>
					</AnimatedItem>

					<AnimatedItem className="rounded-xl border border-border-light bg-background-neutral py-4 space-y-4">
						<div className="px-4 flex justify-between items-center">
							<p className="text-xs font-semibold bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent">
								{addressStatusResponse?.linkedAddress}
							</p>
							<button type="button" onClick={handleCopyAddress}>
								{isAddressCopied ? (
									<CheckmarkIcon className="size-4 text-primary-blue" />
								) : (
									<CopyIcon className="size-4 text-primary-blue" />
								)}
							</button>
						</div>
						<hr className="border-t border-border-light" />
						<p className="text-text-secondary px-4">
							Send only{" "}
							<span className="text-text-primary">Supported tokens</span> on{" "}
							<span className="text-text-primary">Base Network</span>
						</p>
					</AnimatedItem>

					{ready &&
						user &&
						user.wallet?.address === addressStatusResponse?.resolvedAddress &&
						basename && (
							<AnimatedItem className="flex items-center justify-between space-x-4 rounded-xl bg-background-neutral p-4">
								<p className="text-text-primary">Download format</p>
								<div className="flex gap-4">
									{["pdf", "png"].map((format) => (
										<label
											key={format}
											className="inline-flex items-center gap-2 bg-white rounded-full py-1 px-2 cursor-pointer"
										>
											<input
												type="radio"
												className="form-radio accent-primary-blue cursor-pointer"
												name="exportFormat"
												value={format}
												checked={exportFormat === format}
												onChange={() =>
													setExportFormat(format as "pdf" | "png")
												}
											/>
											<span>{format.toUpperCase()}</span>
										</label>
									))}
								</div>
							</AnimatedItem>
						)}

					<AnimatedItem className="flex items-center gap-4">
						<button
							type="button"
							className={classNames(
								secondaryButtonStyles,
								ready &&
									user &&
									user.wallet?.address ===
										addressStatusResponse?.resolvedAddress &&
									basename
									? ""
									: "w-full",
							)}
							onClick={() => {
								navigator.share({
									title: "My basepay link",
									text: "Click to pay me via basepay",
									url: window.location.href,
								});
							}}
						>
							Share
						</button>

						{ready &&
							user &&
							user.wallet?.address === addressStatusResponse?.resolvedAddress &&
							basename && (
								<button
									type="button"
									title="Download"
									onClick={handleExport}
									className={classNames(primaryButtonStyles, "w-full")}
								>
									{isGenerating ? "Preparing..." : "Download"}
								</button>
							)}
					</AnimatedItem>

					{addressStatusResponse && basename && (
						<div className="absolute left-[-9999px] top-[-9999px]">
							<div ref={basepayPdfRef}>
								<BasepayPdf
									linkedAddress={addressStatusResponse?.linkedAddress}
									currency={addressStatusResponse?.currency}
									basename={basename}
								/>
							</div>
						</div>
					)}
				</div>
			</AnimatedContainer>
		</>
	);
}
