import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import workspacesRoutes from './routes/workspaces';

config();

const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
app.use(authRoutes);
app.use(workspacesRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, async () => {
    console.log('listening on port 3000...');
  });
}

export { app };
