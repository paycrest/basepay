"use client";
import { Preloader } from "@/components";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";

export default function Page() {
	const { ready, authenticated } = usePrivy();

	if (!ready) return <Preloader isLoading={!ready} />;

	return authenticated ? <Dashboard /> : <Home />;
}
