import { Router } from 'express';
import {
  getTickets,
  getOpenTickets,
  getClosedTickets,
  getUnassignedTickets,
  getMyTickets,
  createTicket
} from '../controllers/ticket';

import { authMiddleware } from '../controllers/auth';

const router = Router();

router.get('/', getTickets);
router.get('/open', getOpenTickets);
router.get('/closed', getClosedTickets);
router.get('/unassigned', getUnassignedTickets);
router.get('/mine', authMiddleware, getMyTickets);
router.post('/', authMiddleware, createTicket);
router.patch('/');
router.delete('/');

export default router;
