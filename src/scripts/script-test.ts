import axios, { AxiosResponse, AxiosError } from "axios";
import https from "node:https";

const USER_CONNECTION_URL = "https://localhost:443/api/connection?limit=30";
const INFLUX_CONNECTION_URL = "https://localhost:443/api/connections";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let totalRequests = 0;
let successCount = 0;
let failureCount = 0;

const main = async () => {
  try {
    //fetching all the created connections by the user
    const response = await axios.get(USER_CONNECTION_URL, {
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
        USER_ID: "6659b8eb1d412203c9b669cf",
      },
    });
    const userConnections = response.data.data;
    let url_i = 0; // this ensures that all user connection will be used equally
    let interval = setInterval(async () => {
      try {
        let res = await axios.post<UserData, AxiosResponse<JSONResponseFormat>>(
          `${INFLUX_CONNECTION_URL}/${userConnections[url_i]}`,
          {
            ts: Date.now(),
            name: Math.random() > 0.5 ? "data_1" : "data_2",
            value: (1 + Math.random() * 100).toFixed(2),
          },
          {
            httpsAgent,
            headers: {
              "Content-Type": "application/json",
              USER_ID: "6659b8eb1d412203c9b669cf",
            },
          }
        );

        successCount++;
      } catch (error) {
        failureCount++;
      } finally {
        totalRequests++;
        url_i++;
      }

      if (url_i > userConnections.length - 1) {
        url_i = 0;
      }
      // to stop sending requests
      if (Math.random() > 0.99) {
        clearInterval(interval);
        reportResults(totalRequests, successCount, failureCount);
        console.timeEnd("time");
      }
    }, 100); //this technically sends 10 requests per second
  } catch (error) {
    console.error(error);
  }
};

function reportResults(
  totalRequests: number,
  successCount: number,
  failureCount: number
) {
  console.log(`Total number of requests: ${totalRequests}`);
  console.log(`success count: ${successCount}`);
  console.log(`failure count: ${failureCount}`);
}

console.time("time");
main();
