const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Order");
const Order = mongoose.model("Order");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://giftoramadha:Abcd!234@foodsservice.ogjiqof.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected! - Orders service");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

// New order
app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: new mongoose.Types.ObjectId(req.body.CustomerID),
    FoodID: new mongoose.Types.ObjectId(req.body.FoodID),
    PurchaseDate: req.body.PurchaseDate,
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      console.log("Order Created");
      res.send("Order Created");
    })
    .catch((err) => {
      console.error("Error creating order:", err);
      res.status(500).send("Error creating order");
    });
});

// Get all orders
app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.error("Error fetching orders:", err);
      res.status(500).send("Error fetching orders");
    });
});

app.listen(3002, () => {
  console.log("Customer Server Running on Port 3002!");
});
