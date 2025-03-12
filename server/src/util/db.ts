import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URI");
}
const client = new MongoClient(uri);
let conneceted = false;

export async function connect() {
  await client.connect();
  conneceted = true;
}

export async function getDb() {
  if (!conneceted) {
    await connect();
  }
  return client.db("db");
}
