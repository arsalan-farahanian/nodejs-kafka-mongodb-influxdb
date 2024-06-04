import * as Influx from "influx";

export default new Influx.InfluxDB({
  host: "localhost",
  port: 8086,
  username: process.env.INFLUX_USERNAME,
  password: process.env.INFLUX_PASSWORD,
  database: "nodeapp",
  schema: [
    {
      measurement: "data",
      tags: ["userId"],
      fields: {
        name: Influx.FieldType.STRING,
        value: Influx.FieldType.STRING,
      },
    },
  ],
});
