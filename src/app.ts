import express, { Request, Response } from 'express';
import dbConfig from './dbConfig';
import sql from 'mssql';

const pool = new sql.ConnectionPool(dbConfig).connect();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
