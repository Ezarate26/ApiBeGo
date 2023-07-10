import { Request, Response } from 'express';
import Auth from '../models/Auth';
import jwt from 'jsonwebtoken';


export const userRegister = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Verifica si el correo electrónico ya está registrado
      const existingUser = await Auth.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado.' });
      }
  
      // Crea un nuevo usuario
      const newUser = new Auth({ email, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor.' });
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Verifica si el usuario existe en la base de datos
      const existingUser = await Auth.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      // Verifica la contraseña
      if (password !== existingUser.password) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      // Genera el token JWT
      const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET!, { expiresIn:'1h'});
  
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor.' });
    }
  };