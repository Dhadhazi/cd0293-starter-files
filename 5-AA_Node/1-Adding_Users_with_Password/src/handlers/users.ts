import express, { Request, Response } from "express";

import { User, UserStore } from "../models/user";

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/{:id}", show);
  app.post("/users", create);
  app.delete("/users", destroy);
};

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.body.id);
  res.json(user);
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const newUser = await store.create(user);

    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(String(err) + JSON.stringify(user));
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
};

export default userRoutes;
