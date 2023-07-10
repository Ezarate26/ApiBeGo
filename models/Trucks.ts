import { Schema, model } from 'mongoose';

const truckSchema: Schema = new Schema({
    model: { type: String, required: true },
    make: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    transportWeight: { type: Number, required: true },
    created_at: { type: Number, required: true },
  },{ timestamps: true });

const Trucks = model('Truck', truckSchema);

export default Trucks;