import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import { usePrivy } from "@privy-io/react-auth";

import { PaycrestLogo } from "./ImageAssets";

export const BasepayPdf = ({
	linkedAddress,
	currency,
	address,
}: {
	linkedAddress: string;
	currency: string;
	address: string;
}) => {
	return (
		<div className="relative w-[1440px] h-[1024px] border border-border-light flex justify-between items-start rounded py-20">
			<div className="relative space-y-6 max-w-lg z-10">
				<div className="pl-32 space-y-6">
					<div className="flex items-center gap-1">
						<p className="text-text-primary sm:text-lg font-semibold">
							basepay
						</p>
						<div className="pb-2 mt-5">
							<PaycrestLogo className="size-2.5" />
						</div>
					</div>

					<h1 className="text-text-primary text-5xl font-semibold leading-tight">
						Pay <span className="text-background-blue">{currency},</span>
						<br />
						with crypto
					</h1>

					<p className="text-text-secondary text-base">
						Send direct local payments with crypto by scanning the QR code on
						your crypto wallet.
					</p>
				</div>

				<div className="pt-4 pb-20 pl-32 mx-auto w-full bg-[url('/images/pdf-tag.svg')] bg-left bg-no-repeat bg-contain">
					<h2 className="text-3xl font-semibold text-white">How it works</h2>
				</div>

				<div className="pl-32 space-y-6">
					<h3 className="text-text-primary text-lg font-medium">Firstly</h3>

					<p className="text-text-secondary text-base">
						Get the current rate from{" "}
						<span className="text-text-primary">Jeremy</span>
					</p>

					<p className="text-text-secondary text-base">
						Send any of the supported tokens below to the wallet address
						assigned to the QR code or scan the QR code in a crypto wallet
					</p>

					<div className="flex gap-3 rounded-full border border-border-light p-2.5 w-fit">
						{["usdt", "usdc"].map((token) => (
							<div
								key={token}
								className="bg-background-neutral border border-border-light rounded-full px-4 pb-2 pt-0 flex gap-1"
							>
								<Image
									src={`/logos/${token}.svg`}
									alt="usdt"
									width={16}
									height={16}
									className="mt-2"
								/>
								<p className="text-text-primary">{token.toUpperCase()}</p>
							</div>
						))}
					</div>

					<h3 className="text-text-primary text-lg font-medium">What next?</h3>

					<p className="text-text-secondary text-base">In a few seconds</p>

					<div className="text-text-secondary text-base">
						<div className="flex items-start gap-2">
							<p className="text-text-primary">Jeremy</p> will receive
							<div className="">
								<div className="border border-border-light rounded-full px-2 pb-2.5 flex items-center gap-1 align-baseline bg-white">
									<Image
										src="/logos/ng.svg"
										alt="ng"
										width={12}
										height={12}
										className="mt-3.5"
									/>
									<p className="text-text-gray text-xs">NGN</p>
								</div>
							</div>
							<p>directly in their bank</p>
						</div>
						<p className="-mt-4">account</p>
					</div>
				</div>
			</div>

			<div className="relative mr-32 z-10 space-y-10">
				<div className="p-6 border border-border-light rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-200">
					<div className="p-6 text-sm space-y-5 w-full bg-white max-w-md rounded-3xl border border-border-light">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<p className="text-text-secondary">Name</p>
								<p className="text-text-primary font-medium">Jeremy</p>
							</div>

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
												className="mt-3.5"
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
											className="mt-3.5"
										/>
										<p className="text-text-primary">Base</p>
									</div>
								</div>
							</div>
						</div>

						<div className="w-full">
							<QRCode
								value={linkedAddress}
								qrStyle="dots"
								eyeRadius={20}
								eyeColor="#121217"
								fgColor="#121217"
								bgColor="#fff"
								size={400}
								quietZone={40}
								logoImage="/images/link.svg"
								style={{
									borderRadius: "24px",
									margin: "0 auto",
									width: "100%",
									maxWidth: "400px",
									objectFit: "contain",
									height: "auto",
									border: "1px solid #EBEBEF",
								}}
							/>
						</div>

						<div className="rounded-xl border border-border-light bg-background-neutral py-4 space-y-4">
							<p className="px-4 text-sm text-background-blue">
								basepay.link/{address}
							</p>
							<hr className="border-t border-border-light" />
							<p className="text-text-secondary px-4">
								Send only{" "}
								<span className="text-text-primary">Supported tokens</span> on{" "}
								<span className="text-text-primary">Base Network</span>
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<div className="text-text-secondary text-base text-center">
						Need a payment link like this? visit
					</div>
					<Image
						src="/images/basepay-dot-link.svg"
						alt="basepay.link"
						width={114}
						height={24}
						className="mt-3.5"
					/>
				</div>
			</div>

			<div className="absolute left-0 bottom-0 w-full h-[620px] bg-background-neutral z-0" />
		</div>
	);
};
