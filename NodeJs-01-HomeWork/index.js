import { createPath } from "./path.js";
import { DataService } from "./src/data.service.js";
import { Book } from "./src/book.model.js";
import { loggerEmmiter } from "./src/loggger.js";

const BOOKS_PATH = createPath(["data", "data.json"]);

// Geting data function

const getAllBooks = async () => {
  const books = await DataService.readJSONFile(BOOKS_PATH);

  return books;
};

// Saveing data function

const saveAllBooks = async (books) => {
  await DataService.saveJSONFile(BOOKS_PATH, books);
};

// Creating and adding new book

const createBook = async (title, author, publicationYear, quantity) => {
  const books = await getAllBooks();

  const newBook = new Book(title, author, publicationYear, quantity);

  const updateBooks = [...books, newBook];

  await saveAllBooks(updateBooks);

  loggerEmmiter.emit("createBook", newBook.id);
};

// Listening books
const listingBooks = async () => {
  const books = await getAllBooks();

  books.forEach((book) => {
    console.log(
      `${book.title} by ${book.author} and quantity of ${book.quantity}`
    );
  });
};

// Updateing books

const updateBook = async (
  bookId,
  newTitle,
  newAuthor,
  newPublicationYear,
  newQuantity
) => {
  const books = await getAllBooks();

  const bookExists = books.some((book) => book.id === bookId);

  if (!bookExists) throw new Error("Book not found!");

  const updatedBook = books.map((book) => {
    if (book.id === bookId) {
      return {
        ...book,
        title: newTitle,
        author: newAuthor,
        publicationYear: newPublicationYear,
        quantity: newQuantity,
      };
    } else {
      return book;
    }
  });

  await saveAllBooks(updatedBook);

  loggerEmmiter.emit("updateBook", bookId);
};

// Delete book

const deleteBook = async (bookId) => {
  const books = await getAllBooks();

  const updateBooks = books.filter((book) => book.id !== bookId);

  if (books.length === updateBooks.length) {
    throw new Error("Book not found, can't delete it!");
  }

  await saveAllBooks(updateBooks);

  loggerEmmiter.emit("deleteBook", bookId);
};
// Delete all book - bonus

const deleteAllBook = async () => {
  await saveAllBooks([]);

  loggerEmmiter.emit("deleteAllBooks");
};

const app = async () => {
  try {
    // await createBook("Ti si zver", "Dzen sinsero", "31.08.2022", 350);
    // await createBook("Kasni porasni", "Petre M.Andreevski", "20.07.1985", 1000);
    // await deleteBook("ef5f94ec-02c4-4c44-9cc3-50a5ef295be0");
    // await updateBook(
    //   "e3fe2337-27b5-4845-8c60-7dcd8daf666b",
    //   "Bogato dete, pametno dete",
    //   "Robert Kioski",
    //   "16.11.2015",
    //   700
    // );

    const books = await getAllBooks();
    console.log(books);
    await listingBooks();
  } catch (error) {
    console.error(error);
  }
};

app();
