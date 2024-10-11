"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PrivyProvider } from "@privy-io/react-auth";
import { AddressProvider } from "@/context/AddressContext";

if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
	throw new Error("One or more environment variables are not set");
}

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
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
				<AddressProvider>
					{children}

					<ToastContainer
						position="bottom-right"
						theme="light"
						stacked
						draggable
						pauseOnHover
						pauseOnFocusLoss
						hideProgressBar
						bodyClassName="font-sans"
					/>
				</AddressProvider>
			</PrivyProvider>
		</>
	);
}
