import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { classNames, shortenAddress } from "@/app/utils";
import { useAddressContext } from "@/context/AddressContext";

export const PaymentLinkPreview = ({
	isSubmitting,
}: {
	isSubmitting: boolean;
}) => {
	const { user } = usePrivy();
	const { basename } = useAddressContext();

	return (
		<div className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-lg">
			<div className="p-2 bg-white hidden lg:block">
				<div className="flex items-center gap-8">
					<div className="flex gap-1">
						<div className="size-1.5 rounded-full bg-red-500" />
						<div className="size-1.5 rounded-full bg-yellow-500" />
						<div className="size-1.5 rounded-full bg-green-500" />
					</div>
					<div className="flex-1 flex items-center justify-center bg-gray-100 rounded-md py-0.5 px-2 text-[.5rem] text-text-secondary">
						basepay.link/{basename ?? user?.wallet?.address}
					</div>
					<div className="flex gap-2">
						<div className="size-2 bg-gray-200 rounded" />
						<div className="size-2 bg-gray-200 rounded" />
						<div className="size-2 bg-gray-200 rounded" />
					</div>
				</div>
			</div>
			<div className="p-6 bg-white text-sm space-y-8">
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<p className="text-text-secondary">Supported tokens</p>
						<div className="flex gap-2">
							{["usdc", "usdt"].map((token) => (
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
				</div>

				<div
					className={classNames(
						"w-full h-96 content-center bg-center bg-no-repeat bg-cover rounded-3xl",
						isSubmitting
							? "animate-pulse bg-[url('/images/qr-gradient-preview.svg')]"
							: "bg-[url('/images/qr-preview.svg')]",
					)}
				>
					<p
						className={classNames(
							"text-text-secondary text-sm w-fit mx-auto mt-36",
							isSubmitting
								? "px-3 py-1 rounded-lg bg-green-100 text-green-500"
								: "",
						)}
					>
						{basename ?? shortenAddress(user?.wallet?.address ?? "", 6)}
					</p>
				</div>

				{isSubmitting ? (
					<div className="rounded-xl border border-border-light p-4 text-text-secondary text-center">
						<p>Generating your payment link...</p>
					</div>
				) : (
					<div className="rounded-xl border border-border-light bg-background-neutral py-4 space-y-4">
						<p className="px-4 font-medium bg-gradient-to-r from-purple-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent truncate">
							basepay.link/{basename ?? user?.wallet?.address}
						</p>
						<hr className="border-t border-border-light" />
						<p className="text-text-secondary px-4">
							Send only{" "}
							<span className="text-text-primary">Supported tokens</span> on{" "}
							<span className="text-text-primary">Base Network</span>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
