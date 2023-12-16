import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

const secretKey = 'rJ9eT$#pP3LmN1!a';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword);
}

export const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
};