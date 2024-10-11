import type { IconType } from "react-icons";
import { MdOutlineDownloading } from "react-icons/md";
import { HiOutlineArrowCircleUp } from "react-icons/hi";
import { CheckmarkIcon, RefundedIcon } from "./ImageAssets";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const statusIcons: Record<string, IconType | IconComponent> = {
	pending: MdOutlineDownloading,
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
