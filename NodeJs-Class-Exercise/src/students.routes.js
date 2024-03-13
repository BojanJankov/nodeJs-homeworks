import { Router } from "express";
import { getStudentsByFilter, getStudentById } from "./students.js";

export const studentsRouter = Router();

studentsRouter.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const students = await getStudentsByFilter(filters);

    return res.json(students);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

studentsRouter.get("/:id", async (req, res) => {
  try {
    const studentId = JSON.parse(req.params.id);

    const student = await getStudentById(studentId);

    return res.json(student);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});
