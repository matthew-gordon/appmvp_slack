import express from 'express';
import { json } from 'body-parser';
import auth from './routes/auth';

const app = express();

app.use(json({ extended: true }));
app.use(auth);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, async () => {
    console.log('listening on port 3000...');
  });
}

export { app };
