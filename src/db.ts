// db.ts
import { MongoClient, MongoClientOptions } from "mongodb";

const options: Partial<MongoClientOptions> = {
  maxPoolSize: 10, // Connection pool limit
};

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, options as MongoClientOptions);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}

connectDB();
const db = client.db("retail-database");

export { client, db };
