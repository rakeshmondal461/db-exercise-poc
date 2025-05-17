import { db } from "../db";

export const getAllCustomers = async () => {
  try {
    const customers = await db.collection("customers").find().toArray();
    return customers;
  } catch (error) {
    console.error(error);
  }
};

export const aggregateQuery = async () => {
  try {
    const result = await db
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
  } catch (error) {
    console.error(error);
  }
};
