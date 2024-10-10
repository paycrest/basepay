export type InstitutionProps = {
	name: string;
	code: string;
	type: string;
};

export type VerifyAccountPayload = {
	institution: string;
	accountIdentifier: string;
};

export type FormValues = {
	currency: string;
	institution: string;
	recipientName: string;
	accountIdentifier: string;
};

export type TransactionStatus =
	| "initiated"
	| "pending"
	| "reverted"
	| "expired"
	| "settled"
	| "processing"
	| "refunded";

export type PaymentOrderResponse = {
	id: string;
	amount: number;
	token: string;
	transactionFee: number;
	rate: number;
	network: string;
	recipient: {
		currency: string;
		institution: string;
		accountIdentifier: string;
		accountName: string;
	};
	fromAddress: string;
	returnAddress: string;
	gatewayID: string;
	createdAt: Date;
	updatedAt: Date;
	status: TransactionStatus;
	icon?: React.ReactNode;
};

export type RatePayload = {
	token: string;
	amount?: number;
	currency: string;
};

export type RateResponse = {
	status: string;
	data: number;
	message: string;
};
