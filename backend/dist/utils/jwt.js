"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        console.log("JWT Token: ", token);
        console.log("Secret Key: ", secretKey);
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
