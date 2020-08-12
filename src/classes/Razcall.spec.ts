import chalk from "chalk";
import moment from "moment";

import { razcall, Razcall } from "./Razcall";
import { formatMessage } from "../utils/utils";

describe('Razcall test suite', () => {
    let rascal: Razcall;
    let rascalGlobalConsole: Console;

    beforeAll(() => {
        rascal = razcall({
            applicationName: 'test',
            dbHost: 'test',
            dbPassword: 'none',
            dbUser: 'none',
            dbName: 'none',
            dbPort: 1234,
            overwriteConsole: true,
            postLogs: false,
        });

        rascalGlobalConsole = rascal.globalConsole;
    })

    it('should log "log" messages in default color', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'log');
        const defaultSpy = jest.spyOn(rascal, 'default');

        //when
        console.log(logMessage);

        //then
        expect(defaultSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy)
            .toHaveBeenLastCalledWith(
                chalk.reset(
                    formatMessage('test', logMessage, moment(), 'log'))
            );
    });

    it('should log "info" messages in green', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'info');
        const infoSpy = jest.spyOn(rascal, 'info');

        //when
        console.info(logMessage);

        //then
        expect(infoSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy).toHaveBeenLastCalledWith(chalk.green(formatMessage('test', logMessage, moment(), 'info')));
    });

    it('should log "error" messages in red', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'error');
        const errorSpy = jest.spyOn(rascal, 'error');

        //when
        console.error(logMessage);

        //then
        expect(errorSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy).toHaveBeenLastCalledWith(chalk.red(formatMessage('test', logMessage, moment(), 'error')));
    });

    it('should log "debug" messages in cyan', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'debug');
        const debugSpy = jest.spyOn(rascal, 'debug');

        //when
        console.debug(logMessage);

        //then
        expect(debugSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy).toHaveBeenLastCalledWith(chalk.cyan(formatMessage('test', logMessage, moment(), 'debug')));
    });

    it('should log "trace" messages in blue', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'trace');
        const errorSpy = jest.spyOn(rascal, 'trace');

        //when
        console.trace(logMessage);

        //then
        expect(errorSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy).toHaveBeenLastCalledWith(chalk.blue(formatMessage('test', logMessage, moment(), 'trace')));
    });

    it('should log "warn" messages in yellow', () => {
        //given
        const logMessage = 'Test message to be logged';
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'warn');
        const errorSpy = jest.spyOn(rascal, 'warning');

        //when
        console.warn(logMessage);

        //then
        expect(errorSpy).toHaveBeenLastCalledWith([ logMessage ]);
        expect(consoleSpy).toHaveBeenLastCalledWith(chalk.yellow(formatMessage('test', logMessage, moment(), 'warn')));
    });

    it('should pass through multiple objects to log', () => {
        //given
        const logMessage = 'Test message to be logged';
        const anotherMessage = 'Another message in the same place';
        const anObject = {property: 'value'}
        const consoleSpy = jest.spyOn(rascalGlobalConsole, 'log');
        const defaultSpy = jest.spyOn(rascal, 'default');

        //when
        console.log(logMessage, anotherMessage, anObject);

        //then
        expect(defaultSpy).toHaveBeenLastCalledWith([ logMessage, anotherMessage, anObject ]);
        expect(consoleSpy)
            .toHaveBeenLastCalledWith(
                chalk.reset(formatMessage('test', logMessage, moment(), 'log')),
                anotherMessage,
                anObject,
            );
    });
})
