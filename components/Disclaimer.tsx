"use client";
import { useState, useEffect } from "react";
import { BsExclamationOctagon } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { primaryButtonStyles } from "./Styles";

export const Disclaimer = () => {
	const [showDisclaimer, setShowDisclaimer] = useState(false);

	useEffect(() => {
		const hasAcceptedDisclaimer = localStorage.getItem("hasAcceptedDisclaimer");
		if (!hasAcceptedDisclaimer) {
			setShowDisclaimer(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("hasAcceptedDisclaimer", "true");
		setShowDisclaimer(false);
	};

	return (
		<AnimatePresence>
			{showDisclaimer && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 grid min-h-screen place-items-center gap-4 bg-black/25 backdrop-blur-sm"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="grid w-full max-w-[400px] gap-5 rounded-3xl bg-white p-5"
					>
						<BsExclamationOctagon className="text-2xl" />
						<h2 className="text-xl font-semibold text-neutral-900">
							Disclaimer Notice
						</h2>
						<p className="text-sm leading-normal text-neutral-900">
							This application is for demo use only. Any transactions conducted
							within this app are for illustrative purposes.
						</p>
						<p className="text-sm leading-normal text-neutral-900">
							Therefore: <br />
							While the app records real transactions, please exercise caution
							and do not use this app as is in a production environment. Use at
							your own risk. The developers are not responsible for any issues
							or damages that may arise from the use of this app.
						</p>

						<div className="flex items-center justify-between">
							<button
								type="button"
								onClick={handleAccept}
								className={`w-full ${primaryButtonStyles}`}
							>
								I understand
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
