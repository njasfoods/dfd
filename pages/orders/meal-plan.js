import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	orderBy,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { async, getUA } from "@firebase/util";
import { useRouter } from "next/router";
import Tabs from "../../components/Orders/Tabs";
import Header from "../../components/Orders/Header";

const OrdersPlan = () => {
	const router = useRouter();
	const [ordered, setOrderBy] = useState({ name: "createdAt", order: "desc" });
	const [orders, setOrders] = useState([]);
	const ordersCollectRef = query(
		collection(db, "Orders"),
		orderBy(ordered.name, ordered.order)
	);
	useEffect(() => {
		const getU = async (id) => {
			// console.log(id, typeof id);
			const docRef = doc(db, "User", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log("No such document!");
			}
		};
		const getOrders = async () => {
			const orderData = await getDocs(ordersCollectRef);
			const o = await Promise.all(
				orderData.docs.map(async (order) => ({
					...order.data(),
				}))
			);
			setOrders(o);
		};
		getOrders();
	}, [ordered]);
	return (
		<Layout title="Orders">
			<Header />
			<Tabs tab="meal-plan" />
			<div className="overflow-x-auto relative">
				<table className="table-auto w-full text-base text-left text-gray-900">
					<thead className=" text-sm text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="py-3 px-1 border-r-2 f">
								<div>#</div>
							</th>
							<th scope="col" className="py-3 px-1 ">
								<div>Created</div>
							</th>
							<th scope="col" className="py-3 px-1 ">
								<div>Customer</div>
							</th>

							<th scope="col" className="py-3 px-1 w-32">
								Contact
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Monday
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Tuesday{" "}
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Wednesday{" "}
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Thursday{" "}
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Friday{" "}
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Address
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Delivery Instructions
							</th>
							<th scope="col" className="py-3 px-1 ">
								Grand Total
							</th>
						</tr>
					</thead>
					<tbody className="text-xs overflow-x-auto">
						{orders.map((order, i) => (
							<tr className="bg-white border-b hover:bg-gray-100" key={i}>
								<th
									scope="row"
									className="py-3 px-1 border-r-2 font-medium text-gray-900 whitespace-nowrap"
								>
									{i}
								</th>
								<td className="py-3 px-1">
									{new Date(order.createdAt.seconds * 1000).toDateString()}
								</td>
								<td className="py-3 px-1 ">
									{order.customer.fName} {order.customer.lName}
								</td>
								<td className="py-3 px-1 ">
									{order.shippingAddress.primaryContact
										? order.shippingAddress.primaryContact
										: order.shippingAddress.secondaryContact}
								</td>

								{order.orderItems.map((items, i) =>
									items.cat === "mealPlan" ? (
										<td key={i}>
											<div>
												{items.title} ({items.productSize === 0 ? "M" : "L"}) -
												{items.side} & {items.treat}
											</div>
											<div>
												{" "}
												{items.stringDate
													? items.stringDate
													: order.shippingAddress.deliveryDate}
											</div>
										</td>
									) : (
										""
									)
								)}
								<td className="py-3 px-1 ">
									{order.shippingAddress.address},<br />
									{order.shippingAddress.parish}
								</td>
								<td>{order.shippingAddress.deliveryInstructions}</td>
								<td className="py-3 px-1 font-medium">${order.totalPrice}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default OrdersPlan;
