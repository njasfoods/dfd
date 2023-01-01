import Link from "next/link";
import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import StarsIcon from "@mui/icons-material/Stars";
import StoreIcon from "@mui/icons-material/Store";
import SpaIcon from "@mui/icons-material/Spa";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BadgeIcon from "@mui/icons-material/Badge";
import TaskIcon from "@mui/icons-material/Task";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BlenderIcon from '@mui/icons-material/Blender';
<<<<<<< HEAD
import MenuBookIcon from '@mui/icons-material/MenuBook';
=======
>>>>>>> 0dd51c307f408d3d316f39aa59d8df3247144d12

const adminLayer = [
	{
		title: "Dashboard",
		link: "/",
		icon: (
			<DashboardIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Finances",
		link: "/finance",
		icon: (
			<AccountBalanceIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
<<<<<<< HEAD
		title: "Menu",
		link: "/menu",
		icon: (
			<MenuBookIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
=======
>>>>>>> 0dd51c307f408d3d316f39aa59d8df3247144d12
		title: "Inventory",
		link: "/inventory",
		icon: (
			<InventoryIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	
	{
		title: "Recipes",
		link: "/recipes",
		icon: (
			<BlenderIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Calendar",
		link: "/calendar",
		icon: (
			<CalendarMonthIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Tasks",
		link: "/tasks",
		icon: (
			<TaskIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	// {
	// 	title: "Suppliers",
	// 	link: "/suppliers",
	// },

	// {
	// 	title: "Marketing",
	// 	link: "/marketing",
	// },
	{
		title: "Employees",
		link: "/employees",
		icon: (
			<BadgeIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
];
const ecommerce = [
	{
		title: "Orders",
		link: "/orders",
		icon: (
			<StoreIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Users",
		link: "/users",
		icon: (
			<SupervisedUserCircleIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Health",
		link: "/health",
		icon: (
			<SpaIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Feedback",
		link: "/feedback",
		icon: (
			<FeedbackIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Specials",
		link: "/specials",
		icon: (
			<StarsIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
	{
		title: "Coupons",
		link: "/coupons",
		icon: (
			<ConfirmationNumberIcon
				fontSize="small"
				sx={{ color: "lightgray", marginRight: "6px" }}
			/>
		),
	},
];

const Sidebar = () => {
	return (
		<nav aria-label="alternative nav ">
			<div className=" flex flex-col text-white space-y-6 pl-6 pt-4 shadow-xl h-20 fixed bottom-0  md:h-screen z-10 w-full md:w-48 bg-slate-800">
				<h2 className="text-2xl font-bold ">NJAS Admin</h2>
				<div className="flex flex-col space-y-2">
					<h3 className="text-lg font-medium">Admin Layer</h3>
					<ul className="text-[15px] flex flex-col space-y-2">
						{adminLayer.map((list, i) => (
							<li key={i}>
								<Link href={list.link} passHref>
									<a className="hover:border-b-2 p-1 w-full">
										{" "}
										{list.icon}
										{list.title}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col space-y-2">
					<h3 className="text-lg font-medium">Customers</h3>
					<ul className="text-[15px] flex flex-col space-y-2">
						{ecommerce.map((list, i) => (
							<li key={i}>
								<Link href={list.link} passHref>
									<a className="hover:border-b-2 p-1 w-full">
										{list.icon}
										{list.title}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Sidebar;
