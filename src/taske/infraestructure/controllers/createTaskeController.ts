import { Request, Response } from "express";
import { CreateTaskeUseCase } from "../../application/createTaskeUseCase";
import { Taske } from "../../domain/taske";


export class CreateTaskeController {
    constructor(readonly createTaskeUseCase: CreateTaskeUseCase) { }
    async run(req: Request, res: Response) {
        console.log('controller')

        try {

            let {title,descripcion,} = req.body
            console.log(req.body)

            let registerTaske = await this.createTaskeUseCase.run(
                title,
                descripcion,
              
            )
            if (registerTaske instanceof Taske) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: registerTaske.uuid,
                        title: registerTaske.title,
                        descripcion: registerTaske.descripcion,
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the user."
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: "Validation failed",
                    errors: JSON.parse(error.message)  
                });
            }

            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}