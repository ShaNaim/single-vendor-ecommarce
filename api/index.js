const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const checkRequest = require("./routes/checkRequest");
const app = express();
dotenv.config();
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
const orderRoute = require("./routes/orderRouter");
const stripeRoute = require("./routes/stripe");
const topicRoutes = require("./routes/topicRouter");
const categoryRoutes = require("./routes/categoryRouter");
const configRoutes = require("./routes/configRouter");

const PORT = process.env.PORT || 5000;

const url = process.env.MONGO_URL; // `mongodb+srv://whitecoatbd:g1TR5FdcXZ2r1mjv@whitecoatbd.aqfpl.mongodb.net/whitecoatbdDatabase?retryWrites=true&w=majority`;

mongoose
	.connect(url)
	.then(() => {
		console.log("DB Connection Successfull!");
		app.listen(PORT, () => {
			console.log(`Backend server is running on PORT : ${PORT}! `);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// {
// 	origin: `${process.env.SERVER_ADDRESS}:2000`,
// 	origin: `${process.env.SERVER_ADDRESS}:3000`,
// }

app.use(cors());
app.use(express.json());
app.use("/api/auth", checkRequest, authRoute);
app.use("/api/users", checkRequest, userRoute);
app.use("/api/products", checkRequest, productRoute);
app.use("/api/carts", checkRequest, cartRoute);
app.use("/api/orders", checkRequest, orderRoute);
app.use("/api/checkout", checkRequest, stripeRoute);
app.use("/api/layout/topic", checkRequest, topicRoutes);
app.use("/api/layout/category", checkRequest, categoryRoutes);
app.use("/api/layout/config", checkRequest, configRoutes);

// function onlyUnique(value, index, self) {
// 	return self.indexOf(value) === index;
// }
