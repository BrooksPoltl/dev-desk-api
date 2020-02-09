import { Router } from 'express';
import { getTickets } from '../controllers/ticket';

const router = Router();

router.get('/', getTickets);
router.post('/');
router.patch('/');
router.delete('/');

export default router;
