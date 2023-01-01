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
import Header from "../../components/Orders/Header";
import Tabs from "../../components/Orders/Tabs";

const Orders = () => {
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
			<Tabs tab="all" />
			<div className="overflow-x-auto relative">
				<table className="min-w-full text-left">
					<thead className="bg-zinc-100 uppercase shadow text-xs text-zinc-600">
						<tr>
							<th scope="col" className="py-3 px-1">
								<div>#</div>
							</th>
							<th scope="col" className="py-3 px-1 ">
								<div>Date</div>
							</th>
							<th scope="col" className="py-3 px-1 ">
								<div>Customer</div>
							</th>
							<th scope="col" className="py-3 px-1 ">
								<div>Order type</div>
							</th>

							<th scope="col" className="py-3 px-1 w-32">
								Contact
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Address
							</th>

							<th scope="col" className="py-3 px-1 ">
								Status
							</th>
							<th scope="col" className="py-3 px-1 ">
								Delivery Status
							</th>
							<th scope="col" className="py-3 px-1 text-right">
								Amount
							</th>
							<th scope="col" className="py-3 pl-6 "></th>
						</tr>
					</thead>
					<tbody className="text-sm font-thin overflow-x-auto">
						{orders.map((order, i) => (
							<tr className="bg-white border-b hover:bg-gray-100" key={i}>
								<th
									scope="row"
									className="py-3 px-1 font-medium text-gray-900 whitespace-nowrap"
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
									
								</td>
								<td className="py-3 px-1 ">
									{order.shippingAddress.primaryContact
										? order.shippingAddress.primaryContact
										: order.shippingAddress.secondaryContact}
								</td>
								<td className="py-3 px-1 ">
									{order.shippingAddress.address},<br />
									{order.shippingAddress.parish}
								</td>

								<td className="py-3 px-1">
									<span
										className={`${
											order.orderStatus === "cancelled"
												? "bg-red-600"
												: order.orderStatus === "pending"
												? "bg-blue-300"
												: order.orderStatus === "completed"
												? "bg-green-500"
												: "bg-gray-500"
										} text-white text-sm font-medium  flex justify-center items-center w-20 h-6 rounded `}
									>
										{order.orderStatus}
									</span>
								</td>
								<td className="py-3 px-1">
									{" "}
									<span
										className={`${
											order.deliveryStatus === "cancelled"
												? "bg-red-600"
												: order.deliveryStatus === "pending"
												? "bg-blue-300"
												: order.deliveryStatus === "completed"
												? "bg-green-500"
												: "bg-gray-500"
										} text-white text-sm font-medium flex justify-center items-center rounded w-20 h-6 `}
									>
										{order.deliveryStatus}
									</span>
								</td>
								<td className="py-3 px-1 font-medium text-right">${order.totalPrice}</td>
								<td className="py-3 pl-6 tracking-widest font-medium font-serif">
									<button className="text-gray-800"> ...</button>{" "}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default Orders;
