"use client";
import { ErrorIcon } from "./ImageAssets";
import { AnimatePresence, motion } from "framer-motion";

export const InputError = ({ message }: { message: string | null }) => (
	<AnimatePresence>
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
			className="flex items-center justify-between gap-1 text-xs font-medium text-red-500"
		>
			<p className="p-2 rounded-lg bg-red-500/10">{message}</p>
			<ErrorIcon className="size-4" />
		</motion.div>
	</AnimatePresence>
);
