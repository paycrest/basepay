"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import { PaycrestLogo, TextCursor } from "@/components/ImageAssets";
import { AnimatedContainer, AnimatedItem } from "@/components/Animations";

const CurrencyLogo = ({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) => (
	<AnimatedItem
		className={`hidden sm:block w-fit border-4 border-white p-2 bg-gray-50 rounded-full shadow ${className}`}
	>
		<Image
			src={src}
			alt={alt}
			width={24}
			height={24}
			className="rounded-full"
		/>
	</AnimatedItem>
);

export default function Home() {
	return (
		<div className="min-h-screen content-center bg-white p-4 overflow-hidden">
			<AnimatedContainer className="relative space-y-6 max-w-2xl px-4 mx-auto aspect-square content-center sm:border sm:border-border-light sm:rounded-full">
				<CurrencyLogo
					src="/logos/usdc.svg"
					alt="usdc"
					className="absolute top-1 left-1/4"
				/>
				<CurrencyLogo
					src="/logos/usdt.svg"
					alt="usdt"
					className="absolute top-3 left-3/4"
				/>
				<CurrencyLogo
					src="/logos/gh.svg"
					alt="gh"
					className="absolute right-0"
				/>
				<CurrencyLogo
					src="/logos/ke.svg"
					alt="ke"
					className="absolute top-1/3 -left-5"
				/>
				<CurrencyLogo
					src="/logos/ng.svg"
					alt="ng"
					className="absolute bottom-16 left-20"
				/>
				<CurrencyLogo
					src="/logos/sa.svg"
					alt="sa"
					className="absolute bottom-16 right-20"
				/>

				<AnimatedItem className="flex gap-1 items-center sm:justify-center w-full">
					<p className="text-text-primary text-base sm:text-lg font-semibold">
						basepay
					</p>
					<PaycrestLogo className="size-2.5" />
				</AnimatedItem>

				<AnimatedContainer className="gap-6 space-y-6 sm:text-center">
					<AnimatedItem>
						<h1 className="text-text-primary font-semibold text-3xl sm:text-5xl leading-normal">
							Get paid in <br className="sm:hidden" />
							<div className="inline relative">
								<TypeAnimation
									sequence={[
										"KSH",
										3000,
										"GHS",
										3000,
										"NGN",
										3000,
										"SAR",
										3000,
									]}
									wrapper="span"
									speed={20}
									className="text-background-blue text-3xl sm:text-5xl bg-background-blue/10 px-2"
									repeat={Number.POSITIVE_INFINITY}
									cursor={false}
								/>
								<TextCursor className="absolute top-0 -right-1 h-11 sm:h-auto" />
							</div>
							<br className="hidden sm:block" /> with crypto
						</h1>
					</AnimatedItem>
					<AnimatedItem>
						<p className="text-text-secondary text-sm sm:text-lg leading-normal sm:max-w-sm sm:mx-auto">
							Receive direct fiat payments with crypto through our simple
							interface. Just like a bank transfer powered by digital assets -
							no P2P required.
						</p>
					</AnimatedItem>
				</AnimatedContainer>

				<AnimatedItem className="flex gap-3 items-center sm:justify-center">
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
				</AnimatedItem>
			</AnimatedContainer>
		</div>
	);
}
