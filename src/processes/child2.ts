import kafka from "../services/kafka/index";
import { writeData } from "../services/influx/queries";

const consumer = kafka.consumer({ groupId: "maingroup" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "main-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value !== null) {
        console.log("Child2 Message:", JSON.parse(message.value.toString()));
        try {
          await writeData(
            JSON.parse(message.value.toString()) as InfluxUserData
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  });
};

runConsumer();
