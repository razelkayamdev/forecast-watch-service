import { ExpressServer } from "./express.server"

type Configuration = {
    port: number;
    commitHash: string;
};

export class AppServer {

    private experssServer: ExpressServer;

    constructor(configuration: Configuration) {
        this.experssServer = new ExpressServer({
            commitHash: configuration.commitHash,
            port: configuration.port
        });
    }

    public start() {
        this.experssServer.listen();
    }
}