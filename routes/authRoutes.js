import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const router = express.Router();
const app = express();
mongoose.connect(process.env.URI_MONGO);

const authenticationSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const Authentication = mongoose.model("Authentication", authenticationSchema);

router.post("/auth", async (req, res) => {
  try {
    const query = await Authentication.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (query) {
      res.status(200).json({ message: "Usuario encontrado" });
    } else res.status(404).send("Nenhum usuario encontrado no banco");
  } catch (error) {
    console.log(error);
  }
});

export default router;
