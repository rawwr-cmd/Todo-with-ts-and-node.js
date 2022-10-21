// const express = require("express");
import express, { Request, Response, NextFunction } from "express";
import todosRoutes from "./routes/todos-router";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/todos", todosRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
