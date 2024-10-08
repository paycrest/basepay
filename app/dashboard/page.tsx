"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

import { shortenAddress } from "../utils";
import {
	AnimatedContainer,
	AnimatedItem,
	Navbar,
	Preloader,
	primaryButtonStyles,
} from "@/components";
import { ArrowRightIcon, BannerIcon } from "@/components/ImageAssets";
import Link from "next/link";

const data = [
	{
		id: 1,
		title: "Total settled",
		content: "N0.00",
	},
	{
		id: 2,
		title: "Total transactions",
		content: "0",
	},
];

const Card = ({ title, content }: { title: string; content: string }) => (
	<div className="bg-gray-50 rounded-2xl border-border-light px-4 py-3 flex-1 space-y-8">
		<h3 className="text-text-secondary text-sm font-normal">{title}</h3>
		<p className="text-text-primary text-2xl font-semibold">{content}</p>
	</div>
);

export default function Dashboard() {
	const router = useRouter();
	const { ready, user } = usePrivy();
	const [showPreloader, setShowPreloader] = useState(false);

	const handleRedirect = () => {
		setShowPreloader(true);
		router.push("/dashboard/generate");
	};

	if (!ready) return <Preloader isLoading={!ready} />;

	return (
		<div className="bg-white space-y-10 max-w-screen-md mx-auto px-4">
			{showPreloader && <Preloader isLoading={showPreloader} />}

			<Navbar />

			<AnimatedContainer className="space-y-4">
				<AnimatedItem className="relative rounded-2xl p-3 bg-gray-50 border border-border-light space-y-4 overflow-hidden">
					<div className="absolute inset-0 w-full h-full bg-[url('/images/banner-gradient-bg.svg')] bg-center bg-no-repeat bg-cover scale-110" />

					<div className="space-y-2 relative">
						<BannerIcon className="size-6" />
						<h3 className="font-medium bg-gradient-to-r from-pink-500 via-orange-500 to-fuchsia-400 bg-clip-text text-transparent">
							Get your basename
						</h3>
						<p className="text-text-secondary text-sm font-normal">
							Claim your unique digital identity. Simple, memorable, and all
							yours.
						</p>
					</div>

					<Link
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.base.org/names"
						className="relative inline-flex items-center justify-center pt-[1.5px] p-0.5 overflow-hidden text-sm font-medium text-text-primary rounded-[0.875rem] group bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400  outline-none focus:ring-primary-blue focus:ring active:translate-y-0.5 transition-all ease-in-out focus:ring-offset-2 focus:ring-offset-white"
					>
						<span className="px-4 py-2.5 transition-all ease-in duration-75 bg-white rounded-xl group-hover:bg-opacity-0 group-hover:text-white flex gap-2 items-center">
							Get started{" "}
							<ArrowRightIcon className="text-primary-blue group-hover:text-white" />
						</span>
					</Link>

					<div className="absolute top-2 right-4 hidden sm:block">
						<Image
							src="/images/banner-illustration.svg"
							alt="banner illustration"
							width={120}
							height={120}
						/>
					</div>
				</AnimatedItem>

				<AnimatedItem className="flex justify-between items-center gap-4 flex-wrap">
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
					<button
						type="button"
						onClick={handleRedirect}
						className={primaryButtonStyles}
					>
						Generate link
					</button>
				</AnimatedItem>

				<AnimatedItem className="flex items-center justify-center gap-4">
					{data.map((item) => (
						<Card key={item.id} title={item.title} content={item.content} />
					))}
				</AnimatedItem>
			</AnimatedContainer>
		</div>
	);
}
