import { google } from "googleapis";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).send({ message: "Only POST requests are allowed" });
	}
	const { test,message } = req.body;
	const pK =
		"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRE97eayfEY8a4\n0NzhoY3CvOkjL3gRIGHefhz39RsCIyDj5tXXqPCgkk9yx5NLJ3BjBx5GAqgRlKT6\nENP9+bax38ehsy/YON2KMw5YsGO1CvaMPbm67yUGBzS9pddUngGQf6FU/B3bEV1k\nRswjwvAkgxbLKBhcSdTIRmEl7BCfNmME7OpfTreUOkCMuF1aUpGG/h/tXm3o5HPw\nBdRfW9qXoSgYchBNLY18nyRr2ns3Qq7/wwG1tuaOeYT/k7fhdt5xAjmLgnB6W7vc\nrz0bzIQn5nTL2BUGINJkNDX0ACOIATnneYP/qou1UEjrY6niQDMEC50veiq0cI+r\nPk1cW9nJAgMBAAECggEAHV2yHwFj+4ScI9dKPvLHC4QnJscDETzAIlUKUpV9rqYq\nd3gzru/OpG8Ic7GucY7fjTkxulmjK5z6Mxlr/S82xvMMghy96pvKGiAjsrdLueEJ\nUhdVX/k49QjMEpsZjIwI4jfa/CnRM7TTrkL3Z0p5GlfDOtOt4ECKf3rLKF1o1EO5\nSlFvbg8kJ+sSbcLRbgbmlmgVmiiqpfmWLCubt7WYAC+vAXn5pEqpovnw7y5melTh\npwQ/1ELcT5vlTTGO6k9pePOCaPcs3JDI+l6iVN5oDP9zgym8fV+X1rTnKPaFli9A\nMsAZmh8OPdbEenl4y0+DSycKpN0g7OFqHNdq4yZqEQKBgQDv4rShbX0YIyo6D7h6\nCKKjIZN5A8Mntqka8V1qK4ZsKcXB/yyQ+3CIPS6eqkYofV4idfpaMGvbRZgwFva0\nr73PZDQwBenXRDAKPquda7fMxCLa2BaxH7UmlmP1tNk0i6v0tDl+i4z/53AJ7X9e\nx8jkMy/OIXZTTlFMIDuJHvUMBQKBgQDfH1zrQ3S6aqjkggbHn6j2HnrdlQahQmIq\n6zI/yCs1XfxZd9RNq1Y7rxWjgrCBUSWLLaYW8e5yCH33LuVDKcKFQ60nkoMMvt8W\nWCLO5Zi1oFmnurVNV6MCUMhUG4HcMZFb8xT1yjMsRsUfHRjZQFYHdlMYgZNvcPV9\n8F33XlJF9QKBgDAUAN3lws+mpJz0b6XNu0L0xMjZTzDTdDsZKv7PcGaXTLJgAT+h\nlWFI2eIlAGC3F7nSaXXQBJ3y6dihkZqPKny5eZgyZzakzPgQrXakkzbwDIhODOY9\nE6KDO8+QCoR0hedKg8dwErdrXFIxDnkhk4rhE3C91ihGJxcZ0rTdxoE9AoGAOq/v\nKtqFW3sujVw+GEfAk2wU+S93nPbvB0bx4qDt7I2aEJZaO0uz1OMKmAWKE5mafG83\nXpWoGEpvh5LILtBPH+pbIyuAWNvjpebs0OrHLg7NRjbv9TX15GgHKUhK8fX/u+XG\nP5g9uYmr07E9lfc8KZ5P4QREGW3mxIdyz9v5W/kCgYAjuydEF7YHZ7CHaCsBqRSS\n0MW8HvP5/ZBZCTrD3vXUPy2kPW9RFVlkvVA5J+KaXOY/bVO9QMJmWOaD9pYKYa3y\nY/h2Oje9jkFmZqRGJPgr7+ciGk81CwmXHQnsIxy2iQvqWKiC3gX+AlBw//AKVw0M\nm2GSW4jWa5RaOJLHnEIrig==\n-----END PRIVATE KEY-----\n";
	try {
		const auth = new google.auth.GoogleAuth({
			credentials: {
				private_key: pK.replace(/\\n/g, "\n"),
				client_email: "njas-ca677@appspot.gserviceaccount.com",
				client_id: "116544875756389391096",
			},
			scopes: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/drive.file",
				"https://www.googleapis.com/auth/spreadsheets",
			],
		});
		const sheets = google.sheets({
			auth,
			version: "v4",
		});
		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: "1Ztom_Z1d4lm6-vjtLZuNC4VXs2g4VCXmxj5rdhQ9oGw",
			range: "A1:D1",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [[test, message]],
			},
		});
		console.log(response.data);
		res
			.status(201)
			.json({ response, result: "Feedback posted to spreadsheet!" });
	} catch (e) {
		// try {
		// 	const auth = new google.auth.GoogleAuth({
		// 		credentials: {
		// 			client_email,
		// 		},
		// 	});
		console.log(e.message);
	}
}
