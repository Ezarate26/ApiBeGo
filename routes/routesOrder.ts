import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatusById,
  updateOrderById,
  deleteOrderById,
} from '../controllers/orderController';

const router = express.Router();

// Crear una nueva orden
router.post('/createOrders', createOrder);

// Obtener todas las órdenes
router.get('/getOrders', getOrders);

// Obtener una orden por su ID
router.get('/getOrderById/:id', getOrderById);

// Actualizar una orden por su ID
router.put('/updateOrders/:id', updateOrderById);

// Actualizar el status de una orden por su ID
router.put('/updateStatusOrder/:id', updateOrderStatusById)

// Eliminar una orden por su ID
router.delete('/deleteOrders/:id', deleteOrderById);

export default router;