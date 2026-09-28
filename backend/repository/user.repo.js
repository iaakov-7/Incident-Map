import { db } from "../db/mongo.db.js";

const collection = db.collection("users");

async function insertUser(newUser) {
  const result = await collection.insertOne(newUser);
  const createdUser = await collection.findOne({ _id: result.insertedId });
  return createdUser;
}

async function findUserByEmail(email) {
  const user = await collection.findOne({ email: email });
  return user;
}

export const userRepo = { insertUser, findUserByEmail };
