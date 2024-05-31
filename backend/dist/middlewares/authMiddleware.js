"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AuthHeader: ", authHeader);
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("Token: ", token);
    const decoded = (0, jwt_1.verifyToken)(token);
    console.log("Decoded: ", decoded);
    if (!decoded) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
    req.body.userId = decoded.userId;
    console.log("req.body.userId: ", req.body.userId);
    next();
};
exports.authMiddleware = authMiddleware;
