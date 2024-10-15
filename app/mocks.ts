import type { TransactionHistoryResponse } from "./types";

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
	// {
	// 	name: "USDT",
	// 	imageUrl: "/logos/usdt.svg",
	// },
	{
		name: "USDC",
		imageUrl: "/logos/usdc.svg",
	},
];

export const mockTransactions: TransactionHistoryResponse[] = [
	{
		id: "f4cc3aa6-5cd1-489b-b94b-83955cca4f34",
		amount: "1",
		token: "USDC",
		rate: "1679",
		network: "base",
		gatewayId:
			"0x9dd8e191cb9bfd1324674519986aa6c38b6d89bf1e20e64c8611603729002002",
		recipient: {
			currency: "NGN",
			institution: "PalmPay",
			accountIdentifier: "7042158996",
			accountName: "JEREMIAH OLUMIDE AWORETAN",
		},
		fromAddress: "0xFf7dAD16C6Cd58FD0De22ddABbcBF35f888Fc9B2",
		returnAddress: "0x1BC589eD31F7574dc8d8d1bbD49660d3C4B74797",
		createdAt: "2024-10-13T03:06:03.049801Z",
		updatedAt: "2024-10-13T03:07:03.302445Z",
		txHash:
			"0xc5631a904c424f9638717217796af06cadfa7c342ba0a72c4674ec9dae0150ee",
		status: "settled",
	},
	{
		id: "0266280b-c855-4ca0-a88e-4b6184b5773f",
		amount: "0.5",
		token: "DAI",
		rate: "1675.03",
		network: "base-sepolia",
		gatewayId: "",
		recipient: {
			currency: "NGN",
			institution: "Kuda Microfinance Bank",
			accountIdentifier: "2002948489",
			accountName: "Chibuotu Amadi",
		},
		fromAddress: "0xf4c5c4deDde7A86b25E7430796441e209e23eBFB",
		returnAddress: "0xabb4993e6FFB978d034cc77f6bca0393d862fA03",
		createdAt: "2024-10-11T12:18:23.180355+01:00",
		updatedAt: "2024-10-11T12:19:15.776945+01:00",
		txHash:
			"0x65ab6d647923962b545c00287db4f50a45ca736a884e267037a72b3fb806f90b",
		status: "pending",
	},
	{
		id: "190b1d39-bb50-4aa7-a24e-719799d26645",
		amount: "0.5",
		token: "DAI",
		rate: "1681.38",
		network: "base-sepolia",
		gatewayId:
			"0xaa2e0634d67dc38a57f3f6712017ea38d12464fe269236efc999c60017141472",
		recipient: {
			currency: "NGN",
			institution: "Kuda Microfinance Bank",
			accountIdentifier: "2002948489",
			accountName: "Chibuotu Amadi",
		},
		fromAddress: "0x8e781F6924e039C0B24fa9f1AdaF05f706D4CE22",
		returnAddress: "0xabb4993e6FFB978d034cc77f6bca0393d862fA03",
		createdAt: "2024-10-11T03:18:18.127584+01:00",
		updatedAt: "2024-10-11T03:18:49.923928+01:00",
		txHash:
			"0xbc79bea2f520bc6aa14c72735c289b2210a27b01bbb29851a48a6c3c13820701",
		status: "settled",
	},
	{
		id: "c4e2a3df-2f1b-4eca-a1a9-cb885f5fde3f",
		amount: "0.6",
		token: "DAI",
		rate: "1681.23",
		network: "base-sepolia",
		gatewayId:
			"0x1ffa343dc5dc500ebbc3473b5384df972328e85b3ca10f7697ca836fc58d10c9",
		recipient: {
			currency: "NGN",
			institution: "Kuda Microfinance Bank",
			accountIdentifier: "2002948489",
			accountName: "Chibuotu Amadi",
		},
		fromAddress: "0xf4c5c4deDde7A86b25E7430796441e209e23eBFB",
		returnAddress: "0xabb4993e6FFB978d034cc77f6bca0393d862fA03",
		createdAt: "2024-10-11T02:56:16.300227+01:00",
		updatedAt: "2024-10-11T02:56:37.243523+01:00",
		txHash:
			"0x1c6fc8041fb7b3cb9ff64a342b60f0de2fab97201f44ec2cde583e1d310c29a1",
		status: "refunded",
	},
];
