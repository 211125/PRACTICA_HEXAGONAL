import { Taske } from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/taske";

export class DeleteTaskeUseCase{

    constructor(readonly taskeRepository: TaskeRepository){}

    async deleteUser(uuid:string):Promise<string | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const taske = await this.taskeRepository.deleteTaske(uuid);
            return taske;
        } catch (error) {
            return null
        }
    }
}