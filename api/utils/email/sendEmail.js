const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
	try {
		console.log("SEND EMAIL");
		console.log(process.env.EMAIL_USERNAME);
		console.log(process.env.EMAIL_PASSWORD);
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: 587,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
			},
		});

		const source = fs.readFileSync(path.join(__dirname, template), "utf8");
		const compiledTemplate = handlebars.compile(source);
		const options = () => {
			return {
				from: process.env.FROM_EMAIL,
				to: email,
				subject: subject,
				html: compiledTemplate(payload),
			};
		};

		// Send email
		const info = await transporter.sendMail(options());
		if (info) return true;
		else return false;
	} catch (error) {
		console.log(error);
		throw Error(error);
	}
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;
