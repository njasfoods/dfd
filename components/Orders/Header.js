import { useRouter } from "next/router";
import React from "react";

const Header = () => {
	const router = useRouter();
	return (
		<div className="flex items-center justify-between py-6">
			<h1 className="font-bold text-3xl ">All Orders</h1>
			<div className="flex space-x-4">
				<button
					onClick={() => router.push("/orders/excel")}
					type="button"
					className="px-4 py-2 rounded-2xl bg-green-700 text-white "
				>
					Export to excel
				</button>
				<button
					type="button"
					className="px-4 py-2 rounded-2xl bg-black text-white "
				>
					+ New Order
				</button>
			</div>
		</div>
	);
};

export default Header;
