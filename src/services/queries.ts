import { db } from "../db";

export const getAllCustomers = async () => {
  try {
    const customers = await db.collection("customers").find().toArray();
    return customers;
  } catch (error) {
    console.error(error);
  }
};

export const aggregateCustomerQuery = async () => {
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
              $gte: ["$age", 30],
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

export const aggregateCandidateQuery = async () => {
  try {
    const result = await db
      .collection("candidates")
      .aggregate([
        {
          /*
            turn this: 
             {
                "name": "Anita",
                "skills": ["Python", "Django", "MongoDB"]
             }
            into this:
             {
                "name": "Anita",
                "skills": "Python"
             }
                 {
                "name": "Anita",
                "skills": "Django"
             }
                 {
                "name": "Anita",
                "skills": "MongoDB"
             }
        */
          $unwind: "$skills",
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    console.error(error);
  }
};
