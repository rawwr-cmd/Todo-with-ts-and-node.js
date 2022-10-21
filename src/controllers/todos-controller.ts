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

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ allTodos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;

  const { text } = req.body as { text: string };
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  console.log(todoIndex);
  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoIndex] = new Todo(id, text);
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }
  TODOS.splice(todoIndex, 1);
  res.json({ message: "Todo deleted!" });
};

/*
The splice() method changes the contents of an array by removing or replacing existing elements and/or
adding new elements in place. To access part of an array without modifying it.
*/

//INSERTION
// const months = ['Jan', 'March', 'April', 'June'];
// months.splice(1, 0, 'Feb');
// // inserts at index 1
// console.log(months);
// // expected output: Array ["Jan", "Feb", "March", "April", "June"]
// months.splice(4, 1, 'May');
// // replaces 1 element at index 4
// console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

//Removal 1 element at index 3
// const myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
// const removed = myFish.splice(3, 1);

// myFish is ["angel", "clown", "drum", "sturgeon"]
// removed is ["mandarin"]
