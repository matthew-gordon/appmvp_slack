import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth';

config();

const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(authRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, async () => {
    console.log('listening on port 3000...');
  });
}

export { app };
