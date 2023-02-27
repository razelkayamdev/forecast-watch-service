import { Datastore, Watchpoint, Location, User } from "../services/datastore.service";

export class WatchpointsController { 
    private datastore: Datastore;

    constructor(datastore: Datastore) {
        this.datastore = datastore;
    }

    public async getUserWatchpoints(userId: string): Promise<Watchpoint[]> {
        return await this.datastore.getUserWatchpoints(userId);
    }

    public async getAllLocations(): Promise<Location[]> {
        return await this.datastore.getAllLocations();
    }

    public async getLocation(id: string): Promise<Location> {
        return await this.datastore.getLocation(id);
    }

    public async getAllUsers(): Promise<User[]> {
        return await this.datastore.getAllUsers();
    }

    public async getUser(id: string): Promise<User> {
        return await this.datastore.getUser(id);
    }
}