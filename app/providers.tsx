"use client";

import { PrivyProvider } from "@privy-io/react-auth";

if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
	throw new Error("One or more environment variables are not set");
}

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<PrivyProvider
			appId={privyAppId}
			config={{
				appearance: {
					theme: "light",
					accentColor: "#0065F5",
					logo: "/logos/basepay.svg",
				},
				embeddedWallets: {
					createOnLogin: "users-without-wallets",
				},
			}}
		>
			{children}
		</PrivyProvider>
	);
}
