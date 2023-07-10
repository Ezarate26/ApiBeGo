import { Schema, model } from 'mongoose';

const RouteSchema = new Schema({
  originCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  destinyCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  origin: {
    type: String,
    required:true
  },
  destiny: {
    type: String,
    required:true
  },
  distance: {
    type: String,
    required: true
  }
},{ timestamps: true });
const Route = model('Route', RouteSchema);
 
export default Route;