import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY as string;

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  try {
    console.log("JWT Token: ", token);
    console.log("Secret Key: ", secretKey);
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
