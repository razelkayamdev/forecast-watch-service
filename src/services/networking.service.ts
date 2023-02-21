import axios, { AxiosInstance } from "axios"
import { Forecast } from "./forecast.service";

export interface Networking {
    get<T>(url: URL): Promise<T>;
}

export class NetworkingClient implements Networking {

    private client: AxiosInstance;

    constructor(apiKey: string) {
        this.client = axios.create(
            { headers: { "Authorization": apiKey } 
        });
    }

    public async get<T>(url: URL): Promise<T> {
        const stringUrl = url.toString();
        const response = await this.client.get<T>(stringUrl);
        return response.data;
    }
}