import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export const tasksRouter = Router();

tasksRouter.get("/", TaskController.getAllTasks);
tasksRouter.post("/", TaskController.createTask);
tasksRouter.get("/:id", TaskController.getTaskById);
tasksRouter.post("/:id", TaskController.updateTask);
tasksRouter.delete("/:id", TaskController.deleteTask);
tasksRouter.delete("/", TaskController.deleteAllTasks);
