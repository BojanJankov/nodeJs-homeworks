// Here functions for server and crud operations
import { DataService } from "./data.service.js";
import { createPath } from "../path.js";
import { Trainer } from "./trainer.model.js";

const TRAINERS_PATH = createPath(["data", "trainers.json"]);
// 1. Get all trainers
export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(TRAINERS_PATH);

  return trainers;
};
// Save all trainers
const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(TRAINERS_PATH, trainers);
};

// 2.Get trainer by id.
export const getTrainerById = async (trainerId) => {
  const trainers = await getAllTrainers();

  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

  if (!foundTrainer) throw new Error("Trainer not found");

  return foundTrainer;
};

// 3.Update Trainer Info.

export const updateTrainer = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();

  if (!trainers.some((trainer) => trainer.id === trainerId)) {
    throw new Error("Trainer not found, can't update");
  }

  const updateTrainers = trainers.map((trainer) => {
    if (trainer.id === trainerId) {
      return { ...trainer, ...updateData };
    } else {
      return trainer;
    }
  });

  await saveTrainers(updateTrainers);
};
// 4.Add a trainer.
export const createTrainer = async (
  firstName,
  lastName,
  email,
  isCurrentlyTeaching,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();

  const newTrainer = new Trainer(
    firstName,
    lastName,
    email,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished
  );

  const updatedTrainers = [...trainers, newTrainer];

  await saveTrainers(updatedTrainers);

  return newTrainer;
};
// 5.Delete trainer.

export const deleteTrainer = async (trainerId) => {
  const trainers = await getAllTrainers();

  const updateTrainers = trainers.filter((trainer) => trainer.id !== trainerId);

  if (!updateTrainers.length === trainers.length) {
    throw new Error("Can't delete, trainer not found");
  }

  await saveTrainers(updateTrainers);
};
// 6.Delete all trainers.
export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
