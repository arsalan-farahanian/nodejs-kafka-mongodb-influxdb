import { IResults } from "influx";
import influx from "./client";

export async function writeData(data: InfluxUserData) {
  return await influx.writePoints([
    {
      measurement: "data",
      tags: { userId: data.tag },
      fields: {
        name: data.name,
        value: data.value,
      },
      timestamp: data.ts,
    },
  ]);
}

export async function queryData(
  userId: string,
  name: string,
  start: number,
  end: number
) {
  return await influx.query(
    `
    select * from data where userId = '${userId}' and "name" = '${name}' and (time >= ${start} and time <= ${end})
  `
  );
}
