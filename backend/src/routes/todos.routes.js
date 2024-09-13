import { Router } from "express";
import {
  getAllTodosCtrl,
  createTodoCtrl,
  updateTodoCtrl,
  deleteTodoCtrl,
} from "../controllers/todos.controllers.js";
import validateJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validateJwt, getAllTodosCtrl);
todosRouter.post("/", validateJwt, createTodoCtrl);
todosRouter.put("/:id", validateJwt, updateTodoCtrl);
todosRouter.delete("/:id", validateJwt, deleteTodoCtrl);

const TODOS_ENDPOINT = "/api/todos"; // Define la URL base del endpoint

export { todosRouter, TODOS_ENDPOINT };
