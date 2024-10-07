"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { PaycrestLogo, TextCursor } from "@/components/ImageAssets";

export default function Home() {
	return (
		<div className="min-h-screen content-center bg-white p-4 overflow-hidden">
			<div className="relative space-y-6 max-w-2xl px-4 mx-auto aspect-square content-center border border-border-light rounded-full">
				<div className="w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow absolute right-0">
					<Image
						src="/logos/ng.svg"
						alt="ngn"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
				<div className="w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow absolute left-0">
					<Image
						src="/logos/ke.svg"
						alt="ngn"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
				<div className="w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow absolute bottom-0 left-0">
					<Image
						src="/logos/usdt.svg"
						alt="ngn"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
				<div className="w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow absolute bottom-0 right-0">
					<Image
						src="/logos/gh.svg"
						alt="ngn"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
				<div className="w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow absolute top-0 left-1/2">
					<Image
						src="/logos/usdc.svg"
						alt="ngn"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>

				<div className="flex gap-1 items-center justify-center w-full">
					<p className="text-text-primary text-lg font-semibold">basepay</p>
					<PaycrestLogo className="size-2.5" />
				</div>

				<div className="gap-6 space-y-6 text-center">
					<h1 className="text-text-primary font-semibold text-5xl">
						Get paid in{" "}
						<div className="inline relative">
							<TypeAnimation
								sequence={["KSH", 3000, "GHS", 3000, "NGN", 3000, "SAR", 3000]}
								wrapper="span"
								speed={20}
								className="text-background-blue text-5xl bg-background-blue/10 px-2"
								repeat={Number.POSITIVE_INFINITY}
								cursor={false}
							/>
							<TextCursor className="absolute top-0 -right-1" />
						</div>
						<br />
						with crypto
					</h1>
					<p className="text-text-secondary text-lg leading-normal max-w-sm mx-auto">
						Receive direct fiat payments with crypto through our simple
						interface. Just like a bank transfer powered by digital assets - no
						P2P required.
					</p>
				</div>

				<div className="flex gap-3 items-center justify-center">
					<button
						type="button"
						className="px-4 py-2.5 rounded-xl border border-border-light hover:shadow bg-white text-text-primary font-medium text-sm leading-normal outline-none focus:ring-primary-blue focus:ring hover:-translate-y-1 transition-all ease-in-out hover:bg-gray-100"
					>
						Connect
					</button>
					<button
						type="button"
						className="px-4 py-2.5 rounded-xl border border-border-light hover:shadow bg-primary-blue text-white font-medium text-sm leading-normal outline-none focus:ring-primary-blue focus:ring hover:-translate-y-1 transition-all ease-in-out hover:bg-blue-800"
					>
						Get started
					</button>
				</div>
			</div>
		</div>
	);
}
