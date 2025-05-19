export const testPipeLine = [
  {
    $project: {
      name: 1,
      address: 1,
      occupation: 1,
      gender: 1,
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$$ROOT", "$address"],
      },
    },
  },
  {
    $unset:["address"]
  }
];
