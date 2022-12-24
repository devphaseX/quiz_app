import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { allHandleRoute } from './router';
import { startDBConnection } from './config/db/';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api', allHandleRoute);
app.use('*', () => {});

const port = +(process.env.PORT ?? 8080);

startDBConnection()
  .then(() => {
    console.log('database connection established.');
  })
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server started on port http://localhost:${port}`);
      });
    } catch (e) {
      console.error('server failed to start');
    }
  })
  .catch((e) => console.error('Invalid database connection', e));
