import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";

const Excel = () => {
	const [test, setTest] = useState("");
	const { register, handleSubmit } = useForm();

	const excel = async (data) => {
		const response = await fetch("/api/excelOutput", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
	return (
		<Layout>
			<form onSubmit={handleSubmit(excel)}>
				<input placeholder="Enter your message" {...register("test")} />
				<input placeholder="Enter your message" {...register("message")} />
				<button>Submit</button>
			</form>
		</Layout>
	);
};

export default Excel;
