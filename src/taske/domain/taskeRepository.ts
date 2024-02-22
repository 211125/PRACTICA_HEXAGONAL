import { Taske } from "./taske";

export interface TaskeRepository{
    createTake( 
        uuid: string,
        title: string,
        descripcion: string,
        dalite_date: Date | null
    ): Promise<Taske | null | string | Error> ;

    getAllTaskes():Promise<Taske[] | null>

    getById(uuid:string):Promise<Taske | null>

    updateTaskeById( //listo 
        uuid: string,
        title?: string,
        descripcion?: string,
    ): Promise<Taske | null>

    deleteTaske(uuid: string):Promise<string | null>;



}