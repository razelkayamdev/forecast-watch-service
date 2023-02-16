import { ExpressServer } from "./express.server"

export class AppServer {

    private experssServer: ExpressServer;

    constructor(httpPort: number) {
        this.experssServer = new ExpressServer({
            port: httpPort
        });
    }

    public start() {
        this.experssServer.listen();
    }
}