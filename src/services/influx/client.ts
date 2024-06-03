import * as Influx from "influx";

export default new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  port: Number(process.env.INFLUX_PORT),
  protocol: process.env.INFLUX_PROTOCOL,
  username: process.env.INFLUX_USERNAME,
  password: process.env.INFLUX_PASSWORD,
  database: process.env.INFLUX_DATABASE_NAME,
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
