/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

//fire base
import { db, storage } from "../../utils/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";

const Edit = (props) => {
	const { id, product, category } = props;
	const [categories, setCategories] = useState([]);

	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [status, setStatus] = useState("idle");

	const productRef = doc(db, "Products", id);
	const categoriesCollection = query(collection(db, "Categories"));
	useEffect(() => {
		const getCategory = async () => {
			const categoryData = await getDocs(categoriesCollection);
			const c = categoryData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setCategories(c);
		};
		getCategory();
	}, []);
	const router = useRouter();
	const { handleSubmit, control } = useForm();
	const onError = (errors, e) => console.log("the errors", errors, e);
	const submitHandler = ({
		title,
		category,
		description,
		isMealPlan,
		size1,
		price1,
		calories1,
		size2,
		price2,
		calories2,
	}) => {
		setStatus("loading");
		try {
			// const uploadImg = async () => {
			// 	const imageRef = await ref(storage, `products/${imageUpload.name}`);
			// 	uploadBytes(imageRef, imageUpload).then((snapshot) => {
			// 		console.log("Uploaded a blob or file!");

			// 		getDownloadURL(snapshot.ref)
			// 			.then((url) => {
			// 				setImageUrl(url);
			// 				pushDocs(url);
			// 			})
			// 			.catch((error) => {
			// 				// Handle any errors
			// 			});
			// 	});
			// };

			const pushDocs = async (url) => {
				await updateDoc(productRef, {
					title: title,
					slug: title
						.toLowerCase()
						.replace(/ /g, "-")
						.replace(/[^\w-]+/g, ""),
					categoriesId: category,

					description: description,

					isMealPlan: isMealPlan,
					variant: [
						{
							size: size1,
							price: parseInt(price1, 10),
							calories: parseInt(calories1, 10),
						},
						{
							size: size2,
							price: parseInt(price2, 10),
							calories: parseInt(calories2, 10),
						},
					],
				})
					.then((docRef) => {
						setStatus("completed");
						router.push("/inventory");
					})
					.catch((error) => {
						alert(error.message);
					});
			};
			// uploadImg();
			pushDocs();
		} catch (error) {
			console.log(error);
		}
	};

	const sizes = [
		{ title: "medium", id: 1 },
		{ title: "large", id: 2 },
		{ title: "lb", id: 3 },
		{ title: "10lbs", id: 4 },
		{ title: "oz", id: 5 },
		{ title: "box", id: 7 },
		{ title: "case", id: 8 },
		{ title: "1/4lb", id: 9 },
		{ title: "50lbs", id: 10 },
		{ title: "sprig", id: 11 },
		{ title: "doz", id: 12 },
		{ title: "single", id: 13 },
		{ title: "200ml", id: 14 },
		{ title: "250ml", id: 15 },
		{ title: "300ml", id: 16 },
		{ title: "355ml", id: 17 },
		{ title: "500ml", id: 18 },
		{ title: "l", id: 19 },
		{ title: "gal", id: 20 },
	];
	return (
		<Layout title="Edit User">
			<div className="bg-white shadow  sm:rounded-lg w-full ">
				<form onSubmit={handleSubmit(submitHandler, onError)}>
					<div className="border-t border-gray-200 px-6 py-4">
						<div className="grid grid-cols-2 gap-x-4">
							<div className="">
								<div className="">
									<div className="text-sm font-medium text-gray-500">
										Product Name
									</div>
									<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										<Controller
											name="title"
											defaultValue={product.title}
											control={control}
											rules={{
												required: true,
												minLength: 2,
											}}
											render={({ field }) => (
												<input
													id="title"
													{...field}
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												/>
											)}
										/>
									</div>
								</div>
								<div className="mt-6">
									<div className="text-sm font-medium text-gray-500">
										Category
									</div>
									<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										<Controller
											name="category"
											defaultValue={product.categoriesId}
											control={control}
											rules={{
												required: true,
												minLength: 2,
											}}
											render={({ field }) => (
												<select
													id="category"
													{...field}
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												>
													<option>select a category</option>
													{categories.map((category, i) => (
														<option value={category.id} key={category.id}>
															{category.title}
														</option>
													))}
												</select>
											)}
										/>
									</div>
								</div>

								<div className="flex mt-6 space-x-4">
									<div className="w-4/12">
										<h4 className="text-sm font-medium text-gray-500">Size</h4>
										<Controller
											name="size1"
											defaultValue={product.variant[0].size}
											control={control}
											rules={{
												required: true,
											}}
											render={({ field }) => (
												<select
													id="size1"
													{...field}
													className="text-gray-800 block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md dark:bg-gray-800  focus:outline-none focus:ring"
												>
													<option>select a size</option>
													{sizes.map((category, i) => (
														<option value={category.title} key={category.id}>
															{category.title}
														</option>
													))}
												</select>
											)}
										/>
									</div>
									<div className="w-3/12">
										<h4 className="text-sm font-medium text-gray-500">Price</h4>
										<Controller
											name="price1"
											defaultValue={product.variant[0].price}
											control={control}
											rules={{
												required: true,
												minLength: 2,
											}}
											render={({ field }) => (
												<input
													{...field}
													type="number"
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												/>
											)}
										/>
									</div>
									<div className="w-3/12">
										<h4 className="text-sm font-medium text-gray-500">
											Calories
										</h4>
										<Controller
											name="calories1"
											defaultValue={product.variant[0].calories}
											control={control}
											render={({ field }) => (
												<input
													autoFocus
													{...field}
													type="number"
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												/>
											)}
										/>
									</div>
									{/* <button
										onClick={() => setVariationRow([...variationRow, "new"])}
										className="w-1/12 p-2 bg-gray-200"
									>
										+
									</button> */}
								</div>
								{/* ))} */}
								{/* variatio area  */}
								{/* {variationRow.map((rows, i) => ( */}
								<div className="flex mt-6 space-x-4">
									{/* <button
										onClick={() =>
											setVariationRow([
												...variationRow.slice(0, 0),
												...variationRow.slice(1, variationRow.length),
											])
										}
										className="w-1/12 p-2 bg-gray-200"
									>
										-
									</button> */}
									<div className="w-4/12">
										<h4 className="text-sm font-medium text-gray-500">Size</h4>
										<Controller
											name="size2"
											defaultValue={product.variant[1].size}
											control={control}
											rules={{
												required: true,
											}}
											render={({ field }) => (
												<select
													{...field}
													className="text-gray-800 block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md dark:bg-gray-800  focus:outline-none focus:ring"
												>
													<option>select a size</option>
													{sizes.map((category, i) => (
														<option name={category.title} key={category.id}>
															{category.title}
														</option>
													))}
												</select>
											)}
										/>
									</div>
									<div className="w-3/12">
										<h4 className="text-sm font-medium text-gray-500">Price</h4>
										<Controller
											name="price2"
											defaultValue={product.variant[1].price}
											control={control}
											rules={{
												required: true,
											}}
											render={({ field }) => (
												<input
													{...field}
													type="number"
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												/>
											)}
										/>
									</div>
									<div className="w-3/12">
										<h4 className="text-sm font-medium text-gray-500">
											Calories
										</h4>
										<Controller
											name="calories2"
											defaultValue={product.variant[0].calories}
											control={control}
											render={({ field }) => (
												<input
													{...field}
													type="number"
													className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
												/>
											)}
										/>
									</div>
									{/* <button
										onClick={() => setVariationRow([...variationRow, "new"])}
										className="w-1/12 p-2 bg-gray-200"
									>
										+
									</button> */}
								</div>
								{/* ))} */}

								{/* ending of variation  */}
								<div className="mt-6">
									<div className="text-sm font-medium text-gray-500">
										Description
									</div>
									<Controller
										name="description"
										defaultValue={product.description}
										control={control}
										rules={{
											required: true,
											minLength: 2,
										}}
										render={({ field }) => (
											<textarea
												id="description"
												{...field}
												className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-48"
											></textarea>
										)}
									/>
								</div>
							</div>
							<div className="px-2">
								<div>
									<div className="text-sm font-medium text-gray-500">
										Product Images
									</div>
									<div className="flex justify-between text-xs w-full">
										<div className="border border-gray-400 border-dashed  rounded-md h-36 w-36 flex flex-col items-center justify-center">
											Featured Img{" "}
											<input
												className="block w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
												onChange={(e) => setImageUpload(e.target.files[0])}
												type="file"
											/>
										</div>
										{/* <div className="border border-gray-400 border-dashed  rounded-md h-36 w-36 flex flex-col items-center justify-center">
										Image 2
										<input className="sr" type="file" />
									</div>
									<div className="flex justify-center items-center w-36 group">
										<label
											htmlFor="dropzone-file"
											className="flex flex-col justify-center items-center h-36  rounded-lg border border-gray-300 border-dashed cursor-pointer  hover:bg-gray-100 "
										>
											<div className="flex flex-col justify-center items-center pt-5 pb-6 text-center">
												<svg
													aria-hidden="true"
													className="mb-3 w-10 h-10 text-gray-400 group-hover:text-gray-800"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
													></path>
												</svg>
												<p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
													<span className="font-semibold">Click to upload</span>{" "}
													or drag and drop
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													SVG, PNG, JPG or GIF (MAX. 800x400px)
												</p>
											</div>
											<input
												id="dropzone-file"
												type="file"
												className="hidden"
											/>
										</label>
									</div> */}
									</div>
								</div>
								<div className="py-6">
									<label
										htmlFor="default-toggle"
										className="inline-flex relative items-center cursor-pointer"
									>
										<Controller
											name="featuredImg"
											defaultValue={false}
											control={control}
											render={({ field: { value, onChange } }) => (
												<input
													value={value}
													onChange={onChange}
													type="checkbox"
													id="default-toggle"
													className="sr-only peer"
												/>
											)}
										/>

										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
											Is this a featured product?
										</span>
									</label>
								</div>
								<div className="py-6">
									<label
										htmlFor="mealPlanToggle"
										className="inline-flex relative items-center cursor-pointer"
									>
										<Controller
											name="isMealPlan"
											defaultValue={product.isMealPlan}
											control={control}
											render={({ field: { value, onChange } }) => (
												<input
													type="checkbox"
													value={value}
													onChange={onChange}
													id="mealPlanToggle"
													className="sr-only peer"
												/>
											)}
										/>

										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
											Will this be available for meal plans?
										</span>
									</label>
								</div>
								<div className="mt-6 flex space-x-3 justify-evenly">
									{status === "completed" ? (
										<button
											type="submit"
											className="bg-green-600 border border-green-600 text-white w-1/3 h-12 rounded-md"
										>
											Updated
										</button>
									) : status === "loading" ? (
										<button
											disabled
											className="bg-gray-800 flex justify-center items-center space-x-3 border border-gray-600 bg-opacity-80 text-white w-1/3 h-12 rounded-md"
										>
											<svg
												aria-hidden="true"
												className="w-5 h-5 text-gray-200 animate-spin fill-blue-800"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentFill"
												/>
											</svg>
											<span>Loading...</span>
										</button>
									) : (
										<button
											type="submit"
											className="bg-gray-800 border border-gray-600 text-white w-1/3 h-12 rounded-md"
										>
											Save
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const { id } = context.params;
	const docRef = doc(db, "Products", id);
	const product = await getDoc(docRef);
	const categoryRef = doc(db, "Categories", product.data().categoriesId);
	const category = await getDoc(categoryRef);

	return {
		props: {
			product: JSON.parse(JSON.stringify(product.data())),
			category: JSON.parse(JSON.stringify(category.data())),
			id: id,
		},
	};
}
export default Edit;
