import { Moment } from "moment";
import { TLogLevel } from "..";
import chalk, { Chalk } from "chalk";

export const formatMessage = (appName: string, message: string, moment: Moment, level: TLogLevel): string =>
    `[${ level.toUpperCase() }] (${ appName }) ${ moment.format('YYYY-MM-DD HH:mm:ss') }: ${ message }`;

export const mapping = (level: TLogLevel): Chalk => {
    switch (level) {
        case "debug":
            return chalk.cyan;
        case "error":
            return chalk.red;
        case "info":
            return chalk.green;
        case "trace":
            return chalk.blue;
        case "warn":
            return chalk.yellow;
        default:
            return chalk.bgBlack;
    }
}
