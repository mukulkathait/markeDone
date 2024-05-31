import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:todoId", authMiddleware, updateTodo);
router.post("/:todoId", authMiddleware, deleteTodo);

export default router;
