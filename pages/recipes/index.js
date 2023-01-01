import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

const Recipes = () => {
	const router = useRouter();
	return (
		<Layout>
			<div className="w-full px-4 text-gray-800">
				<div className="flex items-center justify-between py-6">
					<h1 className="font-bold text-3xl ">Recipes</h1>
					<div className="flex space-x-4">
						<button
							type="button"
							onClick={() => router.push("/recipes/create")}
							className="px-4 py-2 rounded-2xl bg-green-700 text-white "
						>
							Create new recipe
						</button>
					</div>
				</div>

				<div className="flex space-x-6 py-6">
					<h2 className="font-bold tracking-wide text-lg">All Recipes</h2>
					<select className="px-2 bg-zinc-100 rounded py-0.5 shadow border">
						<option>Filter by category </option>
					</select>
					<select className="px-2 bg-zinc-100 rounded py-0.5 shadow border">
						<option>Sort by</option>
						<option>Category</option>
						<option>Title</option>
					</select>
				</div>
				<div className="">
					<div className="overflow-hidden">
						<table className="min-w-full">
							<thead className="bg-zinc-100 uppercase shadow text-xs text-zinc-600">
								<tr>
									<th scope="col" className=" px-3 py-2 text-left">
										<input type="radio" className="w-3 h-3" />
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										title
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										ingredients
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										description
									</th>

									<th scope="col" className=" px-3 py-2 text-left">
										Category
									</th>
									<th scope="col" className=" px-2 py-2 text-left">
										instructions
									</th>
									<th scope="col" className=" px-2 py-2 text-left">
										Serving size
									</th>
									<th scope="col" className=" px-2 py-2 text-left">
										Prep Time
									</th>
									<th scope="col" className=" px-2 py-2 text-left">
										Calories
									</th>
									<th scope="col" className=""></th>
								</tr>
							</thead>
							<tbody className="text-sm font-medium capitalize">
								{/* {entries.map((e, i) => (
									<tr key={i} className="border-b">
										<td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											<input type="radio" />
										</td>
										<td className="px-3 py-4 whitespace-nowrap">
											<div>
												<p className="font-medium text-yellow-500">{e.id}</p>
												<p className="text-xs text-zinc-400">Yesterday</p>
											</div>
										</td>
										<td className=" px-3 py-4 whitespace-nowrap">
											{e.description}
										</td>
										<td className=" px-3 py-4 whitespace-nowrap">{e.payee}</td>
										<td className=" px-3 py-4 whitespace-nowrap">
											{e.category}
										</td>
										<td className=" px-2 py-4 whitespace-nowrap">
											${e.amount}
										</td>
										<td className="py-4 whitespace-nowrap">
											<button className="text-lg tracking-widest ">...</button>
										</td>
									</tr>
								))} */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Recipes;
