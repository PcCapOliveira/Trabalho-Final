import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRoutes from "./routes/postsRoutes.js";
import workRoutes from "./routes/worksRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

const app = express();

dotenv.config();
mongoose.connect(process.env.URI_MONGO);

app.use(express.json());

app.use("/api", postsRoutes);
app.use("/api", workRoutes);
app.use("/api", authRoutes);
app.use("/api", categoriesRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando!");
});
