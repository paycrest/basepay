"use client";

import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

import { shortenAddress } from "../utils";
import { Navbar, Preloader, primaryButtonStyles } from "@/components";
import { ArrowRightIcon, BannerIcon } from "@/components/ImageAssets";

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
	const { ready, user } = usePrivy();

	if (!ready) return <Preloader isLoading={!ready} />;

	return (
		<div className="bg-white space-y-10 max-w-screen-md mx-auto px-4">
			<Navbar />

			<main className="space-y-4">
				<div className="relative rounded-2xl p-3 bg-gray-50 border border-border-light space-y-4 overflow-hidden">
					<div className="absolute inset-0 w-full h-full bg-[url('/images/banner-gradient-bg.svg')] bg-center bg-no-repeat bg-cover scale-110" />

					<div className="space-y-2 relative">
						<BannerIcon className="size-6" />
						<h3 className="font-medium text-[#ca2ca8]">Get your basename</h3>
						<p className="text-text-secondary text-sm font-normal">
							Claim your unique digital identity. Simple, memorable, and all
							yours.
						</p>
					</div>

					<button
						type="button"
						className="relative inline-flex items-center justify-center p-[1.5px] overflow-hidden text-sm font-medium text-text-primary rounded-[0.875rem] group bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400  outline-none focus:ring-primary-blue focus:ring hover:-translate-y-1 active:translate-y-0.5 transition-all ease-in-out focus:ring-offset-2 focus:ring-offset-white"
					>
						<span className="px-4 py-2.5 transition-all ease-in duration-75 bg-white rounded-xl group-hover:bg-opacity-0 group-hover:text-white flex gap-2 items-center">
							Get started{" "}
							<ArrowRightIcon className="text-primary-blue group-hover:text-white" />
						</span>
					</button>

					<div className="absolute top-2 right-4 hidden sm:block">
						<Image
							src="/images/banner-illustration.svg"
							alt="banner illustration"
							width={120}
							height={120}
						/>
					</div>
				</div>

				<div className="flex justify-between items-center gap-4 flex-wrap">
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
					<button type="button" className={primaryButtonStyles}>
						Generate link
					</button>
				</div>

				<div className="flex items-center justify-center gap-4">
					{data.map((item) => (
						<Card key={item.id} title={item.title} content={item.content} />
					))}
				</div>
			</main>
		</div>
	);
}
