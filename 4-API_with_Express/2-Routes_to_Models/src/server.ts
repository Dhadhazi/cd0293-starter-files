import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/books", (_req: Request, res: Response) => {
  try {
    res.send("this is the INDEX route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.get("/books/:id", (_req: Request, res: Response) => {
  try {
    res.send("this is the SHOW route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.post("/books", (req: Request, res: Response) => {
  try {
    res.send("this is the CREATE route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.put("/books/:id", (req: Request, res: Response) => {
  try {
    res.send("this is the EDIT route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.delete("/books/:id", (_req: Request, res: Response) => {
  try {
    res.send("this is the DELETE route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
