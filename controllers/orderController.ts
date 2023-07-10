import { Request, Response } from 'express';
import {createRoute} from '../utils/utils'
import { Order, OrderStatus, OrderType } from '../models/Order';
import Trucks from '../models/Trucks';


// Crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { type, description, pickup, dropoff, truck } = req.body;
    let truckId =""
    const allTrucks = await Trucks.find()

    allTrucks.forEach(trck => { if (trck.model === truck) truckId = trck._id!.toString() } )
    if (!truckId) {
      return res.status(400).json({ message: 'Camión inválido.' });
    }

    const resultRoute = await createRoute(pickup, dropoff)

    if (!resultRoute.route) {
      return res.status(400).json(resultRoute);
    }
    if (!Object.values(OrderType).includes(type)) {
     // Validar si el tipo de orden es válido
       return res.status(400).json({ message: 'Tipo de orden inválido.' });
    }
    

    const order = new Order({
      type,
      description,
      pickup,
      dropoff,
      status: OrderStatus.PENDING,
      truck:truckId,
      route:resultRoute.route._id
    });

    await order.save();

    return res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor',error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await Order.find().populate('truck route');
      if(!orders.length) return res.status(200).json({ message:"No hay ordenes creadas" });

      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor',error });
    }
};
  
export const getOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
  
      const order = await Order.findById(orderId).populate('truck route');
  
      if (!order) {
        return res.status(404).json({ message: 'La orden no existe' });
      }
  
      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
      
    }
};
export const updateOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const updates = req.body;
      let validTruck = ""
      const allTrucks = await Trucks.find()

    allTrucks.forEach(trck => { if (trck.model === updates.truck) validTruck = trck._id!.toString() } )
    if (!validTruck) {
      return res.status(400).json({ message: 'Camión inválido.' });
      }
      const resultRoute = await createRoute(updates.pickup, updates.dropoff)

      if (!resultRoute.route) {
        return res.status(404).json( resultRoute );
      }
      if (!Object.values(OrderStatus).includes(updates.status)) {
        return res.status(400).json({ message: 'El estado proporcionado no es válido.' });
      }

      updates.truck = validTruck
      updates.route = resultRoute.route?._id

      const order = await Order.findByIdAndUpdate(orderId, updates, { new: true }).populate('truck route');
  
      if (!order) {
        return res.status(404).json({ message: 'La orden no existe' });
        }
        
      if (order.status === OrderStatus.IN_PROGRESS) {
        return res.status(400).json({ message: 'No se puede modificar una orden en progreso' });
      }
  
      return res.status(200).json({ message: 'Orden actualizada exitosamente', order });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const updateOrderStatusById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
 
    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'La orden no existe' });
    }

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: 'El estado proporcionado no es válido.' });
    }

    await Order.updateOne({ _id: orderId }, { status })
    
    const updatedOrder = await Order.findById(orderId);


    return res
      .status(200)
      .json({ message: 'Estado de orden actualizado exitosamente',updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor',error });
  }
};
  
export const deleteOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      if (orderId.length < 24) {
        return res.status(400).json({ message: 'Ingrese un id de orden valido' });
      }
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'La orden no existe' });
      }
  
      if (order.status === OrderStatus.IN_PROGRESS) {
        return res.status(400).json({ message: 'No se puede eliminar una orden en progreso' });
      }
  
      await order.deleteOne({ _id: orderId });
  
      return res.status(200).json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor',error });
    }
  };