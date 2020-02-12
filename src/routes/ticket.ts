import { Router } from 'express';
import {
  getTickets,
  getOpenTickets,
  getClosedTickets,
  getUnassignedTickets,
  getMyTickets,
  createTicket,
  closeTicket,
  assignTicket
} from '../controllers/ticket';

import { authMiddleware } from '../controllers/auth';

const router = Router();

router.get('/', getTickets);
router.get('/open', getOpenTickets);
router.get('/closed', getClosedTickets);
router.get('/unassigned', getUnassignedTickets);
router.get('/mine', authMiddleware, getMyTickets);
router.post('/', authMiddleware, createTicket);
router.patch('/assign', authMiddleware, assignTicket);
router.patch('/close', authMiddleware, closeTicket);
export default router;
