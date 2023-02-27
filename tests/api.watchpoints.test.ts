import axios from "axios";

export type Watchpoint = {
    id: string;
    created_at: string;
    location_id: string;
    user_id: string;
    name: string;
};

export type User = {
    id: string;
    created_at: string;
    username: string;
};

export type Location = {
    id: string;
    created_at: string;
    name: string;
    latitude: number;
    longitude: number;
};

describe("Testing watchpoints API", () => {

    test("getting all users", async () => {
        const url = "http://localhost:3001/api/users";
        const response = await axios.get<User[]>(url);
        const data = response.data;
        expect(data).toBeTruthy();
        expect(data.length).toEqual(2);
    });

    test("getting a user", async () => {
        const url = "http://localhost:3001/api/user/2";
        const response = await axios.get<User>(url);
        const data = response.data;
        expect(data.id).toEqual("2");
        expect(data.username).toEqual("raz");
    });

    test("getting all locations", async () => {
        const url = "http://localhost:3001/api/locations";
        const response = await axios.get<Location[]>(url);
        const data = response.data;
        expect(data.length).toEqual(2);
    });

    test("getting a location", async () => {
        const url = "http://localhost:3001/api/location/1";
        const response = await axios.get<Location>(url);
        const data = response.data;
        expect(data.id).toEqual("1");
        expect(data.name).toEqual("Migdalor marina Tel Aviv");
    });

    test("getting a watchpoint of a user", async () => {
        const url = "http://localhost:3001/api/user/2/watchpoints";
        const response = await axios.get<Watchpoint[]>(url);
        const data = response.data;
        expect(data.length).toEqual(2);
        expect(data[0].name).toEqual("Migdalor marina Tel Aviv");
    });
});
