import { Request, Response } from 'express';
import Points from '../models/Points';

const points =  async (req: Request, res: Response) => {
    try {
  
      // Obtener todos los puntos
      const points = await Points.find();
  
      return res.status(200).json({ points });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor.' });
    }
};
  
export default points;