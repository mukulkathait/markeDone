"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const userSignupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
});
const userLoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(6),
});
const signup = async (req, res) => {
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
        const { username, email, password, firstname, lastname } = parsedResult.data;
        const userData = {
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
        const token = (0, jwt_1.generateToken)(user.id);
        // Set the token in the response header
        // res.setHeader("Authorization", `Bearer ${token}`);
        res
            .status(201)
            .json({
            success: true,
            message: "new user created",
            data: { user, token },
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "error during signup", errors: error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
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
            const token = (0, jwt_1.generateToken)(user.id);
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
        }
        else
            res.json({ message: "Invalid credential" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "error during login", errors: error });
    }
};
exports.login = login;
