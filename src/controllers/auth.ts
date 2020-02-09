import { RequestHandler, Response, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, ErrorHandler, Token } from '../interfaces';

require('dotenv').config();

const db = require('../../data/dbConfig');

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next();
  }

  try {
    const secret: string = process.env.JWT_SECRET!;
    await jwt.verify(token, secret, (err: Error, decodedToken: any) => {
      if (err) {
        const errorMessage: ErrorHandler = {
          status: 401,
          message: 'invalid token'
        };
        res.status(401).json(errorMessage);
      } else {
        req.body.decodedToken = decodedToken!;
        next();
      }
    });
  } catch (err) {
    const errorMessage: ErrorHandler = {
      status: 500,
      message: 'could not find token'
    };
    res.status(500).json(errorMessage);
  }
  next();
};

const generateToken = (user: User) => {
  const { username, firstName, student, helper, lastName, id } = user;
  const payload: Token = {
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

export const signup: RequestHandler = (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hash;
    db.insert(req.body)
      .into('users')
      .then(() => {
        const message: ErrorHandler = { status: 201, message: 'success' };
        res.status(201).json(message);
      })
      .catch((err: ErrorRequestHandler) => {
        const errorMessage: ErrorHandler = {
          status: 401,
          message: 'could not create user'
        };
        res.status(401).json(errorMessage);
      });
  } catch (err) {
    const errorMessage: ErrorHandler = { status: 500, message: 'server error' };
    res.status(500).json(errorMessage);
  }
};

export const login = (
  req: {
    body: {
      username: string;
      password: string;
    };
  },
  res: Response
) => {
  const { username, password } = req.body;
  db('users')
    .where({ username })
    .first()
    .then((user: User) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token: string = generateToken(user);
        const message: { status: number; token: string } = {
          status: 200,
          token
        };
        res.status(200).json(message);
      } else {
        const errorMessage: ErrorHandler = {
          status: 401,
          message: 'error logging in'
        };
        res.status(401).json(errorMessage);
      }
    })
    .catch((err: any) => {
      const errorMessage: ErrorHandler = {
        status: 500,
        message: 'server error'
      };
      res.status(500).json(errorMessage);
    });
};
