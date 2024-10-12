import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { fetchLinkedAddress, getBasename } from "../app/aggregator";
import { toast } from "react-toastify";

interface AddressContextProps {
	basename: string | null;
	isAddressLinked: boolean;
	setIsAddressLinked: (status: boolean) => void;
}

const AddressContext = createContext<AddressContextProps | undefined>(
	undefined,
);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
	const { user, ready } = usePrivy();
	const [isAddressLinked, setIsAddressLinked] = useState(false);
	const [basename, setBasename] = useState<string | null>(null);

	useEffect(() => {
		const getLinkedAddress = async () => {
			if (ready && user?.wallet?.address) {
				try {
					const response = await fetchLinkedAddress({
						address: user.wallet?.address,
					});
					setIsAddressLinked(!!response.linkedAddress);
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
			value={{ basename, isAddressLinked, setIsAddressLinked }}
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
