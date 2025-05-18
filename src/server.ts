import express from "express";
import { aggregateCandidateQuery, aggregateCustomerQuery, aggregateOrderQuery, getAllCustomers } from "./services/queries";
const app = express();

app.get("/", async (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).send("Error fetching customers");
  }
});

app.get("/query", async (req, res) => {
  try {
    const result = await aggregateCustomerQuery();
    res.json(result);
  } catch (err) {
    res.status(500).send("Error fetching customers");
  }
});

app.get("/query2", async (req, res) => {
  try {
    const result = await aggregateCandidateQuery();
    res.json(result);
  } catch (err) {
    res.status(500).send("Error fetching candidates");
  }
});

app.get("/query3", async (req, res) => {
  try {
    const result = await aggregateOrderQuery();
    res.json(result);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
