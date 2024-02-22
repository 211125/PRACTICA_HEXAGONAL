import express from 'express';
import { createTaskeController,
    getAllTakesController,
    getByIdCoontroller,
    updateTaskeByIdController,
    deleteTaskeController,
    
} from './depencies';

export const taskeRoutes = express.Router();


taskeRoutes.post("/register", createTaskeController.run.bind(createTaskeController))

// Middleware para verificar el token en las rutas siguientes
//userRoutes.use(validateToken);


taskeRoutes.get("/all", getAllTakesController.allTaske.bind(getAllTakesController));

taskeRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

taskeRoutes.put("/update/:uuid", updateTaskeByIdController.update.bind(updateTaskeByIdController))

taskeRoutes.delete("/:uuid", deleteTaskeController.deleteUser.bind(deleteTaskeController))

