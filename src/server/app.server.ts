import { Datastore } from "../services/datastore.service";
import { ExpressServer } from "./express.server"

type Configuration = {
    port: number;
    commitHash: string;
    datastore: Datastore;
};

export class AppServer {

    private experssServer: ExpressServer;

    constructor(configuration: Configuration) {
        this.experssServer = new ExpressServer({
            commitHash: configuration.commitHash,
            port: configuration.port,
            datastore: configuration.datastore
        });
    }

    public start() {
        this.experssServer.listen();
    }
}