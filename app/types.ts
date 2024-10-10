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
