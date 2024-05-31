"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, todoController_1.getTodos);
router.post("/", authMiddleware_1.authMiddleware, todoController_1.createTodo);
router.put("/:todoId", authMiddleware_1.authMiddleware, todoController_1.updateTodo);
router.post("/:todoId", authMiddleware_1.authMiddleware, todoController_1.deleteTodo);
exports.default = router;
