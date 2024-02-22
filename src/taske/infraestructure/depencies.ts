import { MysqlTaskeRepository } from "./PosgreslTaskeRepository";

import { CreateTaskeUseCase } from "../application/createTaskeUseCase";
import { CreateTaskeController } from "./controllers/createTaskeController";

import { GetAllTaskesUseCase } from "../application/getAllTaskesUseCase";
import { GetAllTakesController } from "./controllers/getAllTakesController";


import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./controllers/getByIdController";

import { UpdateTaskeByIdUseCase } from "../application/updateTaskeByIdUseCase";
import { UpdateTaskeByIdController } from "./controllers/updateTaskeByIdController";

import { DeleteTaskeUseCase } from "../application/deleteTaskeUseCase";
import { DeleteTaskeController } from "./controllers/deleteTaskeController";




export const mysqlTaskeRepository = new MysqlTaskeRepository();

export const createTaskeUseCase = new CreateTaskeUseCase(mysqlTaskeRepository)
export const createTaskeController = new CreateTaskeController(createTaskeUseCase)

export const getAllTaskesUseCase = new GetAllTaskesUseCase(mysqlTaskeRepository);
export const getAllTakesController = new GetAllTakesController(getAllTaskesUseCase);

export const getByIdUseCase = new GetByIdUseCase(mysqlTaskeRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);

export const updateTaskeByIdUseCase = new UpdateTaskeByIdUseCase(mysqlTaskeRepository);
export const updateTaskeByIdController = new UpdateTaskeByIdController (updateTaskeByIdUseCase);

export const deleteTaskeUseCase = new DeleteTaskeUseCase(mysqlTaskeRepository);
export const deleteTaskeController = new DeleteTaskeController(deleteTaskeUseCase);


