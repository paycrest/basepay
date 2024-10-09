import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

import { CiSearch } from "react-icons/ci";
import { ImSpinner } from "react-icons/im";
import { PiCaretDown } from "react-icons/pi";

import { classNames } from "@/app/utils";
import { useOutsideClick } from "@/app/hooks";
import { dropdownVariants } from "./Animations";
import type { FormDataTypes, InstitutionProps } from "@/app/types";

interface BankDropdownProps {
	institutions: InstitutionProps[];
	isFetchingInstitutions: boolean;
	selectedInstitution: InstitutionProps | null;
	setSelectedInstitution: (institution: InstitutionProps | null) => void;
	// biome-ignore lint/suspicious/noExplicitAny: ...
	formMethods: UseFormReturn<FormDataTypes, any, undefined>;
}

export const BankDropdown = ({
	institutions,
	isFetchingInstitutions,
	selectedInstitution,
	setSelectedInstitution,
	formMethods,
}: BankDropdownProps) => {
	const { setValue, watch } = formMethods;
	const { currency, institution } = watch();
	const [bankSearchTerm, setBankSearchTerm] = useState("");
	const [isInstitutionsDropdownOpen, setIsInstitutionsDropdownOpen] =
		useState(false);

	const filteredInstitutions = institutions.filter((item) =>
		item.name.toLowerCase().includes(bankSearchTerm.toLowerCase()),
	);

	const institutionsDropdownRef = useRef<HTMLDivElement>(null);
	useOutsideClick({
		ref: institutionsDropdownRef,
		handler: () => setIsInstitutionsDropdownOpen(false),
	});

	useEffect(() => {
		console.log(institution);
	}, [institution]);

	return (
		<div ref={institutionsDropdownRef} className="flex-1 space-y-2">
			<p className="text-text-primary font-medium">Bank</p>

			<button
				type="button"
				onClick={() =>
					setIsInstitutionsDropdownOpen(!isInstitutionsDropdownOpen)
				}
				disabled={isFetchingInstitutions || !currency}
				className={classNames(
					"flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left text-sm text-neutral-900 outline-none transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
					isFetchingInstitutions
						? "cursor-progress"
						: !currency
							? "cursor-not-allowed"
							: "",
				)}
			>
				{selectedInstitution ? (
					<p className="truncate">{selectedInstitution.name}</p>
				) : (
					<p className="text-gray-400">Select bank</p>
				)}

				{isFetchingInstitutions ? (
					<ImSpinner className="animate-spin text-base text-text-secondary" />
				) : (
					<PiCaretDown
						className={classNames(
							"text-base text-text-secondary transition-transform",
							isInstitutionsDropdownOpen ? "rotate-180" : "",
						)}
					/>
				)}
			</button>

			{isInstitutionsDropdownOpen && (
				<motion.div
					initial="closed"
					animate={isInstitutionsDropdownOpen ? "open" : "closed"}
					exit="closed"
					variants={dropdownVariants}
					className="scrollbar-hide absolute bottom-0 z-50 mt-2 max-h-80 w-full max-w-full overflow-y-auto rounded-xl bg-gray-50 shadow-xl"
				>
					<h4 className="px-4 pt-4 font-medium">Select bank</h4>
					<div className="sticky top-0 bg-gray-50 p-4">
						<div className="relative">
							<CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
							<input
								type="search"
								placeholder="Search banks..."
								value={bankSearchTerm}
								onChange={(e) => setBankSearchTerm(e.target.value)}
								className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
							/>
						</div>
					</div>
					<ul aria-labelledby="networks-dropdown" className="px-2 pb-2">
						{filteredInstitutions.length > 0 ? (
							filteredInstitutions.map((institution) => (
								<li key={institution.code}>
									<button
										type="button"
										className={classNames(
											"w-full flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-neutral-900 transition-all hover:bg-gray-200",
											selectedInstitution?.code === institution.code
												? "bg-gray-200"
												: "",
										)}
										onClick={() => {
											setSelectedInstitution(institution);
											setIsInstitutionsDropdownOpen(false);
											setValue("institution", institution.code);
											console.log();
										}}
									>
										{institution.name}
									</button>
								</li>
							))
						) : (
							<li className="flex items-center justify-center gap-2 py-4">
								<p>No banks found</p>
							</li>
						)}
					</ul>
				</motion.div>
			)}
		</div>
	);
};
