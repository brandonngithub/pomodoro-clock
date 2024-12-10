import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      task: req.body.task,
    };
    let collection = await db.collection("tasks");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let results = await collection.find({ expiresAt: { $exists: false } }).toArray();
  res.send(results).status(200);
});

router.get("/ttl", async (req, res) => {
  let collection = await db.collection("tasks");
  let results = await collection.find({ expiresAt: { $exists: true } }).toArray();
  res.send(results).status(200);
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const update = {
      $set: {
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    };

    const collection = db.collection("tasks");
    let result = await collection.updateOne(query, update);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const update = {
      $unset: { expiresAt: "" },
    };

    const collection = db.collection("tasks");
    let result = await collection.updateOne(query, update);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

export default router;
