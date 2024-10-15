import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "Basepay",
	description:
		"Receive direct fiat payments with crypto through our simple interface. Just like a bank transfer powered by stablecoins.",
	publisher: "Paycrest",
	authors: [{ name: "Paycrest", url: "https://paycrest.io" }],
	metadataBase: new URL("https://www.basepay.link"),
	openGraph: {
		title: "Basepay",
		description:
			"Receive direct fiat payments with crypto through our simple interface. Just like a bank transfer powered by stablecoins.",
		url: "https://www.basepay.link",
		siteName: "Basepay",
		images: [
			{
				url: "/images/og-image.png",
			},
		],
		locale: "en_US",
		type: "website",
	},
	icons: {
		icon: "/favicon.ico",
	},
	twitter: {
		card: "summary_large_image",
		title: "Basepay",
		description:
			"Receive direct fiat payments with crypto through our simple interface. Just like a bank transfer powered by stablecoins.",
		creator: "@paycrest",
		images: ["/images/og-image.png"],
	},
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
