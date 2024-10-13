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
