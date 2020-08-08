import "dotenv/config";

export const env = {
    APPLICATION_PORT: Number.parseInt(process.env.APPLICATION_PORT || '0') || NaN,
    APPLICATION_NAME: process.env.APPLICATION_NAME || '',
    SELF_PUBLIC_IP_ADDRESS: process.env.SELF_PUBLIC_IP_ADDRESS || '',
    ENABLE_EUREKA: process.env.ENABLE_EUREKA === 'true',
    DB_HOST: process.env.DB_HOST || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_USER: process.env.DB_USER || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_PORT: process.env.DB_PORT || '',
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
