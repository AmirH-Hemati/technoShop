import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import errorController from "./controllers/errorControllers";
import AppError from "./utils/AppError";
import productsRouter from "./routes/productRoutes";
import categories from "./routes/categoryRoutes";
import uploadFroalaRoutes from "./routes/uplaodFroalaRoutes";
import userRoutes from "./routes/userRoutes";
import favorietRoutes from "./routes/favorietRoutes";
import addressRoutes from "./routes/addressRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import commentRoutes from "./routes/commentRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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

app.use((_req, _res, next) => {
  next(new AppError(`Can't find ${_req.originalUrl} on this server!`, 404));
});

app.use(errorController);

export default app;