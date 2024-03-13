import express from "express";
import { studentsRouter } from "./src/students.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.use("/students", studentsRouter);

app.listen(PORT, HOST, () => {
  console.log("Sever is up and working");
});
