import axios from "axios";

type IsAlive = {
    alive: boolean
};

test("is alive endpoint", async () => {
    const url = "http://localhost:3001/is_alive";
    const response = await axios.get<IsAlive>(url);
    const data = response.data;
    expect(data.alive).toBeTruthy();
});
