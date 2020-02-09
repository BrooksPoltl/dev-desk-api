import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import auth from './routes/auth';
import { authMiddleware } from './controllers/auth';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(authMiddleware);
app.use(cors());
app.use(helmet());

// routes
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
