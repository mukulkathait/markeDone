import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createNewTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.number().min(1),
});

const updateTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const getTodos = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during getting todos",
      error: error,
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during new todo creation",
      error: error,
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during todo updation",
      error: error,
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todoId = parseInt(req.params.todoId);
    const deleteTodo = await prisma.todo.delete({
      where: { id: todoId },
    });
    res
      .status(200)
      .json({ success: true, message: "todo deleted", data: deleteTodo });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error during todo deletion",
      error: error,
    });
  }
};
