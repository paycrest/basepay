"use client";
import { classNames } from "./utils";
import { useRouter } from "next/navigation";
import { secondaryButtonStyles } from "@/components";
import { PaycrestLogo } from "@/components/ImageAssets";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row gap-20 items-center justify-center min-h-screen content-center p-4 sm:p-8">
				<div className="space-y-6 text-center">
					<div className="flex items-center gap-1 justify-center">
						<p className="text-text-primary text-lg font-semibold">basepay</p>
						<PaycrestLogo className="size-2.5" />
					</div>

					<h1 className="text-9xl font-semibold text-text-primary">404</h1>

					<p className="text-text-secondary text-lg max-w-sm">
						This page does not exist
					</p>

					<button
						type="button"
						onClick={() => router.push("/")}
						className={classNames(secondaryButtonStyles)}
					>
						Go back home
					</button>
				</div>
			</div>
		</div>
	);
}
