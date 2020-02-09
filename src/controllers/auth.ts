import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log('reached');
    return next();
  }

  try {
    const secret: string = process.env.SECRET!;
    const user = await jwt.verify(token, secret);
    req.body.user = user;
  } catch (err) {
    console.log(err);
  }
  next();
};

const generateToken = (user: User) => {
  const { username, firstName, student, helper, lastName, id } = user;
  const payload = {
    username,
    firstName,
    student,
    helper,
    lastName,
    id
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1y'
  };
  return jwt.sign(payload, secret!, options);
};
