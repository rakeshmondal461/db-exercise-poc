export const accoperatorPipeline = [
  {
    $sort: { price: -1 },
  },
  {
    $group: {
      _id: "$category",
      // Minimum and Maximum 
      //   cheapest: { $min: "$price" },
      //   mostexpensive: { $max: "$price" },

      // Returns the first or last value in a group
      first: { $first: "$price" },
      last: { $last: "$price" },
    },
  },
];
