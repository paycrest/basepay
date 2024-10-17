import Link from "next/link";
import { PaycrestLogo } from "./ImageAssets";
import { classNames, shortenAddress } from "@/app/utils";
import { primaryButtonStyles, secondaryButtonStyles } from "./Styles";
import { useRouter } from "next/navigation";

export const Custom404 = ({
	address,
	isAddressInvalid,
}: { address: string; isAddressInvalid?: boolean }) => {
	const router = useRouter();
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row gap-20 items-center justify-center min-h-screen content-center p-4 sm:p-8">
				<div className="space-y-6 text-center lg:text-left">
					<div className="flex items-center gap-1 justify-center lg:justify-normal">
						<p className="text-text-primary text-lg font-semibold">basepay</p>
						<PaycrestLogo className="size-2.5" />
					</div>

					<h1 className="text-9xl font-semibold text-text-primary">404</h1>

					{isAddressInvalid ? (
						<p className="text-text-secondary text-lg max-w-sm">
							This doesn't look like a valid address:{" "}
							<span className="rounded-full px-2 pb-1 align-middle bg-gray-50">
								<span className="bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent text-sm font-medium break-words break-all">
									{address}
								</span>
							</span>
						</p>
					) : (
						<p className="text-text-secondary text-lg max-w-sm">
							There is no payment link associated with this wallet address:{" "}
							<span className="rounded-full px-2 pb-1 align-middle bg-gray-50">
								<span className="bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent text-sm font-medium break-words break-all">
									{address}
								</span>
							</span>
						</p>
					)}

					<div className="flex flex-wrap gap-2 justify-center lg:justify-normal">
						<button
							type="button"
							onClick={() => router.push("/")}
							className={classNames(
								isAddressInvalid ? primaryButtonStyles : secondaryButtonStyles,
							)}
						>
							Get a linked address
						</button>
						{isAddressInvalid && (
							<button
								type="button"
								onClick={() => router.push("/")}
								className={classNames(secondaryButtonStyles)}
							>
								Go back home
							</button>
						)}
					</div>
				</div>

				{!isAddressInvalid && (
					<div className="sm:p-8 sm:border border-border-light sm:rounded-[32px] sm:bg-gradient-to-br from-white via-white to-border-light">
						<div className="p-6 text-sm space-y-5 w-full bg-white max-w-lg rounded-3xl border border-border-light">
							<div className="border-border-light border rounded-3xl bg-gray-50">
								<div className="px-6 py-4 border-b border-border-light">
									<p className="bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent text-sm font-medium">
										basepay.link/
										{address.includes(".eth")
											? address
											: shortenAddress(address, 4, 6)}
									</p>
								</div>

								<div className="px-4 py-3">
									<p className="text-text-secondary text-sm sm:text-lg">
										Basepay lets you receive direct fiat payments with crypto
										through a simple interface. Just like a bank transfer
										powered by digital assets - no P2P required.
									</p>
								</div>
							</div>

							<button
								type="button"
								onClick={() => router.push("/")}
								className={classNames(primaryButtonStyles, "w-full")}
							>
								Claim this link
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
