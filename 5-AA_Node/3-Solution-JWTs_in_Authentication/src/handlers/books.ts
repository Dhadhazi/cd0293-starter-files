import express, { Request, Response } from "express";
import { Book, BookStore } from "../models/book";
import { verifyAuthToken } from "../middleware/auth";

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const book = await store.show(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      id: 0,
      title: req.body.title,
      author: req.body.author,
      totalPages: req.body.totalPages,
      type: req.body.type,
      summary: req.body.summary,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      id: parseInt(req.params.id),
      title: req.body.title,
      author: req.body.author,
      totalPages: req.body.totalPages,
      type: req.body.type,
      summary: req.body.summary,
    };

    const updatedBook = await store.edit(req.params.id, book);
    res.json(updatedBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const bookRoutes = (app: express.Application) => {
  app.get("/books", index);
  app.get("/books/:id", show);
  app.post("/books", verifyAuthToken, create);
  app.put("/books/:id", edit);
  app.delete("/books/:id", verifyAuthToken, destroy);
};

export default bookRoutes;
