import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log("AuthHeader: ", authHeader);
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log("Token: ", token);
  const decoded = verifyToken(token);
  console.log("Decoded: ", decoded);
  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  req.body.userId = decoded.userId;
  console.log("req.body.userId: ", req.body.userId);
  next();
};
