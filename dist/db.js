"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
// db.ts
const mongodb_1 = require("mongodb");
const options = {
    maxPoolSize: 10, // Connection pool limit
};
const uri = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(uri, options);
exports.client = client;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("✅ MongoDB connected");
        }
        catch (error) {
            console.error("❌ Connection error:", error);
        }
    });
}
connectDB();
const db = client.db("retail-database");
exports.db = db;
