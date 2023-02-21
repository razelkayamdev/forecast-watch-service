import axios from "axios";

type IsAlive = {
    alive: boolean
};

test("is alive endpoint", async () => {
    const getUrl = "http://localhost:3001/is_alive";
    const getResponse = await axios.get<IsAlive>(getUrl);
    const response = getResponse.data;
    expect(response.alive).toBeTruthy();
});
