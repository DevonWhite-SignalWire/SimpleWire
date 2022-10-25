import { Voice } from "@signalwire/realtime-api";
import {config} from "dotenv";

config();


const project = process.env.PROJECTID
const token = process.env.TOKEN


const client = new Voice.Client({
  project: project,
  token: token,
  contexts: ["test"],
});

client.on("call.received", async (call) => {
  console.log("Got call", call.from, call.to);

  try {
    await call.answer();
    console.log("Inbound call answered");
    console.log(call.from)
    await call.playTTS('We are gaming!')
  } catch (error) {
    console.error("Error answering inbound call", error);
  }
});
