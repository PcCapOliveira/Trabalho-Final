import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const router = express.Router();
const app = express();
mongoose.connect(process.env.URI_MONGO);
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Category = mongoose.model("Category", categorySchema);

const saveCategory = async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await newCategory.save();
    console.log("Categoria inserida com sucesso!");
    res.status(201).send("Categoria Criada com Sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro", err);
    res.status(500).send("Erro ao criar a categoria.");
  }
};

async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.deleteOne({
      _id: categoryId,
    });
    if (deletedCategory.deletedCount === 0) {
      res.status(404).send("Categoria não encontrada");
    } else {
      res.status(200).send("Categoria Excluída com Sucesso!");
      console.log("Categoria excluída com sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao excluir a categoria");
  }
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const updateData = req.body;
  try {
    const updatedCategory = await Category.updateOne(
      {
        _id: categoryId,
      },
      updateData
    );

    if (updatedCategory.nModified === 0) {
      res.status(404).send("Categoria não encontrada");
    } else {
      res.status(200).send("Categoria Atualizada com Sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao atualizar a categoria");
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).send("Erro ao obter as categorias");
  }
}

export default router;
