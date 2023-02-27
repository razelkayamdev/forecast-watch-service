import { ForecastService } from "../src/services/forecast.service";

test("Forecast service returns data", async () => {

    const forecastService = new ForecastService(mockNetworkingClient);
    const forecast = await forecastService.getForecast({ 
        latitude: 32.088156, 
        longitude: 34.763634
    });
    expect(forecast).toBeTruthy();
});

const mockNetworkingClient = {
    async get<T>(url: URL) {
        return Promise.resolve( {} as T );
    }
};