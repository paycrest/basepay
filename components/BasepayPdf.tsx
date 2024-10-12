import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

import { PaycrestLogo } from "./ImageAssets";
import { useAddressContext } from "@/context/AddressContext";

export const BasepayPdf = ({
	linkedAddress,
	currency,
	basename,
}: {
	linkedAddress: string;
	currency: string;
	basename: string;
}) => {
	return (
		<div className="relative w-[1440px] h-[1024px] border border-border-light flex justify-between items-center rounded py-20">
			<div className="relative space-y-6 max-w-lg z-10">
				<div className="pl-32 space-y-6">
					<div>
						<div className="flex items-center gap-1">
							<p className="text-text-primary sm:text-lg font-semibold">
								basepay
							</p>
							<div className="pb-2 mt-7">
								<PaycrestLogo className="size-2.5" />
							</div>
						</div>

						<h1 className="text-text-primary text-5xl font-semibold leading-tight">
							Pay <span className="text-background-blue">{currency}</span>
							<br />
							with your wallet
						</h1>
					</div>

					<p className="text-text-secondary text-base">
						Send direct local payments by scanning the QR code on your wallet.
					</p>
				</div>
			</div>

			<div className="relative mr-32 z-10 space-y-10">
				<div className="p-6 border border-border-light rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-200">
					<div className="p-6 text-sm space-y-5 w-full bg-white max-w-md rounded-3xl border border-border-light">
						<div className="space-y-4">
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
												className="mt-3.5 size-4"
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
							<p className="px-4 text-xs text-background-blue">
								basepay.link/{basename}
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

				<div className="flex items-center gap-2 w-fit mx-auto">
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
		</div>
	);
};
