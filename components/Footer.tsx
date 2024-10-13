"use client";

import { useEffect, useState } from "react";

import { FarcasterIcon, GithubIcon, XTwitterIcon } from "./ImageAssets";
import { AnimatedItem } from "./Animations";

const socials = [
	{
		href: "https://github.com/paycrest/basepay",
		title: "GitHub",
		LogoSvg: GithubIcon,
	},
	{
		href: "https://x.com/paycrest",
		title: "X",
		LogoSvg: XTwitterIcon,
	},
	{
		href: "https://warpcast.com/~/channel/paycrst",
		title: "Farcaster",
		LogoSvg: FarcasterIcon,
	},
];

const SocialLink = ({
	href,
	title,
	LogoSvg,
}: {
	href: string;
	title: string;
	LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
	return (
		<a href={href} title={title} target="_blank" rel="noopener noreferrer">
			<LogoSvg className="size-5 hover:opacity-70 transition-opacity" />
		</a>
	);
};

export const Footer = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<AnimatedItem>
			<footer className="flex w-full items-center justify-between border-t border-dashed border-border-light pb-6 p-4">
				<p className="text-xs font-medium">
					<span className="text-text-secondary">
						&copy; {new Date().getFullYear()} Powered by
					</span>{" "}
					<a
						href="https://paycrest.io"
						target="_blank"
						rel="noopener noreferrer"
						className="text-text-primary hover:underline"
					>
						Paycrest Protocol
					</a>
				</p>
				<div className="flex items-center justify-center gap-2">
					{socials.map((social) => (
						<SocialLink key={social.title} {...social} />
					))}
				</div>
			</footer>
		</AnimatedItem>
	);
};
