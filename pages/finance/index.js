import { Modal, Box, Typography } from "@mui/material";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db } from "../../utils/firebase";

const Finances = () => {
	const router = useRouter();
	const [orders, setOrders] = useState([]);
	const [entries, setEntries] = useState([]);
	const [open, setOpen] = useState(false);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState(0);
	const [payee, setPayee] = useState("");
	const [date, setDate] = useState("");

	const setEntry = async () => {
		await addDoc(collection(db, "BookKeeping"), {
			description: description,
			category: category,
			amount: parseInt(amount),
			payee: payee,
			entryDate: Date,
			timestamp: serverTimestamp(),
		});
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		const getBooks = async () => {
			const q = query(collection(db, "BookKeeping"));
			const bookData = await getDocs(q);
			const o = bookData.docs.map((entries) => ({
				...entries.data(),
				id: entries.id,
			}));
			setEntries(o);
		};
		const getOrders = async () => {
			const q = query(collection(db, "Orders"));
			const orderData = await getDocs(q);
			const o = orderData.docs.map((order) => ({
				...order.data(),
			}));
			setOrders(o);
		};
		getBooks();
		getOrders();
	}, []);
	const totalRevenue = orders.reduce((a, v) => (a = a + v.totalPrice), 0);

	return (
		<Layout>
			<div className="w-full px-4 text-gray-800">
				<div className="flex items-center justify-between py-6">
					<h1 className="font-bold text-3xl ">Financial Data</h1>
					<div className="flex space-x-4">
						<button
							type="button"
							onClick={handleOpen}
							className="px-4 py-2 rounded-2xl bg-green-700 text-white "
						>
							Create new entry
						</button>
						<button
							type="button"
							onClick={() => router.push("/finance/invoice")}
							className="px-4 py-2 rounded-2xl bg-black text-white "
						>
							Send an invoice
						</button>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-6 tracking-wide border-b-4 pb-12">
					<div className="bg- shadow  rounded-2xl h-32 bg-zinc-100 py-4 px-8 flex justify-center flex-col items-center">
						<h4 className="text-sm font-medium">Total Income</h4>
						<p className="text-3xl font-bold text-gray-800">${totalRevenue}</p>
					</div>
					<div className="bg shadow  rounded-2xl h-32 bg-zinc-100 py-4 px-8 flex justify-center flex-col items-center">
						<h4 className="text-sm font-medium">Net Expenses</h4>
						<p className="text-3xl font-bold text-gray-800">${totalRevenue}</p>
					</div>

					<div className="bg- shadow  rounded-2xl h-32 bg-zinc-100 py-4 px-8 flex justify-center flex-col items-center">
						<h4 className="text-sm font-medium">Total Orders</h4>
						<p className="text-3xl font-bold text-gray-800">{orders.length}</p>
					</div>
				</div>
				<div className="flex space-x-6 py-6">
					<h2 className="font-bold tracking-wide text-lg">All Transactions</h2>
					<select className="px-2 bg-zinc-100 rounded py-0.5 shadow border">
						<option>Today : {new Date().toDateString()} </option>
						<option>Week to date: </option>
						<option>Month to date: </option>
						<option>Quarter to date: </option>
						<option>Year to date: </option>
						<option>Custom</option>
					</select>
					<select className="px-2 bg-zinc-100 rounded py-0.5 shadow border">
						<option>All</option>
						<option>Income</option>
						<option>Expense</option>
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
										Transaction ID / Date
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										description
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										payee/from
									</th>
									<th scope="col" className=" px-3 py-2 text-left">
										Category
									</th>
									<th scope="col" className=" px-2 py-2 text-left">
										Amount
									</th>
									<th scope="col" className=""></th>
								</tr>
							</thead>
							<tbody className="text-sm font-medium capitalize">
								{entries.map((e, i) => (
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
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 p-4">
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create new entry
					</Typography>

					<form onSubmit={setEntry}>
						<div className="flex space-x-4 mt-4">
							<div className="w-1/2">
								<label
									htmlFor="description"
									className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Description
								</label>
								<input
									onChange={(e) => setDescription(e.target.value)}
									type="text"
									id="description"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div className="w-1/2">
								<label
									htmlFor="payee"
									className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Payee/From
								</label>
								<input
									onChange={(e) => setPayee(e.target.value)}
									type="text"
									id="payee"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
							</div>
						</div>
						<div className="flex space-x-4 mt-4">
							<div className="w-1/2">
								<label
									htmlFor="category"
									className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Category
								</label>
								<select
									onChange={(e) => setCategory(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option>select category</option>
									<option>rent payment</option>
									<option>loan payment</option>
									<option>salary</option>
									<option>sales</option>
									<option>maintainance</option>
									<option>receivables</option>
									<option>payables</option>
								</select>
							</div>
							<div className="w-1/2">
								<label
									htmlFor="payee"
									className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Amount
								</label>
								<input
									onChange={(e) => setAmount(e.target.value)}
									type="text"
									id="amount"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
							</div>
						</div>
						<button
							type="submit"
							className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Submit
						</button>
					</form>
				</div>
			</Modal>
		</Layout>
	);
};

export default Finances;
