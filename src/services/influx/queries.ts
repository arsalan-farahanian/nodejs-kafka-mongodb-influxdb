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
