import type { IconType } from "react-icons";
import { MdOutlineDownloading } from "react-icons/md";
import { HiOutlineArrowCircleUp } from "react-icons/hi";
import {
	CheckmarkIcon,
	ProcessingIcon,
	RefundedIcon,
	RevertedIcon,
} from "./ImageAssets";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const statusIcons: Record<string, IconType | IconComponent> = {
	initiated: HiOutlineArrowCircleUp,
	pending: MdOutlineDownloading,
	reverted: RevertedIcon,
	expired: RevertedIcon,
	settled: CheckmarkIcon,
	processing: ProcessingIcon,
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
