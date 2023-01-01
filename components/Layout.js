import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ title, description, children }) {
	const company = "NJAS";
	return (
		<>
			<Head>
				<title>
					{title ? `${title} | Not Jus A Salad` : `Not Jus A Salad`}
				</title>
				{description && <meta name="description" content={description}></meta>}
			</Head>
			<div className="text-black flex font-sans leading-normal tracking-normal ">
				<div className="w-1/5 lg:w-1/6 ">
					<Sidebar />
				</div>
				<main className="flex flex-col w-4/5 lg:w-5/6 pr-3">
					<div> {children}</div>
				</main>
			</div>
		</>
	);
}
