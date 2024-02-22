import { Taske } from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/taske";



export class GetByIdUseCase{
    constructor(readonly taskeRepository:TaskeRepository ){}

    async getId(uuid:string):Promise<Taske | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.taskeRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}