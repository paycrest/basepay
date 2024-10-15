import type { IconType } from "react-icons";
import { HiOutlineArrowCircleUp } from "react-icons/hi";
import { CheckmarkIcon, LoadingIcon, RefundedIcon } from "./ImageAssets";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const statusIcons: Record<string, IconType | IconComponent> = {
	pending: LoadingIcon,
	settled: CheckmarkIcon,
	refunded: RefundedIcon,
};

interface StatusIconProps {
	status: string;
	className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
	status,
	className,
}) => {
	const IconComponent = statusIcons[status] || HiOutlineArrowCircleUp;
	return <IconComponent className={className} />;
};
