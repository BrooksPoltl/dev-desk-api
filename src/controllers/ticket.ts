import { RequestHandler, Response, ErrorRequestHandler } from 'express';
import { User, ErrorHandler, Ticket, TicketWithCats } from '../interfaces';

const db = require('../../data/dbConfig');

export const getTickets: RequestHandler = (req, res, next) => {
  try {
    db('ticket')
      .then(async (tickets: TicketWithCats[]) => {
        for (let i = 0; i < tickets.length; i++) {
          let newTicket: TicketWithCats = tickets[i];
          const categories = await db('category').where({
            ticket: newTicket.id
          });
          newTicket.categories = categories;
        }
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

export const getOpenTickets: RequestHandler = (req, res, next) => {
  try {
    db('ticket')
      .where({ open: true })
      .then(async (tickets: TicketWithCats[]) => {
        for (let i = 0; i < tickets.length; i++) {
          let newTicket: TicketWithCats = tickets[i];
          const categories = await db('category').where({
            ticket: newTicket.id
          });
          newTicket.categories = categories;
        }
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

export const getClosedTickets: RequestHandler = (req, res, next) => {
  try {
    db('ticket')
      .where({ open: false })
      .then(async (tickets: TicketWithCats[]) => {
        for (let i = 0; i < tickets.length; i++) {
          let newTicket: TicketWithCats = tickets[i];
          const categories = await db('category').where({
            ticket: newTicket.id
          });
          newTicket.categories = categories;
        }
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

export const getMyTickets: RequestHandler = async (req, res, next) => {
  const id = req.body.decodedToken.id;
  const isHelper = req.body.decodedToken.helper;
  const isStudent = req.body.decodedToken.student;
  let assignedToMe = [];
  let createdByMe = [];
  try {
    if (isHelper && isStudent) {
      assignedToMe = await db('ticket').where({ assignedTo: id });
      createdByMe = await db('ticket').where({ createdBy: id });
    } else if (isHelper && !isStudent) {
      assignedToMe = await db('ticket').where({ assignedTo: id });
    } else if (!isHelper && isStudent) {
      createdByMe = await db('ticket').where({ createdBy: id });
    }
    for (let i = 0; i < assignedToMe.length; i++) {
      let newTicket: TicketWithCats = assignedToMe[i];
      const categories = await db('category').where({
        ticket: newTicket.id
      });
      newTicket.categories = categories;
    }
    for (let i = 0; i < createdByMe.length; i++) {
      let newTicket: TicketWithCats = createdByMe[i];
      const categories = await db('category').where({
        ticket: newTicket.id
      });
      newTicket.categories = categories;
    }
    res.status(200).json({ status: 200, assignedToMe, createdByMe });
  } catch (e) {
    const errorMessage: ErrorHandler = {
      status: 500,
      message: 'Server error'
    };
    res.status(500).json(errorMessage);
  }
};

export const getUnassignedTickets: RequestHandler = (req, res, next) => {
  try {
    db('ticket')
      .where({ assignedTo: null })
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

export const createTicket: RequestHandler = async (req, res, next) => {
  const id = req.body.decodedToken.id;
  const isStudent = req.body.decodedToken.student;
  try {
    if (isStudent) {
      await db
        .insert({
          createdBy: id,
          description: req.body.description
        })
        .into('ticket')
        .then(() => {
          res.status(201).json({ status: 201, message: 'Success' });
        })
        .catch((err: any) => {
          const errorMessage: ErrorHandler = {
            status: 400,
            message: 'cant create ticket'
          };
          res.status(401).json(errorMessage);
        });
    } else {
      const errorMessage: ErrorHandler = {
        status: 400,
        message: 'Only students can create tickets'
      };
      res.status(400).json(errorMessage);
    }
  } catch (e) {
    const errorMessage: ErrorHandler = {
      status: 500,
      message: 'Server error'
    };
    res.status(500).json(errorMessage);
  }
};

export const assignTicket: RequestHandler = async (req, res, next) => {
  const { ticketId } = req.body;
  if (req.body.decodedToken.helper) {
    const checkTickets: Ticket[] = await db('ticket').where({ id: ticketId });
    const ticket: Ticket = checkTickets[0];
    if (!ticket.assignedTo) {
      db('ticket')
        .where({ id: ticketId })
        .update({ assignedTo: req.body.decodedToken.id })
        .then(() => {
          res
            .status(200)
            .json({ status: 200, message: 'successfully assigned helper' });
        })
        .catch(() => {
          res.status(500).json({ status: 500, message: 'server error' });
        });
    } else {
      const errorMessage: ErrorHandler = {
        status: 403,
        message: 'Ticket already assigned'
      };
      res.status(403).json(errorMessage);
    }
  } else {
    const errorMessage: ErrorHandler = {
      status: 401,
      message: 'must be a helper to be assigned to ticket'
    };
    res.status(401).json(errorMessage);
  }
};

export const closeTicket: RequestHandler = async (req, res, next) => {
  const { ticketId } = req.body;
  if (req.body.decodedToken.helper) {
    const checkTickets: Ticket[] = await db('ticket').where({ id: ticketId });
    const ticket: Ticket = checkTickets[0];
    if (ticket.assignedTo === req.body.decodedToken.id) {
      db('ticket')
        .where({ id: ticketId })
        .update({ open: false })
        .then(() => {
          res
            .status(200)
            .json({ status: 200, message: 'successfully closed ticket' });
        })
        .catch(() => {
          res.status(500).json({ status: 500, message: 'server error' });
        });
    } else {
      const errorMessage: ErrorHandler = {
        status: 403,
        message: 'Must be assigned to close ticket'
      };
      res.status(403).json(errorMessage);
    }
  } else {
    const errorMessage: ErrorHandler = {
      status: 401,
      message: 'must be a helper to close a ticket'
    };
    res.status(401).json(errorMessage);
  }
};
