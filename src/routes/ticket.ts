import { Router } from 'express';
import {
  getTickets,
  getOpenTickets,
  getClosedTickets,
  getMyTickets
} from '../controllers/ticket';

const router = Router();

router.get('/', getTickets);
router.get('/open', getOpenTickets);
router.get('/closed', getClosedTickets);
router.get('/mine', getMyTickets);
router.post('/');
router.patch('/');
router.delete('/');

export default router;
