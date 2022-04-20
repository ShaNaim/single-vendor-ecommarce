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
const orderRoute = require("./routes/orderRouter");
const categoryRoutes = require("./routes/categoryRouter");
const messageRoutes = require("./routes/messageRouter");
const PORT = process.env.PORT || 5000;
const url = `mongodb+srv://tenniesshopdatabase:HZcRYW9w6VJayS8@cluster0.1yzv1.mongodb.net/tennisshopDatabase?retryWrites=true&w=majority`;
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
app.use(cors());
app.use(express.json());
app.use("/api/auth", checkRequest, authRoute);
app.use("/api/users", checkRequest, userRoute);
app.use("/api/products", checkRequest, productRoute);
app.use("/api/message", checkRequest, messageRoutes);
app.use("/api/orders", checkRequest, orderRoute);
app.use("/api/layout/category", checkRequest, categoryRoutes);
