type Configuration = {
    commitHash: string;
    port: number;
    stormglassApiKey: string;
};

export class ConfigurationLoader {

    public load(): Configuration {
        return {
            commitHash: process.env.COMMIT_HASH!,
            port: Number(process.env.HTTP_PORT!),
            stormglassApiKey: process.env.STORMGLASS_API_KEY!
        };
    }
}