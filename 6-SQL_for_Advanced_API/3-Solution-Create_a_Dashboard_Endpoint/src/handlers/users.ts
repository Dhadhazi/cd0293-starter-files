import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  user: {
    id: number;
    username: string;
  };
}

import { User, UserStore } from "../models/user";
import { verifyAuthToken } from "../middleware/auth";

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.put("/users/:id", verifyAuthToken, update);
  app.delete("/users/:id", verifyAuthToken, destroy);
  app.post("/users/authenticate", authenticate);
};

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
    if (decoded.user.id !== parseInt(req.params.id)) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }

  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(String(err));
  }
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);

    res.json({ user: newUser, token });
  } catch (err) {
    res.status(400);
    res.json(String(err) + JSON.stringify(user));
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  const userId = parseInt(req.params.id);
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
    if (decoded.user.id !== userId) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }

  try {
    const updated = await store.create(user);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(String(err) + JSON.stringify(user));
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
    if (decoded.user.id !== parseInt(req.params.id)) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }

  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(String(err));
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    if (u) {
      const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json({ user: u, token });
    } else {
      res.status(401);
      res.json("Authentication failed");
    }
  } catch (err) {
    res.status(401);
    res.json(String(err) + JSON.stringify(user));
  }
};

export default userRoutes;
