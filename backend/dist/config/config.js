"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
};
