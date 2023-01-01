import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db, storage } from "../../utils/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Inventory = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm({
		shouldUseNativeValidation: true,
	});
	const [products, setProducts] = useState([]);
	const [cat, setCat] = useState([]);
	const [newProd, setNew] = useState(false);
	const [ordered, setOrderBy] = useState("title");
	const [imageUrl, setImageUrl] = useState("");
	const productCollectionRef = query(collection(db, "products"));
	const categoryCollectionRef = query(collection(db, "Categories"));
	useEffect(() => {
		const getDocData = async () => {
			const MenuSnap = await getDocs(productCollectionRef);
			const menuArray = MenuSnap.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProducts(menuArray);
		};
		const getCatData = async () => {
			const CatSnap = await getDocs(categoryCollectionRef);
			const catArray = CatSnap.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setCat(catArray);
		};
		getCatData();
		getDocData();
	}, []);

	const deleteProduct = async (e) => {
		console.log(e);
		await deleteDoc(doc(db, "products", e));
		router.reload(window.location.pathname);
	};
	const onFormSubmit = ({
		img,
		title,
		pType,
		calories,
		protein,
		fats,
		carb,
		category,
		description,
		price,
	}) => {
		console.log({
			img,
			title,
			pType,
			calories,
			protein,
			fats,
			carb,
			category,
			description,
			price,
		});
		let imageUpload = img[0];
		try {
			const uploadImg = async () => {
				const imageRef = ref(storage, `products/${imageUpload.name}`);
				uploadBytes(imageRef, imageUpload).then((snapshot) => {
					console.log("Uploaded a blob or file!");

					getDownloadURL(snapshot.ref)
						.then((url) => {
							setImageUrl(url);
							pushDocs(url);
						})
						.catch((error) => {
							// Handle any errors
							alert(error.message);
						});
				});
			};

			const pushDocs = async (url) => {
				await addDoc(collection(db, "products"), {
					title: title,
					slug: title
						.toLowerCase()
						.replace(/ /g, "-")
						.replace(/[^\w-]+/g, ""),
					categoryId: category,

					description: description,
					img: url,
					availability: 0,
					price: price,
					pType: pType,
					macros: {
						calories,
						fats,
						protein,
						carb,
					},
				})
					.then((docRef) => {
						router.reload(window.location.pathname);
					})
					.catch((error) => {
						alert(error.message);
					});
			};
			// pushDocs();
			uploadImg();
		} catch (error) {
			console.log(error);
		}
	};
	const onErrors = (errors) => console.error(errors);
	return (
		<Layout title="Inventory">
			<div className="flex items-center justify-between py-6">
				<h1 className="font-bold text-3xl ">Inventory Items</h1>
				<button
					type="button"
					onClick={() => setNew(true)}
					className="px-4 py-2 rounded-2xl bg-black text-white"
				>
					Create Product
				</button>
			</div>
			<div className="py-8 px-2">
				<div></div>
			</div>

			<div className={`${!newProd ? "hidden" : ""} w-full mb-6`}>
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
										htmlFor="title"
										className="block text-sm font-medium text-gray-700"
									>
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										{...register("title")}
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
										type="number"
										id=" calories"
										{...register("calories")}
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
									<input
										type="number"
										name="protein"
										id="protein"
										{...register("protein")}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div className="col-span-1">
									<label
										htmlFor="carb"
										className="block text-sm font-medium text-gray-700"
									>
										Carbs
									</label>
									<input
										type="number"
										id="carb"
										{...register("carb")}
										autoComplete="street-address"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div className="col-span-1">
									<label
										htmlFor="fats"
										className="block text-sm font-medium text-gray-700"
									>
										Fats
									</label>
									<input
										type="number"
										id="fats"
										{...register("fats")}
										autoComplete="street-address"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div className="col-span-1">
									<label
										htmlFor="carb"
										className="block text-sm font-medium text-gray-700"
									>
										size
									</label>
									<input
										type="number"
										id="size"
										{...register("size")}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div className="col-span-1">
									<label
										htmlFor="fats"
										className="block text-sm font-medium text-gray-700"
									>
										units
									</label>
									<select
										id="units"
										{...register("size_unit")}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										<option>ml</option>
										<option>oz</option>
										<option>lb</option>
									</select>
								</div>{" "}
								<div className="col-span-3">
									<label
										htmlFor="price"
										className="block text-sm font-medium text-gray-700"
									>
										Price
									</label>
									<input
										type="number"
										id="price"
										{...register("price", {
											required: "Please enter your street name/ community.",
										})}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div className="col-span-3">
									<label
										htmlFor="price"
										className="block text-sm font-medium text-gray-700"
									>
										Categories
									</label>
									<select
										id="price"
										{...register("category", {
											required: "Please enter your street name/ community.",
										})}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										{cat.map((x, i) => (
											<option value={x.id} key={i}>
												{x.title}
											</option>
										))}
									</select>
								</div>
								<div className="col-span-3">
									<label
										htmlFor="pType"
										className="block text-sm font-medium text-gray-700"
									>
										pType
									</label>
									<select
										id="pType"
										{...register("pType", {
											required: "Please enter your street name/ community.",
										})}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										<option>vegan</option>
										<option>chicken</option>
										<option>fish</option>
									</select>
								</div>
							</div>

							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700"
								>
									description
								</label>
								<div className="mt-1">
									<textarea
										id="description"
										{...register("description")}
										rows={3}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										placeholder="tell us a little about you"
									/>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 text-right sm:px-6 space-x-4 flex justify-end">
							<button
								type="button"
								onClick={() => setNew(false)}
								className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Close
							</button>
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

			{products.map((x, i) => (
				<div key={i} className="w-full flex space-x-3 items-center ">
					<div>{i}</div>
					<div className="w-full p-4 border mb-2 flex justify-between items-center">
						<div> {x.title}</div>
						<div> {x.price}</div>
						<div> {x.pType}</div>
						<div>
							{" "}
							{x.size}
							{x.size_unit}
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
		</Layout>
	);
};

export default Inventory;
