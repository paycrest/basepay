"use client";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { notFound, usePathname } from "next/navigation";

import {
	CheckmarkIcon,
	CopyIcon,
	PaycrestLogo,
} from "@/components/ImageAssets";
import { fetchRate } from "../aggregator";
import {
	AnimatedContainer,
	AnimatedItem,
	Preloader,
	secondaryButtonStyles,
} from "@/components";
import { classNames } from "../utils";

export default function BasepayLink() {
	const pathname = usePathname();
	const address = pathname.split("/").pop();

	const { user, ready } = usePrivy();
	const [rate, setRate] = useState(0);
	const [isAddressCopied, setIsAddressCopied] = useState(false);

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(user?.wallet?.address ?? "");
		setIsAddressCopied(true);
		setTimeout(() => setIsAddressCopied(false), 2000);
	};

	useEffect(() => {
		const getRate = async () => {
			const rate = await fetchRate({
				currency: "ngn",
				amount: 1,
				token: "usdt",
			});
			setRate(rate.data);
		};

		getRate();
	}, []);

	if (!address?.startsWith("0x") || address?.length !== 42) notFound();

	if (!ready) return <Preloader isLoading={true} />;

	return (
		<AnimatedContainer className="w-full min-h-screen content-center">
			<div className="p-6 text-sm space-y-5 max-w-md mx-auto">
				<AnimatedItem className="flex items-center justify-center gap-1 pb-2">
					<p className="text-text-primary text-base sm:text-lg font-semibold">
						basepay
					</p>
					<PaycrestLogo className="size-2.5" />
				</AnimatedItem>

				<AnimatedItem className="space-y-4">
					<div className="flex items-center justify-between">
						<p className="text-text-secondary">Supported tokens</p>
						<div className="flex gap-2">
							{["usdc", "usdt"].map((token) => (
								<div key={token} className="flex gap-1 items-center">
									<Image
										src={`/logos/${token}.svg`}
										alt={token}
										width={16}
										height={16}
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
						value={user?.wallet?.address ?? ""}
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
							{user?.wallet?.address}
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

				<AnimatedItem>
					<button
						type="button"
						className={classNames(secondaryButtonStyles, "w-full")}
						onClick={() => {
							navigator.share({
								title: "My basepay link",
								text: "View my basepay link",
								url: window.location.href,
							});
						}}
					>
						Share link
					</button>
				</AnimatedItem>
			</div>
		</AnimatedContainer>
	);
}
