import { Taske } from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";

export class GetAllTaskesUseCase{
    constructor(readonly taskeRepository: TaskeRepository){}


    async getAll():Promise<Taske[] | null>{
        try {
            const listTaskes = await this.taskeRepository.getAllTaskes();
            return listTaskes; 
        } catch (error) {
            return null;        }
    }
}