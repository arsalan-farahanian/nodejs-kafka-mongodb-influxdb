import { Partitioners } from "kafkajs";
import kafka from "../services/kafka/index";

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

export const run = async (data: InfluxUserData) => {
  await producer.connect();
  await producer.send({
    topic: "main-topic",
    messages: [{ value: Buffer.from(JSON.stringify(data), "utf8") }],
  });

  await producer.disconnect();
};

process.on("message", (message: InfluxUserData) => {
  console.log("Child1 Message:", message);
  run(message);
});
