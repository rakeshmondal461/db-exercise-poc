import express from "express";
import { aggregateQuery, getAllCustomers } from "./services/queries";
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
      const result = await aggregateQuery();
      res.json(result);
    } catch (err) {
      res.status(500).send("Error fetching customers");
    }
  });

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
