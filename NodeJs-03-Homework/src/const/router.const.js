import { Router } from "express";
import { tasksRouter } from "../routes/task.routes.js";

export const globalRouter = Router();

globalRouter.use("/tasks", tasksRouter);
