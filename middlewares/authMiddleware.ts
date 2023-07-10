import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth';

// Extender la interfaz Request
interface Request extends ExpressRequest {
  userId?: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado.' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, exp: number };
    
    const user = await Auth.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(500).json({error });
  }
};

export default authMiddleware;