import express from 'express';
import { Application, Response, Request, NextFunction } from 'express';
import { Server } from 'http';
import { createIsAliveRoute } from '../routes/is_alive.route';

type Configuration = {
    port: number;
    commitHash: string;
};

export class ExpressServer {

    private app: Application;
    private configuration: Configuration
    private server: Server | undefined;

    constructor(configuration: Configuration) {

        this.app = express();
        this.app.use(express.json());
        this.app.use(this.errorHandler);
        this.configuration = configuration;

        this.setupLogs();
        this.loadRouters();
    }

    public listen() {
        this.server = this.app.listen(this.configuration.port, () => {
            console.log(`Express server is listening on http://localhost:${this.configuration.port}`);
        })
    }

    private loadRouters() {
        const isAliveRoute = createIsAliveRoute({ commitHash: this.configuration.commitHash });
        this.app.use(isAliveRoute);
    }

    private setupLogs() {
        const morgan = require('morgan');
        this.app.use(morgan("combined"));
    }

    private errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        next();
    }
}