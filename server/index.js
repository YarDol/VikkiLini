const express = require("express");
const app = express();
const mongoos = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const bagRoute = require("./routes/bag");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const wishlistRoute = require("./routes/wishlist");
const cors = require("cors");

mongoos.connect(process.env.MONGO_Vikki)
.then(()=>console.log("DBConnection Successfull!"))
.catch((err)=>{console.log(err)});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bags", bagRoute);
app.use("/api/orders", orderRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running");
});