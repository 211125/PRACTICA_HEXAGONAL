import { Taske } from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domain/validation/taske";

export class UpdateTaskeByIdUseCase{
    constructor(readonly taskeRepository:TaskeRepository){}

    async update(
        uuid: string,
        title?: string,
        descripcion?: string,
       
        ): Promise<Taske | null> {

        let post = new ValidatorUpdate(uuid,title,descripcion)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateUserById = await this.taskeRepository.updateTaskeById(uuid,title,descripcion);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}