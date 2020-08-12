import { razcall, Razcall } from "./Razcall";

describe('Razcall test suite', () => {
    let rascal: Razcall;

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
        })
    })

    it('should bootstrap console', function () {
        expect(console.log).toEqual(rascal.info);
        expect(console.error).toEqual(rascal.error);
        expect(console.warn).toEqual(rascal.warning);
        expect(console.debug).toEqual(rascal.debug);
        expect(console.trace).toEqual(rascal.trace);
    });
})
