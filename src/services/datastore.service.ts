import mysql, { Connection } from "mysql2";

type Configuration = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
};

export type Watchpoint = {
    id: string;
    created_at: string;
    location_id: string;
    user_id: string;
    name: string;
} & mysql.RowDataPacket[];

export type User = {
    id: string;
    created_at: string;
    username: string;
} & mysql.RowDataPacket[];

export type Location = {
    id: string;
    created_at: string;
    name: string;
    latitude: number;
    longitude: number;
} & mysql.RowDataPacket[];

export class Datastore {

    private connection: Connection;

    constructor(configuration: Configuration) {
        this.connection = mysql.createConnection({
            host: configuration.host,
            port: configuration.port,
            user: configuration.user,
            password: configuration.password,
            database: configuration.database
        });
    }

    public getUserWatchpoints(userId: string): Promise<Watchpoint[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM watch_points WHERE user_id = ?;";
            this.connection.query<Watchpoint[]>(query, [userId], (error: mysql.QueryError | null, result: Watchpoint[], fields: mysql.FieldPacket[]) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    public async getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users;";
            this.connection.query<User[]>(query, [], (error: mysql.QueryError | null, result: User[], fields: mysql.FieldPacket[]) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    public async getUser(userId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            this.connection.query<User[]>(query, [userId], (error: mysql.QueryError | null, result: User[], fields: mysql.FieldPacket[]) => {
                if (error) {
                    reject(error);
                }
                resolve(result[0]);
            });
        });
    }

    public async getAllLocations(): Promise<Location[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, id, name, ST_X(coordinates) AS latitude, ST_Y(coordinates) AS longitude FROM locations;";
            this.connection.query<Location[]>(query, [], (error: mysql.QueryError | null, result: Location[], fields: mysql.FieldPacket[]) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    public async getLocation(id: string): Promise<Location>  {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, id, name, ST_X(coordinates) AS latitude, ST_Y(coordinates) AS longitude FROM locations WHERE id = ?;";
            this.connection.query<Location[]>(query, [id], (error: mysql.QueryError | null, result: Location[], fields: mysql.FieldPacket[]) => {
                if (error) {
                    reject(error);
                }
                resolve(result[0]);
            });
        });
    }
}