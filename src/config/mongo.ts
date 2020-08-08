import mongoose from 'mongoose';
import { env } from './env';

const {
    DB_NAME,
    DB_HOST,
    DB_PORT,
} = env;

mongoose.connect(
    `mongodb://${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('Connected to DB'));
