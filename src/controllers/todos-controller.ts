import { RequestHandler } from "express";
import { Todo } from "../models/todos-models";
import { v4 as uuidv4 } from "uuid";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as { text: string };
  const newTodo = new Todo(uuidv4(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};
