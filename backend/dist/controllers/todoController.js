"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const createNewTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    userId: zod_1.z.number().min(1),
});
const updateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
});
const getTodos = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log("Inside todoController.ts and getTodos");
        const todos = await prisma.todo.findMany({
            where: {
                userId,
            },
        });
        res
            .status(200)
            .json({ success: true, message: "todos returned", data: todos });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error during getting todos",
            error: error,
        });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const parsedResult = createNewTodoSchema.safeParse(req.body);
        if (!parsedResult.success) {
            res.status(400).json({
                success: false,
                message: "Invalid Inputs",
                errors: parsedResult.error.errors,
            });
            return;
        }
        const { title, description, userId } = parsedResult.data;
        const newTodo = await prisma.todo.create({
            data: {
                title,
                description,
                userId,
            },
        });
        res
            .status(200)
            .json({ success: true, message: "new todo created", data: newTodo });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error during new todo creation",
            error: error,
        });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const todoId = parseInt(req.params.todoId);
        const parsedResult = updateTodoSchema.safeParse(req.body);
        if (!parsedResult.success) {
            res.status(400).json({
                success: false,
                message: "Invalid Inputs",
                errors: parsedResult.error.errors,
            });
            return;
        }
        const { title, description } = parsedResult.data;
        const updateTodo = await prisma.todo.update({
            where: { id: todoId },
            data: {
                title,
                description,
            },
        });
        res
            .status(200)
            .json({ success: true, message: "todo updated", data: updateTodo });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error during todo updation",
            error: error,
        });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todoId = parseInt(req.params.todoId);
        const deleteTodo = await prisma.todo.delete({
            where: { id: todoId },
        });
        res
            .status(200)
            .json({ success: true, message: "todo deleted", data: deleteTodo });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error during todo deletion",
            error: error,
        });
    }
};
exports.deleteTodo = deleteTodo;
