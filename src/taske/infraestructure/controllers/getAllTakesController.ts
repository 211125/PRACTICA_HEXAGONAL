import { Request, Response } from "express";
import { GetAllTaskesUseCase } from "../../application/getAllTaskesUseCase";


export class GetAllTakesController{
    constructor(private getAllTaskesUseCase: GetAllTaskesUseCase){};


    async allTaske(req:Request, res:Response){
        try {
            const listUser = await this.getAllTaskesUseCase.getAll()
            if(listUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listUser
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Users not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });
        }
    }
}