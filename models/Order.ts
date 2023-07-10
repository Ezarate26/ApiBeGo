import { Schema, model } from 'mongoose';

enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
  }
  
enum OrderType {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
  }

const orderSchema = new Schema({
    type: { type: String, enum: Object.values(OrderType), required: true },
    description: { type: String, required: true },
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    truck: { type: Schema.Types.ObjectId, ref: 'Truck', required: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: false },
  },{ timestamps: true });

const Order = model('Order', orderSchema);

export { Order, OrderStatus,OrderType};
