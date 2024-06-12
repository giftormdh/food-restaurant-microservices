const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  FoodID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  PurchaseDate: {
    type: Date,
    required: true,
  },
});

mongoose.model("Order", orderSchema);
