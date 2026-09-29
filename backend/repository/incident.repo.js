import { ObjectId } from "mongodb";
import { db } from "../db/mongo.db.js";

const collection = db.collection("incidents");

async function insertIncident(incident) {
  const result = await collection.insertOne(incident);
  const createdIncident = await collection.findOne({ _id: result.insertedId });
  return createdIncident;
}

async function updateIncident(id, toUpdate) {
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: toUpdate },
    { returnDocument: "after" },
  );
  return result;
}

async function findIncidentById(id) {
  const result = await collection.findOne({ _id: new ObjectId(id) });
  return result;
}

export const incidentRepo = {
  insertIncident,
  updateIncident,
  findIncidentById,
};
