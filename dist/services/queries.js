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
exports.aggregateQuery = exports.getAllCustomers = void 0;
const db_1 = require("../db");
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield db_1.db.collection("customers").find().toArray();
        return customers;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllCustomers = getAllCustomers;
const aggregateQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db
            .collection("customers")
            .aggregate([
            {
                // Reshapes documents by including, excluding, or creating new fields
                $project: {
                    name: 1,
                    city: 1,
                    age: 1,
                    // Adding new custom field which returns boolean value based on condition
                    isAgeExpired: {
                        $cond: {
                            if: { $gte: ["$age", 30] },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                // Filters documents to include only those that match a condition, similar to the find() method
                $match: {
                    city: "New York",
                },
            },
            // Sort data based on a field
            {
                $sort: { age: 1 },
            },
            {
                $limit: 2,
            },
            // {
            //   $group: {
            //     _id: "$city",
            //     totalAge:{$sum:"$age"}
            //   },
            // },
        ])
            .toArray();
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
exports.aggregateQuery = aggregateQuery;
