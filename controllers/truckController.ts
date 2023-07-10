import { Request, Response } from 'express';
import Trucks from '../models/Trucks';

const trucks = async (req: Request, res: Response) => {
    try {
  
      // Obtener todos los puntos
      const trucks = await Trucks.find();
  
      return res.status(200).json({ trucks });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor.' });
    }
};
  
export default trucks;