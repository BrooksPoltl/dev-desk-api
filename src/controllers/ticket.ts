import { RequestHandler, Response, ErrorRequestHandler } from 'express';
import { User, ErrorHandler, Ticket } from '../interfaces';
import { authMiddleware } from './auth';

const db = require('../../data/dbConfig');

export const getTickets: RequestHandler = (req, res, next) => {
  try {
    db('ticket')
      .then((tickets: Ticket[]) => {
        res.status(200).json({ status: 200, tickets });
      })
      .catch(() => {
        const errorMessage: ErrorHandler = {
          status: 400,
          message: 'could not get tickets'
        };
        res.status(400).json(errorMessage);
      });
  } catch (e) {
    const errorMessage: ErrorHandler = {
      status: 500,
      message: 'Server error'
    };
    res.status(500).json(errorMessage);
  }
};
