
import React from "react";
import Layout from "../../components/Layout";
import AddRecipe from "../../components/Recipes/AddRecipe";

const RecipeCreate = () => {
	return (
		<Layout title="Create Product">
            	<div className="flex items-center justify-between py-6">
					<h1 className="font-bold text-3xl ">Create A Recipe</h1>
					
				</div>
			<AddRecipe />
		</Layout>
	);
};



export default RecipeCreate;
