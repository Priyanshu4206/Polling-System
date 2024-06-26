import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

import userRoutes from "./routes/userRoute.js";
import pollRoutes from "./routes/pollRoute.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/poll", pollRoutes);

export default app;
