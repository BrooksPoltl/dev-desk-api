import jwt from 'jsonwebtoken';
import { User } from '../interfaces';
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login');

export default router;
