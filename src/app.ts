import Express from 'express';
import cors from 'cors';

import { corsOptions } from "./config/cors";
import exampleRouter from "./routes/exampleRouter";
import healthRouter from "./routes/health";

process.env.APPLICATION_NAME = 'application_name';
process.env.APPLICATION_PORT = '3001';

const port = parseInt(process.env.APPLICATION_PORT);

const app = Express();

console.log(`Starting ${ process.env.APPLICATION_NAME } on port: ${ port }`)

app.use(cors(corsOptions));
app.use(Express.json());
app.use(healthRouter);
app.use(exampleRouter);

app.listen(port);

console.log(`App started and listening on port: ${ port }`);
