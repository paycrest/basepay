import { motion } from "framer-motion";

export const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
	},
};

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const dropdownVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
		},
	},
	closed: {
		opacity: 0,
		y: 20,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
		},
	},
};

export const previewVariants = {
	hidden: { opacity: 0, width: 0 },
	visible: {
		opacity: 1,
		width: "100%",
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	exit: {
		opacity: 0,
		width: 0,
		transition: {
			duration: 0.1,
			ease: "easeInOut",
		},
	},
};

export const AnimatedContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<motion.div
		className={className}
		initial="initial"
		animate="animate"
		variants={stagger}
	>
		{children}
	</motion.div>
);

export const AnimatedItem = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<motion.div className={className} variants={fadeInUp}>
		{children}
	</motion.div>
);
