import { EventEmitter } from "node:events";
import { createPath } from "../path.js";
import { appendFileSync } from "node:fs";

const LOGGER_PATH = createPath(["data", "log.txt"]);

export const loggerEmmiter = new EventEmitter();

loggerEmmiter
  .on("createBook", (bookId) => {
    appendFileSync(LOGGER_PATH, `Book with id: ${bookId} was created.\n`);
  })
  .on("updateBook", (bookId) => {
    appendFileSync(LOGGER_PATH, `Book with id: ${bookId} was updated.\n`);
  })
  .on("deleteBook", (bookId) => {
    appendFileSync(LOGGER_PATH, `Book with id: ${bookId} was deleted.\n`);
  })
  .on("deleteAllBooks", () => {
    appendFileSync(LOGGER_PATH, `All books were deleted.\n`);
  });
