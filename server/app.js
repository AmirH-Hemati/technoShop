const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const errorControllers = require("./controllers/errorControllers");
const AppError = require("./utils/AppError");
const productsRouter = require("./routes/productRoutes");
const categories = require("./routes/categoryRoutes");
const uploadFroalaRoutes = require("./routes/uplaodFroalaRoutes");
const userRoutes = require("./routes/userRoutes");
const favorietRoutes = require("./routes/favorietRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4001",
      "http://localhost:5174",
      "http://192.168.1.4:5173",
      "http://192.168.1.3:5173",
    ],
    credentials: true,
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/favoriets", favorietRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.use("/api/v1/categories", categories);
app.use("/api/v1/uploads/froala", uploadFroalaRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorControllers);
module.exports = app;
