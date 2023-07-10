import { Request, Response } from 'express';
import {createRoute} from '../utils/utils'
import Route from '../models/Routes';
import Points from '../models/Points';
import { Order, OrderStatus, OrderType } from '../models/Order';




// Endpoint para crear una nueva ruta
export const createRoutes = async (req: Request, res: Response) => {
  try {
    const { origin, destiny } = req.body;
    const result = await createRoute(origin, destiny)

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
};


export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find();
    return res.status(200).json({ routes });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Endpoint para obtener una ruta específica por su ID
export const getRouteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada.' });
    }
    return res.status(200).json({ route });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Endpoint para modificar una ruta existente
export const updateRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { origin, destiny } = req.body;
     // Verificar si la ruta existe
    const route = await Route.findById(id);
     if (!route) {
       return res.status(404).json({ message: 'Ruta no encontrada.' });
     }
   
    // Verificar si la ruta está asignada a órdenes en curso
    const orders = await Order.find({ route: id });
    let inProgress = 0
    if (orders.length > 0) {
      orders.forEach(order => {
        if (order.status === OrderStatus.IN_PROGRESS) {
          inProgress++
        }
      })
     
    } 

    if (inProgress > 0) {
      return res.status(400).json({ message: 'No se puede modificar una ruta asignada a órdenes en curso.' });
    }
    await createRoute(origin, destiny, true, id)
    return res.status(200).json({ message: 'Ruta modificada exitosamente.' });


    
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor.',error });
  }
};

// Endpoint para eliminar una ruta
export const deleteRouteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar si la ruta existe
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada.' });
    }

    
    // Verificar si la ruta está asignada a órdenes en curso
    const orders = await Order.find({ route: id });
    let inProgress = 0
    if (orders.length > 0) {
      orders.forEach(order => {
        if (order.status === OrderStatus.IN_PROGRESS) {
          inProgress++
        }
      })
     
    } 

    if (inProgress > 0) {
      return res.status(400).json({ message: 'No se puede eliminar una ruta asignada a órdenes en curso.' });
    }

    // Eliminar la ruta de la base de datos
    await route.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Ruta eliminada exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
};



