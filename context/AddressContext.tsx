import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { fetchLinkedAddress } from "../app/aggregator";

interface AddressContextProps {
	isAddressLinked: boolean;
	setIsAddressLinked: (status: boolean) => void;
}

const AddressContext = createContext<AddressContextProps | undefined>(
	undefined,
);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
	const { user, ready } = usePrivy();
	const [isAddressLinked, setIsAddressLinked] = useState(false);

	useEffect(() => {
		const getLinkedAddress = async () => {
			if (ready && user?.wallet?.address) {
				const response = await fetchLinkedAddress({
					address: user.wallet?.address,
				});
				setIsAddressLinked(response !== "No linked address");
			}
		};

		getLinkedAddress();
	}, [user, ready]);

	return (
		<AddressContext.Provider value={{ isAddressLinked, setIsAddressLinked }}>
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
