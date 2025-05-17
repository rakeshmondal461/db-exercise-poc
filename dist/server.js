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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queries_1 = require("./services/queries");
const app = (0, express_1.default)();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hello" });
}));
app.get("/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield (0, queries_1.getAllCustomers)();
        res.json(customers);
    }
    catch (err) {
        res.status(500).send("Error fetching customers");
    }
}));
app.get("/query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, queries_1.aggregateQuery)();
        res.json(result);
    }
    catch (err) {
        res.status(500).send("Error fetching customers");
    }
}));
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
