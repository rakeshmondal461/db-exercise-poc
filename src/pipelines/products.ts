export const accoperatorPipeline = [
  {
    $sort: { price: -1 },
  },
  {
    $group: {
      _id: "$category",
      // Collects values into an array for each group.
      // products: { $push: "$name" },
      // Minimum and Maximum
      //   cheapest: { $min: "$price" },
      //   mostexpensive: { $max: "$price" },

      // Returns the first or last value in a group
      //   first: { $first: "$price" },
      //   last: { $last: "$price" },
    },
  },
];
