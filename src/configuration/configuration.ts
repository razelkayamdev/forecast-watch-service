type Configuration = {
    commitHash: string;
    serverPort: number;
    stormglassApiKey: string;
    dbHost: string;
    dpPort: number;
    dbUser: string;
    dbPassword: string;
    dbName: string;
};

export class ConfigurationLoader {

    public load(): Configuration {
        return {
            commitHash: process.env.COMMIT_HASH!,
            serverPort: Number(process.env.HTTP_PORT!),
            stormglassApiKey: process.env.STORMGLASS_API_KEY!,
            dbHost: process.env.DB_HOST!,
            dpPort: Number(process.env.DB_PORT!),
            dbUser: process.env.DB_USER!,
            dbPassword: process.env.DB_PASSWORD!,
            dbName: process.env.DB_NAME!
        };
    }
}