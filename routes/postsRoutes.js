import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
mongoose.connect(process.env.URI_MONGO);

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: String,
});

const Post = mongoose.model("Post", postSchema);
// Função para criar um post usando post no Thunderclint
const savePost = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
  });

  try {
    await newPost.save();
    console.log("Post inserido com sucesso!");
    res.status(201).send("Post Criado com Sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro", err);
    res.status(500).send("Erro ao criar o post.");
  }
};
// Função para Deletar um post usando Delete no Thunderclint
async function deletePost(req, res) {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.deleteOne({
      _id: postId,
    });
    if (deletedPost.deletedCount === 0) {
      res.status(404).send("Post não encontrado");
    } else {
      res.status(200).send("Post Excluído com Sucesso!");
      console.log("Post excluído com sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao excluir o post");
  }
}
// Função para atualizar um post usando PUT ou PATCH
async function updatePost(req, res) {
  const postId = req.params.id;
  const updateData = req.body;
  try {
    const updatePost = await Post.updateOne(
      {
        _id: postId,
      },

      updateData
    );

    if (updatePost.nModified === 0) {
      res.status(404).send("Post não encontrado");
    } else {
      res.status(200).send("Post Atualizado com Sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao atualizar o post");
  }
}

async function getAllPosts(req, res) {
  try {
    //Aqui vai o método do mongo para pegar todos os registros. find()
    console.log("Post Atualizado com sucesso! GETALL");
    res.status(201).json({ message: "Post Atualizado com sucesso" });
  } catch (err) {
    console.log("Ocorreu um erro:", Object.keys(err.keyValue)[0]);
  }
}

// Rotas
router.get("/posts", getAllPosts);
router.post("/posts", savePost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);

export default router;
