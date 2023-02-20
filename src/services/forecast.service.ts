import { Networking } from "./networking.service";

type HourForecast = {
    time: string; // Timestamp in UTC
    airTemperature: Record<string, number>; // Air temperature in degrees celsius
    pressure: Record<string, number>; // Air pressure in hPa
    currentDirection: Record<string, number>;  // Direction of current. 0° indicates current coming from north
    currentSpeed: Record<string, number>;  // Speed of current in meters per second
    gust: Record<string, number>; // Wind gust in meters per second
    humidity: Record<string, number>; // humidity
    precipitation: Record<string, number>; // Mean precipitation in kg/m²/h = mm/h
    swellDirection: Record<string, number>; // Direction of swell waves. 0° indicates swell coming from north
    swellHeight: Record<string, number>; // Height of swell waves in meters
    swellPeriod: Record<string, number>; // Period of swell waves in seconds
    secondarySwellPeriod: Record<string, number>; // Direction of secondary swell waves. 0° indicates swell coming from north
    secondarySwellDirection: Record<string, number>; // Height of secondary swell waves in meters
    secondarySwellHeight: Record<string, number>; // Period of secondary swell waves in seconds
    visibility: Record<string, number>; // Horizontal visibility in km
    waterTemperature: Record<string, number>; // Water temperature in degrees celsius
    waveDirection: Record<string, number>; // Direction of combined wind and swell waves. 0° indicates waves coming from north
    waveHeight: Record<string, number>; // Significant Height of combined wind and swell waves in meters
    wavePeriod: Record<string, number>; // Period of combined wind and swell waves in seconds
    windDirection: Record<string, number>; // Direction of wind at 10m above sea level. 0° indicates wind coming from north
    windSpeed: Record<string, number>; // Speed of wind at 10m above sea level in meters per second.
};

type Metadata = {
    dailyQuota: number;
    lat: number;
    lng: number;
    requestCount: number;
};

type HoursForecast = {
    hours: HourForecast[];
};

type Meta = {
    meta: Metadata
};

export type Forecast = Meta & HoursForecast;

type Coordinates = {
    latitude: number;
    longitude: number;
}

export class ForecastService {

    private networkingClient: Networking;

    constructor(networkingClient: Networking) {
        this.networkingClient = networkingClient;
    }

    private buildRequest(url: URL, coordinates: Coordinates): URL {
        const params = ["airTemperature", "pressure", "cloudCover", "currentDirection", "currentSpeed", "gust", "humidity", "precipitation", "swellDirection", "swellHeight", "swellPeriod", "secondarySwellPeriod", "secondarySwellDirection", "secondarySwellHeight", "visibility", "waterTemperature", "waveDirection", "waveHeight", "wavePeriod", "windDirection", "windSpeed"];
        url.searchParams.set("params", params.toString());
        url.searchParams.set("lat", `${coordinates.latitude}`); 
        url.searchParams.set("lng", `${coordinates.longitude}`);
        return url;
    }

    public async getForecast(coordinates: Coordinates): Promise<Forecast> {
        const url = this.buildRequest(new URL("https://api.stormglass.io/v2/weather/point"), coordinates);
        return await this.networkingClient.get<Forecast>(url);
    }
}
