import { Kafka } from "kafkajs";

//all the broker addresses are provided as single string divided by ,
const BROKERS = process.env.BROKERS;

export default new Kafka({
  clientId: "myapp",
  brokers: BROKERS.split(","),
});
