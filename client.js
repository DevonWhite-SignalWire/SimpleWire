import { Voice } from "@signalwire/realtime-api";
import {config} from "dotenv";
import sqlite3 from "sqlite3";
import fs from "fs";

config();

const path = 'mydb.db';
const project = process.env.PROJECTID;
const token = process.env.TOKEN;


if (fs.existsSync(path)) {
  console.log("Database already exist.")
  } else {
   let db = new sqlite3.Database('./mydb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.run("CREATE TABLE USER (ID INTEGER, USER TEXT, PASSWORD TEXT, EMAIL TEXT)")
    console.log('Database created, restart program...')
  });

}
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
    console.log(call.from);
    await call.playTTS({text: "We are gaming!"});
  } catch (error) {
    console.error("Error answering inbound call", error);
  }
});

