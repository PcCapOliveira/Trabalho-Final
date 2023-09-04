import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const router = express.Router();
const app = express();
mongoose.connect(process.env.URI_MONGO);

const workSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: String,
});

const Work = mongoose.model("Work", workSchema);

async function saveWork(req, res) {
  const newWork = new Work({
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
  });

  try {
    await newWork.save();
    console.log("Work inserido com sucesso!");
    res.status(201).send("Work Criado com Sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro", err);
    res.status(500).send("Erro ao criar o work.");
  }
}

async function deleteWork(req, res) {
  const workId = req.params.id;
  try {
    const deletedWork = await Work.deleteOne({
      _id: workId,
    });
    if (deletedWork.deletedCount === 0) {
      res.status(404).send("Work não encontrado");
    } else {
      res.status(200).send("Work Excluído com Sucesso!");
      console.log("Work excluído com sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao excluir o work");
  }
}

async function updateWork(req, res) {
  const workId = req.params.id;
  const updateData = req.body;
  try {
    const updatedWork = await Work.updateOne(
      {
        _id: workId,
      },
      updateData
    );

    if (updatedWork.nModified === 0) {
      res.status(404).send("Work não encontrado");
    } else {
      res.status(200).send("Work Atualizado com Sucesso!");
    }
  } catch (err) {
    console.error("Ocorreu um erro", err);
    res.status(500).send("Erro ao atualizar o work");
  }
}

async function getAllWorks(req, res) {
  try {
    // Aqui vai o método do mongo para pegar todos os registros. find()
    console.log("Works obtidos com sucesso! GETALL");
    res.status(200).json({ message: "Works obtidos com sucesso" });
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).send("Erro ao obter os works");
  }
}

router.get("/works", getAllWorks);
router.post("/works", saveWork);
router.delete("/works/:id", deleteWork);
router.put("/works/:id", updateWork);

export default router;
