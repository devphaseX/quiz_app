import mongoose from 'mongoose';
import { buildMongoLocalURL } from '../../util/';

const startDBConnection = () =>
  mongoose.connect(
    buildMongoLocalURL({
      host: process.env.DB_URL!,
      port: +process.env.DB_PORT!,
      type: process.env.DB_NAME!,
    })
  );

export { startDBConnection };
