import { Taske} from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";
import { v4 as uuid } from "uuid";
import { ValidatorCreateTaske } from "../domain/validation/taske";
import { validate } from "class-validator";

export class CreateTaskeUseCase{
    constructor(readonly taskeRepository:TaskeRepository ){}

    async run(
        title: string,
        descripcion: string,
       
    ): Promise<Taske | null | string | Error>{

         const miuuid: string = uuid()
         const dalite_date = null
        
 
         //validator-class
            let post = new ValidatorCreateTaske(miuuid, title, descripcion,dalite_date);
         const validation = await validate(post)
         if (validation.length > 0) {
             throw new Error(JSON.stringify(validation));
         }
         try {
             const createUser = await this.taskeRepository.createTake(
                 miuuid,
                 title,
                 descripcion,
                 dalite_date
             );
 
             return createUser;
         } catch (error) {
             return null;
         }
     }
}