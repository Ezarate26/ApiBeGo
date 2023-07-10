import { Schema, model } from 'mongoose';

const pointSchema = new Schema({
  location: {
    name: {
      type: String,
      required: true,
    },
    placeId: {
      type: String,
      required: true,
    },
  },
},{ timestamps: true });

const Points = model('Point', pointSchema);

export default Points;