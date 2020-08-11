import MessageSchema, { ILogMessage, TLogLevel } from "../schemas/LogsSchema";
import mongoose from 'mongoose';
import moment, { Moment } from "moment";

export interface RazcallConfig {
    applicationName: string,
    dbHost: string;
    dbPassword: string;
    dbUser: string;
    dbName: string;
    dbPort: number;
}

let INSTANCE: Razcall;

export const razcall = async (config: RazcallConfig): Promise<Razcall> => {
    if (!INSTANCE) {
        INSTANCE = new Razcall(config);
    }
    return INSTANCE;
};

const formatMessage = (appName: string, message: string, moment: Moment, level: TLogLevel): string =>
    `[${ level.toUpperCase() }] (${ appName }) ${ moment.format('YYYY-MM-DD HH:mm:ss') }: ${ message }`;

export class Razcall {
    constructor(private config: RazcallConfig) {
        this.establishConnection(config);
    }

    private establishConnection = (config: RazcallConfig) => {
        const {dbHost, dbPort, dbName} = config;
        mongoose.connect(
            `mongodb://${ dbHost }:${ dbPort }/${ dbName }`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then(
            () => console.log(formatMessage(config.applicationName, 'Connected to DB', moment(), 'info'))
        );
    }

    private log = (message: string, level: TLogLevel): Promise<ILogMessage> => {
        const date = moment();
        const time = moment().unix();

        const formattedMessage = formatMessage(this.config.applicationName, message, date, level);

        console[level](formattedMessage);

        const logMessage = new MessageSchema({
            message,
            level,
            time,
        });
        return logMessage.save();
    };

    info = (message: string): Promise<ILogMessage> => this.log(message, 'info');
    debug = (message: string): Promise<ILogMessage> => this.log(message, 'debug');
    warning = (message: string): Promise<ILogMessage> => this.log(message, 'warn');
    error = (message: string): Promise<ILogMessage> => this.log(message, 'error');
    trace = (message: string): Promise<ILogMessage> => this.log(message, 'trace');
    finalize = (): Promise<void> => mongoose.disconnect();
}
