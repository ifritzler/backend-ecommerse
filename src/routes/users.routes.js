import express from "express";
import FileSystemContainer from "../db/FileSystemContainer.js";
import { notBodyEmpty } from "../middlewares/notBodyEmpty.js";

const router = express.Router();
const userService = new FileSystemContainer('users.txt');

// Obtener todos los usuarios
router.get("/", async (req, res, next) => {
  try {
    const users = await userService.all()
    res.status(200).json(users)
  } catch (err) {
    next(err);
  }
});

// Obtener un usuario por su id
router.get("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Guardar un usuario
router.post("/", notBodyEmpty, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Editar un usuario
router.put("/:id", notBodyEmpty, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
