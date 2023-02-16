// Playground.

import { AppServer } from "./server/app.server";

function start() {
    const configuration = loadConfiguration();
    const server = new AppServer(configuration.httpPort);
    server.start();
}

function loadConfiguration() {
    return {
        httpPort: Number(process.env.HTTP_PORT!)
    };
}

start();