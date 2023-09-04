import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const router = express.Router();
const app = express();
mongoose.connect(process.env.URI_MONGO);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    await newUser.save();
    console.log("Usuário registrado com sucesso!");
    res.status(201).send("Usuário registrado com Sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro", err);
    res.status(500).send("Erro ao registrar o usuário.");
  }
};

async function authenticateUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      res.status(401).send("Credenciais inválidas");
    } else {
      res.status(200).send("Autenticação bem-sucedida!");
      console.log("Usuário autenticado com sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao autenticar o usuário");
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const updatedUser = await User.updateOne(
      {
        _id: userId,
      },
      updateData
    );

    if (updatedUser.nModified === 0) {
      res.status(404).send("Usuário não encontrado");
    } else {
      res.status(200).send("Usuário Atualizado com Sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao atualizar o usuário");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).send("Erro ao obter os usuários");
  }
}

export default router;
