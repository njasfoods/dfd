import mail from "@sendgrid/mail";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../utils/firebase";

mail.setApiKey(process.env.NEXT_PUBLIC_INVOICE_EMAIL);

const Invoice = async (req, res) => {
	const body = JSON.parse(req.body);
	const shippingAddress = body.shippingAddress;
	const customer = body.customer;
	const fullName = customer.fName + " " + customer.lName;

	const bankRef = doc(db, "Bank details", "oggArP6cXACNNW3vV1UM");
	const docSnap = await getDoc(bankRef);
	let bankDetails = {};
	if (docSnap.exists()) {
		bankDetails = docSnap.data();
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}

	const timeStamp = new Date();
	const orderPlans = body.orderItems.filter((x) => x.cat === "mealPlan");

	const orderItems = body.orderItems.filter((x) => x.cat === "shop");

	try {
		await mail.send({
			to: customer.email,
			from: "noreply@notjustasalad.com",
			subject: `Your order is confirmed! Here is your invoice`,

			html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html lang="en" xmlns="http://wwww.w3.org/1999/xhtml">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
			
					<title>Not Jus A Salad Invoice</title>
			
					<!-- Favicon -->
					<link rel="icon" href="./images/favicon.png" type="image/x-icon" />
			
					<!-- Invoice styling -->
					<style>
						body {
							font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
							text-align: center;
							color: #777;
						}
			
						body h1 {
							font-weight: 300;
							margin-bottom: 0px;
							padding-bottom: 0px;
							color: #000;
						}
			
						body h3 {
							font-weight: 300;
							margin-top: 10px;
							margin-bottom: 20px;
							font-style: italic;
							color: #555;
						}
			
						body a {
							color: #06f;
						}
			
						.invoice-box {
							max-width: 800px;
							margin: auto;
							padding: 30px;
							border: 1px solid #eee;
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
							font-size: 16px;
							line-height: 24px;
							font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
							color: #555;
						}
			
						.invoice-box table {
							width: 100%;
							line-height: inherit;
							text-align: left;
							border-collapse: collapse;
						}
						.invoice-box .userDetails {
							text-transform: capitalize
						}
			
						.invoice-box table td {
							padding: 5px;
							vertical-align: top;
						}
			
						.invoice-box table tr td:nth-child(2) {
							text-align: right;
						}
			
						.invoice-box table tr.top table td {
							padding-bottom: 20px;
						}
			
						.invoice-box table tr.top table td.title {
							font-size: 45px;
							line-height: 45px;
							color: #333;
						}
			
						.invoice-box table tr.information table td {
							padding-bottom: 40px;
						}
						.invoice-box table tr.heading {
							margin-top:16px;
						}
						.invoice-box table tr.heading td {
							background: #eee;
							border-bottom: 1px solid #ddd;
							font-weight: bold;
						}
			
						.invoice-box table tr.details td {
							padding-bottom: 20px;
						}
			
						.invoice-box table tr.item td {
							border-bottom: 1px solid #eee;
						}
			
						.invoice-box table tr.item.last td {
							border-bottom: none;
						}
			
						.invoice-box table tr.total {
							border-top: 2px solid #eee;
							font-weight: bold;
							font-size:14px;
						}
			
						@media only screen and (max-width: 600px) {
							.invoice-box table tr.top table td {
								width: 100%;
								display: block;
								text-align: center;
							}
			
							.invoice-box table tr.information table td {
								width: 100%;
								display: block;
								text-align: center;
							}
						}
					</style>
				</head>
			
				<body>
					<h1>NJAS Foods Ltd Invoice Summary</h1>
					<h3>Hope to see you again soon!</h3>
			
					<div class="invoice-box">
						<table>
							<tr class="top">
								<td colspan="2">
									<table>
										<tr>
											
			
											<td>Created: ${timeStamp.toDateString()}</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr class="information">
								<td colspan="2">
									<table>
										<tr>
											<td>
												NJAS Foods Limited<br />
												Shop #5, UTECH Activity Center<br />
												237,6 Old Hope Rd, Kingston
											</td>
			
											
										</tr>
									</table>
								</td>
							</tr>
							<tr class="userDetail">
								<td colspan="2">
									<table>
									<tr>	<td>${customer.fName ? fullName : customer.displayName}</td>
									</tr>
										<tr>
										<td>
										${shippingAddress.address}<br />
										${shippingAddress.parish}	<br />
										${shippingAddress.primaryContact}
										
									</td>
										</tr>
									</table>
								</td>
							</tr>
			
							
			
							<tr class="heading">
								<td>Payment Method</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						
			
							<tr class="details">
								<td>${shippingAddress.paymentMethod}</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
			${
				orderPlans.length === 0
					? ""
					: `<tr class="heading">
								<td>Item</td>
			
								<td>Size</td>
								<td>Treat/Sides</td>
								<td>Date</td>
								<td>Price</td>
							</tr>`
			}
							${orderPlans.map(
								(x, i) => `
								<tr key=${i} class="item">
									<td>${x.title}</td>
									<td>${x.variant[x.productSize].size}</td>
									<td>${x.treat}, ${x.side}</td>
									<td>${x.stringDate}</td>
									<td>$ ${x.mealPlanPrice}</td>
								</tr>
							`
							)}
							${
								orderItems.length === 0
									? ""
									: `<tr class="heading">
								<td>Item</td>
			
								<td>Size</td>
								<td>Quantity</td>
								<td>Unit</td>
								<td>Total Price</td>
							</tr>`
							}
							${orderItems.map(
								(x, i) => `
								<tr key=${i} class="item">
									<td>${x.title}</td>
									<td>${x.variant[x.productSize].size}</td>
									<td>${x.quantity}</td>
									<td>$ ${x.variant[x.productSize].price}</td>
									<td>$ ${x.variant[x.productSize].price * x.quantity}</td>
								</tr>
							`
							)}
							
			
							<tr class="total">
								<td></td>
								<td></td>
								<td></td>
								<td>Subtotal: </td>
			
								
								<td>$${body.itemsPrice}</td>
							</tr>
							<tr class="total">
								<td></td>
								<td></td>
								<td></td>
								<td>Shipping: </td>
			
								
								<td>$${body.shippingPrice}</td>
							</tr>
							<tr class="total">
								<td></td>
								<td></td>
								<td></td>
								<td>Total: </td>
			
								
								<td>$${body.totalPrice}</td>
							</tr>
						</table>'
						
						${
							orderItems.length < 1
								? ""
								: `<div> Shop delivery date: 
						${shippingAddress.deliveryDate}
						</div><br/>`
						}	

						<div>Bank Name: ${bankDetails.bank}<br/>
						Account Name: ${bankDetails.name}<br/>
						Account Number: ${bankDetails.number}<br/>
						Branch: ${bankDetails.branch}<br/>
						Account Type: ${bankDetails.type}<br/>
</div>

						<div>			
${
	shippingAddress.deliveryInstructions === ""
		? ""
		: `<div> Delivery Instructions: 
${shippingAddress.deliveryInstructions}
</div>`
}
${
	shippingAddress.leaveAtGate === false
		? ""
		: `<div> 
If not there, leave at gate/securtity/reception
</div>`
}
						
					</div>
				</body>
			</html>
			`,
		});
	} catch (err) {
		await addDoc(collection(db, "Errors"), {
			user: customer,
			error: err,
		});
		return res.status(err.statusCode || 500).json({ err: err.message });
	}
	return res.status(200).json({ error: "" });
};

export default Invoice;
