export const accoperatorPipeline = [
  {
    $group: {
      _id: "$category",
      cheapest: { $min: "$price" },
      mostexpensive: { $max: "$price" },
    },
  },
];
