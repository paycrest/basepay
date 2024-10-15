import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "Basepay",
	description: "The first interface for decentralized payments to any bank or mobile wallet, powered by a distributed network of liquidity nodes.",
	publisher: 'Paycrest',
  authors: [{ name: 'Paycrest', url: 'https://paycrest.io' }],
  metadataBase: new URL('https://www.basepay.link'),
  openGraph: {
    title: 'Basepay',
    description:
      'The first interface for decentralized payments to any bank or mobile wallet, powered by a distributed network of liquidity nodes.',
    url: 'https://www.basepay.link',
    siteName: 'Basepay',
    images: [
      {
        url: '/images/og-image.png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basepay',
    description:
      'The first interface for decentralized payments to any bank or mobile wallet, powered by a distributed network of liquidity nodes.',
    creator: '@paycrest',
    images: ['/images/og-image.png'],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
