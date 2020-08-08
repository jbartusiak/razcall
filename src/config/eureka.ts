import { Eureka } from 'eureka-js-client';
import { env } from './env';
import * as os from 'os';

console.log('Bootstrapping eureka');

const eurekaClient = new Eureka({
    instance: {
        app: env.APPLICATION_NAME,
        hostName: os.hostname(),
        ipAddr: env.SELF_PUBLIC_IP_ADDRESS,
        port: {
            '$': env.APPLICATION_PORT,
            '@enabled': true,
        },
        statusPageUrl: `http://${ env.SELF_PUBLIC_IP_ADDRESS }:${ env.APPLICATION_PORT }/health`,
        healthCheckUrl: `http://${ env.SELF_PUBLIC_IP_ADDRESS }:${ env.APPLICATION_PORT }/health`,
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        homePageUrl: `http://${ env.SELF_PUBLIC_IP_ADDRESS }:${ env.APPLICATION_PORT }`,
        vipAddress: `http://${ env.SELF_PUBLIC_IP_ADDRESS }:${ env.APPLICATION_PORT }`
    },
    eureka: {
        host: '192.168.0.254',
        port: 8888,
        servicePath: '/eureka/apps',
    },
});

export { eurekaClient };
