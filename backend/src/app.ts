import express from "express";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

export default app;
