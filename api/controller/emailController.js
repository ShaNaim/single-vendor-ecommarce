const nodemailer = require("nodemailer");
async function main(resetLink) {
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: "ronaldo.murray9@ethereal.email",
			pass: "5VeuBhfaEFeG68N8cB",
		},
	});
	let info = await transporter.sendMail({
		from: '"jules.cartwright17@ethereal.email',
		to: "testgmail123@gmail.com",
		subject: "Hello ✔",
		text: "Hello world?",
		html: `<div> <h1> Forgot Password ? </h1> <h4> please visit <a href="${resetLink}" > ${resetLink} </a> Link to reset your password </h4> <p> This Link will expire in 24 hours </p></div>`,
	});
	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports.sendEmail = async (resetLink) => {
	await main(resetLink).catch(console.error);
	return true;
};
