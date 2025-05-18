export const ordersWithCustomerDetailsPipeline = [
  {
    // joining orders with customers table to get customer details
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails",
    },
  },
];

export const productInfoPipeline = [
  { $unwind: "$items" },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  { $unwind: "$productDetails" },

  {
    $addFields: {
      "items.name": "$productDetails.name",
      "items.category": "$productDetails.category",
      "items.price": "$productDetails.price",
    },
  },
  {
    $group: {
      _id: "$_id",
      customerId: { $first: "$customerId" },
      orderDate: { $first: "$orderDate" },
      amount: { $first: "$amount" },
      city: { $first: "$city" },
      status: { $first: "$status" },
      items: { $push: "$items" },
    },
  },
];
