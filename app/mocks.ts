export const currencies = [
	{
		name: "KES",
		label: "Kenyan Shilling (KES)",
		imageUrl: "/logos/ke.svg",
	},
	{
		name: "NGN",
		label: "Nigerian Naira (NGN)",
		imageUrl: "/logos/ng.svg",
	},
	{
		name: "GHS",
		label: "Ghanaian Cedi (GHS)",
		imageUrl: "/logos/gh.svg",
		disabled: true,
	},
	{
		name: "ARS",
		label: "Argentine Peso (ARS)",
		imageUrl: "/logos/ar.svg",
		disabled: true,
	},
	{
		name: "BRL",
		label: "Brazilian Real (BRL)",
		imageUrl: "/logos/br.svg",
		disabled: true,
	},
];

export const tokens = [
	{
		name: "USDT",
		imageUrl: "/logos/usdt.svg",
	},
	{
		name: "USDC",
		imageUrl: "/logos/usdc.svg",
	},
];

export const mockTransactions = [
	{
		id: "1",
		amount: 1000,
		token: "abc123",
		transactionFee: 10,
		rate: 1.2,
		network: "Base",
		recipient: {
			currency: "KES",
			institution: "GTBank",
			accountIdentifier: "123456789",
			accountName: "John Doe",
		},
		fromAddress: "0x8e781F6924e039C0B24fa9f1AdaF05f706D4CE22",
		returnAddress: "0x8e781F6924e039C0B24fa9f1AdaF05f706D4CE22",
		gatewayID: "gateway1",
		createdAt: new Date(),
		updatedAt: new Date(),
		status: "settled",
	},
	{
		id: "2",
		amount: 2000,
		token: "def456",
		transactionFee: 20,
		rate: 1.3,
		network: "Base",
		recipient: {
			currency: "NGN",
			institution: "PalmPay",
			accountIdentifier: "987654321",
			accountName: "Jane Doe",
		},
		fromAddress: "0x8e781F6924e039C0B24fa9f1AdaF05f706D4CE22",
		returnAddress: "0x8e781F6924e039C0B24fa9f1AdaF05f706D4CE22",
		gatewayID: "gateway2",
		createdAt: new Date(),
		updatedAt: new Date(),
		status: "pending",
	},
];
