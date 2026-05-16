const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(
	cors({
		origin: "https://rkgventuresgroup.vercel.app",
		credentials: true,
	})
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});


app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

module.exports = app; 
