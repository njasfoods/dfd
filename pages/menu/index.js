import { collection, getDocs, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../utils/firebase";
import { useForm } from "react-hook-form";

const Menu = () => {
	const { register, handleSubmit } = useForm({
		shouldUseNativeValidation: true,
	});
	const [menu, setMenu] = useState([]);
	const [selectDay, setSelectedDay] = useState(new Date());
	const menuCollection = query(collection(db, "menu"));
	useEffect(() => {
		const getDocData = async () => {
			const MenuSnap = await getDocs(menuCollection);
			const menuArray = MenuSnap.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMenu(menuArray);
		};
		getDocData();
	}, []);
	console.log(menu);
	const onFormSubmit = (errors) => console.error(errors);
	const onErrors = (errors) => console.error(errors);
	return (
		<Layout>
			<div className="py-16">
				<div className="flex justify-between py-8">
					<div></div>
					<div>
						<button className="py-2 px-4 bg-blue-500">New recipe</button>
					</div>
				</div>
				<div className="w-full ">
					<form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
						<div className="shadow sm:overflow-hidden sm:rounded-md">
							<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-8 gap-6">
									<div className="col-span-4 ">
										<label
											htmlFor="first-name"
											className="block text-sm font-medium text-gray-700"
										>
											Image
										</label>
										<input
											type="file"
											name="img"
											id="imge"
											{...register("img")}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="col-span-4 ">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium text-gray-700"
										>
											Name
										</label>
										<input
											type="text"
											name="last-name"
											id="last-name"
											{...register("lName", {
												required: "Please enter your last name.",
											})}
											autoComplete="family-name"
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="col-span-4">
										<label
											htmlFor="email-address"
											className="block text-sm font-medium text-gray-700"
										>
											Vegetables
										</label>
										<input
											type="text"
											name="primaryContact"
											id="primaryContact"
											{...register("primaryContact", {
												required: "Please enter your primary mode of contact.",
											})}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="col-span-4">
										<label
											htmlFor="email-address"
											className="block text-sm font-medium text-gray-400"
										>
											Sides
										</label>
										<input
											type="text"
											name="secondaryContact"
											id="secondaryContact"
											{...register("secondaryContact")}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="col-span-6 sm:col-span-1">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											calories
										</label>
										<input
											type="text"
											name="street-address"
											id="street-address"
											{...register("street", {
												required: "Please enter your street name/ community.",
											})}
											autoComplete="street-address"
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="col-span-1">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											Protein
										</label>
										<select
											name="parish"
											id="parish"
											{...register("parish", {
												required: "Please select a parish",
											})}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										>
											<option>Kingston</option>
											<option>St Catherine</option>
											<option>St Ann</option>
										</select>
									</div>
									<div className="col-span-1">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											Carbs
										</label>
										<select
											name="parish"
											id="parish"
											{...register("parish", {
												required: "Please select a parish",
											})}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										>
											<option>Kingston</option>
											<option>St Catherine</option>
											<option>St Ann</option>
										</select>
									</div>
									<div className="col-span-1">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											Fats
										</label>
										<select
											name="parish"
											id="parish"
											{...register("parish", {
												required: "Please select a parish",
											})}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										>
											<option>Kingston</option>
											<option>St Catherine</option>
											<option>St Ann</option>
										</select>
									</div>{" "}
									<div className="col-span-3">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											Price
										</label>
										<select
											name="parish"
											id="parish"
											{...register("parish", {
												required: "Please select a parish",
											})}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										>
											<option>Kingston</option>
											<option>St Catherine</option>
											<option>St Ann</option>
										</select>
									</div>
									<div className="col-span-1">
										<label className="inline-flex relative items-center cursor-pointer">
											<input
												type="checkbox"
												value="fish"
												className="sr-only peer"
												checked
												// onChange={(x) => setFilterFirst(x.target.value)}
											/>
											<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										</label>
									</div>
								</div>

								<div>
									<label
										htmlFor="about"
										className="block text-sm font-medium text-gray-700"
									>
										notes
									</label>
									<div className="mt-1">
										<textarea
											id="about"
											name="about"
											{...register("about")}
											rows={3}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="tell us a little about you"
										/>
									</div>
								</div>

								{/* <div>
							<label className="block text-sm font-medium text-gray-700">
								Photo
							</label>
							<div className="mt-1 flex items-center">
								<span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
									<svg
										className="h-full w-full text-gray-300"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								</span>
								<input
									className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									type="file"
									// onChange={(files) =>
									// 	console.log(files.target.files, "clg tagers")
									// }
									{...register("photo")}
								/>
							</div>
						</div> */}
							</div>
							<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
								<button
									type="submit"
									className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Save
								</button>
							</div>
						</div>
					</form>
				</div>
				{menu.map((x, i) => (
					<div key={i} className="w-full flex space-x-3 items-center">
						<div>{i}</div>
						<div className="w-full p-4 border mb-2 flex justify-between items-center">
							<div> {x.name}</div>
							<div> {x.green}</div>
							<div> {x.side}</div>
							<div className="mt-3 rounded-md shadow-sm">
								<ReactDatePicker
									selected={selectDay}
									onChange={(date) => setSelectedDay(date.setHours(0, 0, 0, 0))}
									className=" py-2 px-3 rounded-md  border w-full border-gray-300  sm:text-sm "
									placeholderText="Select a date"
								/>
							</div>
							<div>
								<label className="inline-flex relative items-center cursor-pointer">
									<input
										type="checkbox"
										value="fish"
										className="sr-only peer"
										checked={x.on}
										// onChange={(x) => setFilterFirst(x.target.value)}
									/>
									<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Menu;
