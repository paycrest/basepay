"use client";
import { usePrivy } from "@privy-io/react-auth";

import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import { Disclaimer, Preloader } from "@/components";

export default function Page() {
	const { ready, authenticated } = usePrivy();

	if (!ready) return <Preloader isLoading={!ready} />;

	return (
		<>
			<Disclaimer />
			{authenticated ? <Dashboard /> : <Home />}
		</>
	);
}
