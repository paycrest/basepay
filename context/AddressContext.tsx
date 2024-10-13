import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { fetchLinkedAddress, getBasename } from "@/app/api/aggregator";
import type { LinkedAddressResponse } from "@/app/types";

interface AddressContextProps {
	basename: string | null;
	isAddressLinked: boolean;
	linkedAddress: string | null;
	accountDetails: LinkedAddressResponse | null;
}

const AddressContext = createContext<AddressContextProps | undefined>(
	undefined,
);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
	const { user, ready } = usePrivy();
	const [isAddressLinked, setIsAddressLinked] = useState(false);
	const [linkedAddress, setLinkedAddress] = useState<string | null>(null);
	const [basename, setBasename] = useState<string | null>(null);
	const [accountDetails, setAccountDetails] =
		useState<LinkedAddressResponse | null>(null);

	useEffect(() => {
		const getLinkedAddress = async () => {
			const privyIdToken = localStorage.getItem("privy:id_token");

			if (ready && user?.wallet?.address && privyIdToken) {
				try {
					const response = await fetchLinkedAddress({
						address: user.wallet?.address,
						privyIdToken,
					});
					setIsAddressLinked(!!response.linkedAddress);
					if (response.linkedAddress) setLinkedAddress(response.linkedAddress);
					setAccountDetails(response);
				} catch (error) {
					console.error("Error fetching linked address:", error);
				}

				try {
					const basename = await getBasename(user.wallet?.address);
					setBasename(basename ?? user.wallet?.address);
				} catch (error) {
					console.error("Error fetching basename:", error);
					toast.error("Error fetching basename");
				}
			}
		};

		getLinkedAddress();
	}, [user, ready]);

	return (
		<AddressContext.Provider
			value={{ basename, isAddressLinked, linkedAddress, accountDetails }}
		>
			{children}
		</AddressContext.Provider>
	);
};

export const useAddressContext = () => {
	const context = useContext(AddressContext);
	if (!context) {
		throw new Error("useAddressContext must be used within an AddressProvider");
	}
	return context;
};
