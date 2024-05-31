import { config } from "./config/config";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
