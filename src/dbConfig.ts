import dotenv from 'dotenv';

dotenv.config();
type Config = {
  user: string;
  password: string;
  server: string;
  database: string;
  encrypt: true;
};
const dbConfig = <Config>{
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  encrypt: true
};
export default dbConfig;
