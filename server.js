const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db");
const mainRouter = require("./url");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", mainRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
