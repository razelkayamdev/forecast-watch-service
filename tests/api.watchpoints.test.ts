import axios from "axios";

test("watchpoints", async () => {
    const url = "http://localhost:3001/api/watchpoints";
    const response = await axios.get<{}>(url);
    const data = response.data;
    expect(data).toBeTruthy();
});
