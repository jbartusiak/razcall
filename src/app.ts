import { env } from './config/env';

import Express from 'express';
import cors from 'cors';

import { corsOptions } from "./config/cors";
import healthRouter from "./routes/health";
import exampleRouter from './routes/exampleRouter';
import { Eureka } from "eureka-js-client";
import './config/mongo';

const app = Express();

let eurekaClient: Eureka;

if (env.ENABLE_EUREKA) {
    import('./config/eureka').then(e => {
        eurekaClient = e.eurekaClient;
        eurekaClient.start();
    });
}

console.log(`Starting ${ env.APPLICATION_NAME } on port: ${ env.APPLICATION_PORT }`)

app.use(cors(corsOptions));
app.use(Express.json());
app.use(healthRouter);
app.use(exampleRouter);

const server = app.listen(env.APPLICATION_PORT, () => {
    console.log(`App started and listening on port: ${ env.APPLICATION_PORT }`);
});

[ 'SIGINT', 'SIGTERM', 'SIGQUIT' ].forEach(signal => {
    process.on(signal, () => {
        console.log('Shutting down server');
        server.close(err => {
            if (err) console.error('There was a problem closing the server', err);
        });

        if (eurekaClient) {
            console.log('Unregistering with eureka');
            eurekaClient.stop(() => {
                process.exit(1);
            })
        } else {
            process.exit(1);
        }
    })
});
