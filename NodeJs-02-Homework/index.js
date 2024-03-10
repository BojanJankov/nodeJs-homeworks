// Here is server
import express from "express";
import { createPath } from "./path.js";
import {
  getAllTrainers,
  createTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  deleteAllTrainers,
} from "./src/trainers.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

const STATIC_FILE_PATH = createPath(["public"]);

app.use("/home", express.static(STATIC_FILE_PATH));

// 1.Get all data.
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    return res.json(trainers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
// 2.Create trainer

app.post("/trainers", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished,
    } = req.body;
    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("Invalid input!");

    const newTrainer = await createTrainer(
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished
    );
    return res.status(201).json(newTrainer);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
// Get trainers by Id
app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    const foundTrainer = await getTrainerById(trainerId);

    return res.json(foundTrainer);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});
// Update trainer

app.patch("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const updateData = req.body;
    if (updateData.id) throw new Error("Invalid Data");

    await updateTrainer(trainerId, updateData);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
// Delete all trainers
app.delete("/trainers/all", async (req, res) => {
  try {
    await deleteAllTrainers();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
// Delete trainer

app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log("Server up");
});
