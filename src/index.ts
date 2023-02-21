// Playground.

import { AppServer } from "./server/app.server";
import { ForecastService } from "./services/forecast.service";
import { NetworkingClient } from "./services/networking.service";
import { forecastResopnse } from "../tests/resources/response.mock"

async function start() {
    const configuration = loadConfiguration();
    const server = new AppServer({
        commitHash: configuration.commitHash,
        port: configuration.port
    });
    server.start();

    // Turning off "real" requests, to minimize API consumption
    // const forecastNetworking = new NetworkingClient(configuration.stormglassApiKey);
    // const forecastService = new ForecastService(forecastNetworking);

    const forecastNetworking = {
        async get<T>(url: URL) {
            return Promise.resolve(forecastResopnse as T);
        }
    };
    const forecastService = new ForecastService(forecastNetworking);

    try {
        // 1 meter per second = 1.94384 knt
        const forecast = await forecastService.getForecast({
            latitude: 32.088156,
            longitude: 34.763634
        });
        console.log(forecast);
    } catch (error) {
        console.log(error);
    }
}

type Configuration = {
    commitHash: string;
    port: number;
    stormglassApiKey: string;
};

function loadConfiguration(): Configuration {
    return {
        commitHash: process.env.COMMIT_HASH!,
        port: Number(process.env.HTTP_PORT!),
        stormglassApiKey: process.env.STORMGLASS_API_KEY!
    };
}

start();