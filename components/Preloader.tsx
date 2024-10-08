"use client";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="pointer-events-none fixed inset-0 z-50 min-h-screen cursor-progress content-center gap-4 bg-white w-full"
				>
					<motion.div
						initial={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.5 }}
						className="loader mx-auto"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
