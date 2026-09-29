import { db } from "../db/mongo.db.js";

const collection = db.collection("incidents");

async function insertIncident(incident) {
  const result = await collection.insertOne(incident);
  const createdIncident = await collection.findOne({ _id: result.insertedId });
  return createdIncident;
}

export const incidentRepo = { insertIncident };
