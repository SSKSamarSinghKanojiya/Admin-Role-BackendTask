let express = require("express");

let authRoutes = require("./routes/authRoutes");
let userRoutes = require("./routes/userRoutes");
let orderRoutes = require("./routes/orderRoutes");

let mainRouter = express.Router();

mainRouter.use("/api/users", authRoutes);
mainRouter.use("/api/users", userRoutes);
mainRouter.use("/api/orders", orderRoutes);

module.exports = mainRouter;
