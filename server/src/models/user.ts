import mongoose, { Schema, Document } from 'mongoose';
import { hashPassword } from '../services/authService';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String,default:""}, 
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
