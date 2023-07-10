import mongoose, { Schema, Document } from 'mongoose';

interface IAuth extends Document {
  email: string;
  password: string;
}

const AuthSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model<IAuth>('Auth', AuthSchema);