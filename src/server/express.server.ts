import express from 'express';
import { Application, Response, Request, NextFunction } from 'express';
import { Server } from 'http';
import { createIsAliveRoute } from '../routes/is_alive.route';
import { createWatchpointsApiRoute } from '../routes/watchpoints.api.route';
import { Datastore } from '../services/datastore.service';

type Configuration = {
    port: number;
    commitHash: string;
    datastore: Datastore;
};

export class ExpressServer {

    private app: Application;
    private configuration: Configuration
    private server: Server | undefined;

    constructor(configuration: Configuration) {

        this.app = express();
        this.app.use(express.json());
        this.configuration = configuration;

        this.setupLogs();
        this.loadRouters();

        this.app.use(this.errorHandler);
    }

    public listen() {
        this.server = this.app.listen(this.configuration.port, () => {
            console.log(`Express server is listening on http://localhost:${this.configuration.port}`);
        })
    }

    private loadRouters() {
        const isAliveRoute = createIsAliveRoute({ commitHash: this.configuration.commitHash });
        const watchpointsRoute = createWatchpointsApiRoute({
            datastore: this.configuration.datastore
        });
        
        this.app.use(isAliveRoute);
        this.app.use(watchpointsRoute);
    }

    private setupLogs() {
        const morgan = require('morgan');
        this.app.use(morgan("combined"));
    }

    private errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err.message);
        res.status(500).send(err.message);
        next();
    }
}