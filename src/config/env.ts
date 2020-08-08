import "dotenv/config";

export const env = {
    APPLICATION_PORT: Number.parseInt(process.env.APPLICATION_PORT || '0') || NaN,
    APPLICATION_NAME: process.env.APPLICATION_NAME || '',
    SELF_PUBLIC_IP_ADDRESS: process.env.SELF_PUBLIC_IP_ADDRESS || '',
    ENABLE_EUREKA: process.env.ENABLE_EUREKA === 'true'
}

const undefinedProperties: string[] = [];

Object.entries(env).forEach(([ key, value ]) => {
    if (!value && value!==false) {
        undefinedProperties.push(key)
    }
});

if (undefinedProperties.length) {
    console.error(`Following required properties are undefined: `, undefinedProperties);
    throw new ReferenceError();
}
