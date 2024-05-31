import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

const userSignupSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

const userLoginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = userSignupSchema.safeParse(req.body);
    if (!parsedResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid Inputs",
        errors: parsedResult.error,
      });
      return;
    }
    const { username, email, password, firstname, lastname } =
      parsedResult.data;

    const userData: {
      username: string;
      email: string;
      password: string;
      firstname?: string;
      lastname?: string;
    } = {
      username,
      email,
      password,
    };
    if (firstname) {
      userData.firstname = firstname;
    }

    if (lastname) {
      userData.lastname = lastname;
    }
    const user = await prisma.user.create({
      data: userData,
    });
    // Generate JWT Token
    const token = generateToken(user.id);

    // Set the token in the response header
    // res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(201)
      .json({
        success: true,
        message: "new user created",
        data: { user, token },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error during signup", errors: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = userLoginSchema.safeParse(req.body);
    if (!parsedResult.success) {
      res.status(400).json({
        success: false,
        message: "invalid inputs",
        errors: parsedResult.error,
      });
      return;
    }
    const { username, password } = parsedResult.data;
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });
    if (user) {
      // Generate JWT Token
      const token = generateToken(user.id);

      // Set the token in the response header
      // res.setHeader("Authorization", `Bearer ${token}`);
      // res.header("Authorization", `Bearer ${token}`);
      // Log headers to confirm
      console.log("Response headers:", res.getHeaders());
      res.json({
        success: true,
        message: "user logged-in",
        data: { user, token },
      });
    } else res.json({ message: "Invalid credential" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error during login", errors: error });
  }
};
