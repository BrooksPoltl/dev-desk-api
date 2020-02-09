import express, { Request, Response } from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
