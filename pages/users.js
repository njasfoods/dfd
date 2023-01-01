import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../utils/firebase";

const Users = () => {
	const [users, setUsers] = useState([]);
	const userCollectionRef = collection(db, "User");

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollectionRef);
			setUsers(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};
		getUsers();
	}, []);
	console.log(users);
	return (
		<Layout title="Users">
			<div className="overflow-x-auto relative">
				<div className="py-12 px-2">
					<button className="w-28 h-12 bg-gray-100 rounded-md hover:bg-orange-300">
						Create User
					</button>
				</div>
				<table className="table-auto w-full text-base text-left text-gray-900">
					<thead className="text-sm text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="py-3 px-6">
								First Name
							</th>
							<th scope="col" className="py-3 px-6">
								Last Name
							</th>
							<th scope="col" className="py-3 px-6">
								Contact
							</th>
							<th scope="col" className="py-3 px-6">
								Email
							</th>
							<th scope="col" className="py-3 px-6">
								Address
							</th>
							{/* <th scope="col" className="py-3 px-6">
								Allergies
							</th> */}
							<th scope="col" className="py-3 px-6">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, i) => (
							<tr className="bg-white border-b" key={i}>
								<th
									scope="row"
									className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
								>
									{user.fName}
								</th>
								<td className="py-4 px-6">{user.lName}</td>
								<td className="py-4 px-6">
									{user.contact.primary
										? user.contact.primary
										: user.contact.secondary}
								</td>
								<td className="py-4 px-6">{user.email}</td>

								<td className="py-4 px-6">
									{user.shippingAddress.street}<br />
									{user.shippingAddress.parish}
								</td>
								{/* <td className="py-4 px-6">{user.BioData.allergies}</td> */}
								<td className="py-4 px-6  items-center  justify-center flex space-x-2 text-white font-medium font-serif">
									<button className="w-16 h-8 rounded-md bg-blue-500">
										{" "}
										edit
									</button>{" "}
									<button className="w-16 h-8 rounded-md bg-red-500">
										delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default Users;
