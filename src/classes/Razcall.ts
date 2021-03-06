/* eslint-disable  @typescript-eslint/no-explicit-any */
import moment from "moment";
import mongoose from 'mongoose';

import MessageSchema, { TLogLevel } from "../schemas/LogsSchema";
import { formatMessage, mapping } from "../utils/utils";

export interface RazcallConfig {
    applicationName: string,
    dbHost: string;
    dbPassword: string;
    dbUser: string;
    dbName: string;
    dbPort: number;
    overwriteConsole: boolean;
    postLogs: boolean;
}

let INSTANCE: Razcall;

export const razcall = (config: RazcallConfig): Razcall => {
    if (!INSTANCE) {
        INSTANCE = new Razcall(config);
    }
    return INSTANCE;
};

export class Razcall {
    private _globalConsole: Console;

    constructor(private config: RazcallConfig) {
        this._globalConsole = {...console};
        if (config.overwriteConsole) {
            this.overwriteConsole();
        }
        this.establishConnection(config);
    }

    private establishConnection = (config: RazcallConfig) => {
        const {dbHost, dbPort, dbName} = config;
        config.postLogs && mongoose.connect(
            `mongodb://${ dbHost }:${ dbPort }/${ dbName }`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then(
            () => console.log('Connected to DB'),
        );
    }

    private overwriteConsole() {
        console.log('Taking over logging to console');
        console.log = (...messages: any[]) => messages.length && this.default(messages);
        console.info = (...messages: any[]) => messages.length && this.info(messages);
        console.error = (...messages: any[]) => messages.length && this.error(messages);
        console.debug = (...messages: any[]) => messages.length && this.debug(messages);
        console.trace = (...messages: any[]) => messages.length && this.trace(messages);
        console.warn = (...messages: any[]) => messages.length && this.warning(messages);
        console.log('Console taken over');
    }

    private log = (level: TLogLevel, items: any[]): void => {
        const [ message, ...rest ] = items;
        const date = moment();
        const time = moment().unix();

        const formattedMessage = formatMessage(this.config.applicationName, message, date, level);

        const formatter = mapping(level);
        if (rest.length) {
            this._globalConsole[level](formatter(formattedMessage), ...rest);
        }
        else {
            this._globalConsole[level](formatter(formattedMessage));
        }
        const logMessage = new MessageSchema({
            message,
            level,
            time,
        });

        if (this.config.postLogs) {
            logMessage.save();
        }
    };

    default = (items: any[]):void => this.log('log', items);
    info = (items: any[]): void => this.log('info', items);
    debug = (items: any[]): void => this.log('debug', items);
    warning = (items: any[]): void => this.log('warn', items);
    error = (items: any[]): void => this.log('error', items);
    trace = (items: any[]): void => this.log('trace', items);
    finalize = (): Promise<void> => mongoose.disconnect();

    get globalConsole(): Console {
        return this._globalConsole;
    }
}
