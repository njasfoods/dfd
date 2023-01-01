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

const OrdersShop = () => {
	const router = useRouter();
	const [ordered, setOrderBy] = useState({ name: "createdAt", order: "desc" });
	const [orders, setOrders] = useState([]);
	const ordersCollectRef = query(
		collection(db, "Orders"),
		where("shippingPrice", "==", 300)
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
			<Tabs tab="shop" />
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
								Orders
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								deliveryDate
							</th>
							<th scope="col" className="py-3 px-1 w-52">
								Address
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
									items.cat === "shop" ? (
										<td key={i}>
											{items.title} ({items.productSize === 0 ? "M" : "L"}) x{" "}
											{items.quantity}
										</td>
									) : (
										""
									)
								)}
								<td>{order.shippingAddress.deliveryDate}</td>
								<td className="py-3 px-1 ">
									{order.shippingAddress.address},<br />
									{order.shippingAddress.parish}
								</td>
								<td className="py-3 px-1 font-medium">${order.totalPrice}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default OrdersShop;
