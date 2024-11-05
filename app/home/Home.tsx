"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { PaycrestLogo, TextCursor } from "@/components/ImageAssets";
import {
	AnimatedContainer,
	AnimatedItem,
	Preloader,
	primaryButtonStyles,
	secondaryButtonStyles,
} from "@/components";

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
			width={0}
			height={0}
			className="rounded-full size-6"
		/>
	</AnimatedItem>
);

export default function Home() {
	const router = useRouter();
	const { ready, authenticated } = usePrivy();
	const disableLogin = !ready || (ready && authenticated);
	const [showPreloader, setShowPreloader] = useState(false);

	const { login } = useLogin({
		onComplete: () => {
			setShowPreloader(true);
			router.push("/dashboard");
		},
	});
	// biome-ignore lint/correctness/useExhaustiveDependencies: depends only on ready and authenticated
	useEffect(() => {
		if (ready && authenticated) {
			router.push("/dashboard");
		}

		if (disableLogin) {
			setShowPreloader(true);
		} else {
			setShowPreloader(false);
		}
	}, [ready, authenticated]);

	if (showPreloader) return <Preloader isLoading={showPreloader} />;

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
					src="/logos/ar.svg"
					alt="ar"
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
					src="/logos/br.svg"
					alt="br"
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
							Receive direct fiat payments with crypto through our simple interface. Just like a bank transfer powered by stablecoins.
						</p>
					</AnimatedItem>
				</AnimatedContainer>

				<AnimatedItem className="flex gap-3 items-center sm:justify-center">
					<button
						type="button"
						onClick={login}
						disabled={disableLogin}
						className={secondaryButtonStyles}
					>
						Login
					</button>
					<button
						type="button"
						onClick={login}
						disabled={disableLogin}
						className={primaryButtonStyles}
					>
						Sign up
					</button>
				</AnimatedItem>
			</AnimatedContainer>
		</div>
	);
}
