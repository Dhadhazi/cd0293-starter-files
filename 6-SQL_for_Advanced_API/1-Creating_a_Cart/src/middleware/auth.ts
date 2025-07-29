import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyAuthToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      res.status(401);
      res.json("Access denied. No token provided.");
      return;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json("Invalid token.");
  }
};
