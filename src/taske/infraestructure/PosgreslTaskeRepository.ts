import { Taske } from "../domain/taske";
import { TaskeRepository } from "../domain/taskeRepository";
import { query } from "../../database/msql";

import { format } from 'date-fns'; // Asumiendo que estás usando date-fns para formatear fechas


export class MysqlTaskeRepository implements TaskeRepository{

    async createTake(uuid: string, title: string, descripcion: string,  dalite_date: Date): Promise<string | Taske | Error | null> {
        try {
            let sql = "INSERT INTO Taske(uuid, title, descripcion, dalite_date) VALUES ($1, $2, $3, $4)";
            const params: any[] = [uuid, title, descripcion, dalite_date];
           
            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);
    
            const result = await query(sql, params);
            console.log('Query Result:', result);
    
            // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo
    
            return new Taske(uuid, title, descripcion, dalite_date);
        } catch (error) {
            console.error("Error adding user:", error);
            return error as Error;
        }
    }
    
    

    async getAllTaskes(): Promise<Taske[] | null> {
        try {
            const sql = "SELECT * FROM Taske WHERE dalite_date IS NULL";
            const result = await query(sql);
    
            if (!result) {
                throw new Error('No result returned from the query');
            }
    
            const rows = result.rows;
    
            const taskes: Taske[] = rows.map(row => new Taske(
                row.uuid,
                row.title,
                row.descripcion,
                row.dalite_date
            ));
    
            return taskes;
        } catch (error) {
            console.error('Error fetching users with dalite_date null:', error);
            return null;
        }
    }
    
    

    async getById(uuid: string): Promise<Taske | null> {
        try {
            const sql = "SELECT * FROM Taske WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
            const [rows]: any = await query(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro

            if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
            const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
            // Retornamos una nueva instancia de User con los datos obtenidos
            return new Taske(row.uuid, row.title, row.descripcion,row.dalite_date);
        } catch (error) {
            console.error(error);
            return null; // En caso de error, retornamos null
        }
    }
    async updateTaskeById(uuid: string, title?: string, descripcion?: string,): Promise<Taske | null> {
        const updates: { [key: string]: string } = {};
        if (title !== undefined) updates.title = title;
        if (descripcion !== undefined) updates.descripcion = descripcion;
    
        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.
    
        const sqlParts = keys.map((key, index) => `${key} = $${index + 1}`);
        const sql = `UPDATE Taske SET ${sqlParts.join(', ')} WHERE uuid = $${keys.length + 1} AND dalite_date IS NULL`;
    
        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
    
            // Log para mostrar la consulta UPDATE y sus valores
            console.log('UPDATE query:', sql);
            console.log('UPDATE values:', values);
    
            const result = await query(sql, values); // Ejecuta la consulta SQL.
    
            // Verifica si se actualizó algún usuario
            if (result && result.rowCount === 0) {
                console.log('No se pudo actualizar el usuario porque dalite_date no es null');
                return null;
            }
    
            // Log para indicar que la consulta UPDATE se ha completado
            console.log('UPDATE query completed successfully');
    
            const selectResult = await query('SELECT * FROM Taske WHERE uuid = $1', [uuid]);
    
            // Log para mostrar la consulta SELECT y sus valores
    
            if (!selectResult) {
                throw new Error('No result returned from the SELECT query.');
            }
            
            const updatedRows = selectResult.rows || [];
            
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }
            
    
            const updatedUser = new Taske(
                updatedRows[0].uuid,
                updatedRows[0].title,
                updatedRows[0].descripcion,
                updatedRows[0].dalite_date,
            );
    
            // Log para mostrar que el usuario se ha actualizado correctamente
            console.log('User updated successfully:', updatedUser);
    
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    
    
    
   
    async deleteTaske(uuid: string): Promise<string | null> {
        try {
            const currentDate = new Date();
            const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss'); 
    
            const sql = 'UPDATE Taske SET dalite_date = $1 WHERE uuid = $2';
            const result: any = await query(sql, [formattedDate, uuid]);
    
            if (result && result.rowCount === 0) {
                return null;
            }
    
            return 'User dalite_date updated successfully.';
        } catch (error) {
            console.error('Error updating user dalite_date:', error);
            throw error;
        }
    }
    
    
    


   
    
  
    

}