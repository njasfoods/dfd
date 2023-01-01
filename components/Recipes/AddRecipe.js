import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

//fire base
import { db, storage } from "../../utils/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import {
	Autocomplete,
	Input,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function AddRecipe() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [ingredientList, setIngredientList] = useState([{ ingredient: "" }]);

	const recipeRef = collection(db, "Recipes");
	const productRef = collection(db, "Products");
	const categoriesCollection = query(collection(db, "RecipeCategories"));
	useEffect(() => {
		const getCategory = async () => {
			const categoryData = await getDocs(categoriesCollection);
			const c = categoryData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setCategories(c);
		};
		const getProducts = async () => {
			const productData = await getDocs(productRef);
			const c = productData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProducts(c);
		};
		getCategory();
		getProducts();
	}, []);
	const router = useRouter();
	const { handleSubmit, control } = useForm();
	const onError = (errors, e) => console.log("the errors", errors, e);
	const submitHandler = ({
		title,
		category,
		description,
		featuredImg,
		isMealPlan,
		size1,
		price1,
		calories1,
		size2,
		price2,
		calories2,
	}) => {
		try {
			const uploadImg = async () => {
				const imageRef = await ref(storage, `products/${imageUpload.name}`);
				uploadBytes(imageRef, imageUpload).then((snapshot) => {
					console.log("Uploaded a blob or file!");

					getDownloadURL(snapshot.ref)
						.then((url) => {
							setImageUrl(url);
							pushDocs(url);
						})
						.catch((error) => {
							// Handle any errors
						});
				});
			};

			const pushDocs = async (url) => {
				await addDoc(productRef, {
					title: title,
					slug: title
						.toLowerCase()
						.replace(/ /g, "-")
						.replace(/[^\w-]+/g, ""),
					categoriesId: category,

					description: description,
					img: url,
					isFeatured: featuredImg,
					isMealPlan: isMealPlan,
					availability: 0,
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
						router.reload(window.location.pathname);
					})
					.catch((error) => {
						alert(error.message);
					});
			};
			uploadImg();
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddIngredients = () => {
		setIngredientList([...ingredientList, { ingredient: "" }]);
	};
	const handleRemoveIngredients = (i) => {
		let list = [...ingredientList];
		console.log(list, i, typeof i);
		list.splice(i, 1);
		setIngredientList(list);
	};
	return (
		<div className="bg-white shadow  sm:rounded-lg w-full ">
			<form onSubmit={handleSubmit(submitHandler, onError)}>
				<div className="border-t border-gray-200 px-6 py-4">
					<div className="grid grid-cols-2 gap-x-4">
						<div className="">
							<div className="">
								<div className="text-sm font-medium text-gray-500">
									Recipe Name
								</div>
								<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<Controller
										name="title"
										defaultValue=""
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
										defaultValue=""
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
							<div className="mt-6">
								<div className="text-sm font-medium text-gray-500 mb-4">
									Ingredients
								</div>
								<div className="flex flex-col space-y-3">
									{ingredientList.map((x, i) => (
										<div key={i}>
											<div className="text-sm text-gray-900 sm:mt-0 flex space-x-2">
												<div className="w-2/4">
													<Controller
														name="ingredients"
														defaultValue={[]}
														control={control}
														rules={{
															required: true,
															minLength: 2,
														}}
														render={({ field: { onChange } }) => (
															<Select
																labelId="demo-simple-select-label"
																id="demo-simple-select"
																label="Age"
																onChange={onChange}
															>
																{products.map((x, i) => (
																	<MenuItem key={i} value={x.title}>
																		{x.title}
																	</MenuItem>
																))}
															</Select>
														)}
													/>
												</div>
												<div className="w-1/4">
													<Controller
														name="amount"
														defaultValue=""
														control={control}
														rules={{
															required: true,
															minLength: 2,
														}}
														render={({ field }) => (
															<TextField
																id="outlined-number"
																label="amount"
																type="number"
																InputLabelProps={{
																	shrink: true,
																}}
															/>
														)}
													/>
												</div>
												{ingredientList.length > 1 && (
													<div className="flex justify-center items-center w-1/4">
														<button
															type="button"
															onClick={() => handleRemoveIngredients(i)}
															className="rounded-full text-white bg-gray-300"
														>
															<RemoveIcon />
														</button>
													</div>
												)}
											</div>
											{ingredientList.length - 1 === i && (
												<div className="mt-4">
													<button
														type="button"
														onClick={handleAddIngredients}
														className="rounded-full text-white bg-gray-300 px-2"
													>
														Add <AddIcon />
													</button>
												</div>
											)}
										</div>
									))}
								</div>
							</div>

							<div className="mt-6">
								<div className="text-sm font-medium text-gray-500">
									Description
								</div>
								<Controller
									name="description"
									defaultValue=""
									control={control}
									rules={{
										required: true,
										minLength: 2,
									}}
									render={({ field }) => (
										<textarea
											id="description"
											{...field}
											className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-24"
										></textarea>
									)}
								/>
							</div>
						</div>
						<div className="px-2">
							<div className="">
								<div className="text-sm font-medium text-gray-500">
									Instructions
								</div>
								<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<Controller
										name="instructions"
										defaultValue=""
										control={control}
										rules={{
											required: true,
											minLength: 2,
										}}
										render={({ field }) => (
											<textarea
												id="instuctions"
												{...field}
												className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-24"
											></textarea>
										)}
									/>
								</div>
							</div>
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

							<div className="mt-6 flex space-x-3 justify-evenly">
								<button
									type="submit"
									className="bg-gray-800 border border-gray-600 text-white w-1/3 h-12 rounded-md"
								>
									Add Product
								</button>
								<button className="border border-gray-600 w-1/3 h-12 rounded-md">
									Save Product
								</button>
								<button className="border border-gray-300 text-gray-300 w-1/3 h-12 rounded-md">
									Schedule
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
