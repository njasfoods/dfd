import { useRouter } from "next/router";
import React from "react";

const Tabs = ({ tab }) => {
	const router = useRouter();
	return (
		<div className="flex border-b border-gray-200 dark:border-gray-700 py-4 space-x-4 font-medium">
			<button
				type="button"
				onClick={() => router.push("/orders")}
				className={`h-10 px-4 py-2 -mb-px text-sm text-center ${
					tab === "all" ? "text-blue-500" : " text-gray-700"
				} bg-transparent border-b-2 ${
					tab === "all" ? "border-blue-500" : " border-transparent"
				} sm:text-base whitespace-nowrap focus:outline-none`}
			>
				All Orders
			</button>

			<button
				type="button"
				onClick={() => router.push("/orders/meal-plan")}
				className={`h-10 px-4 py-2 -mb-px text-sm text-center ${
					tab === "meal-plan" ? "text-blue-500" : " text-gray-700"
				} bg-transparent border-b-2 ${
					tab === "meal-plan" ? "border-blue-500" : " border-transparent"
				}  sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
			>
				MealPlan Orders
			</button>

			<button
				type="button"
				onClick={() => router.push("/orders/shop")}
				className={`h-10 px-4 py-2 -mb-px text-sm text-center ${
					tab === "shop" ? "text-blue-500" : " text-gray-700"
				} bg-transparent border-b-2 ${
					tab === "shop" ? "border-blue-500" : " border-transparent"
				}  sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
			>
				Shop Orders
			</button>
			<button
				type="button"
				onClick={() => router.push("/orders/shop")}
				className={`h-10 px-4 py-2 -mb-px text-sm text-center ${
					tab === "pending" ? "text-blue-500" : " text-gray-700"
				} bg-transparent border-b-2 ${
					tab === "pending" ? "border-blue-500" : " border-transparent"
				}  sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
			>
				Pending Orders
			</button>
			<button
				type="button"
				onClick={() => router.push("/orders/shop")}
				className={`h-10 px-4 py-2 -mb-px text-sm text-center ${
					tab === "cancel" ? "text-blue-500" : " text-gray-700"
				} bg-transparent border-b-2 ${
					tab === "cancel" ? "border-blue-500" : " border-transparent"
				}  sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
			>
				Cancelled Orders
			</button>
		</div>
	);
};

export default Tabs;
