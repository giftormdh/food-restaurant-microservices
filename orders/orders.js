const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

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

//get single order
app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order) {
      //create request to food and cust
      axios.get("http://localhost:3001/customers/" + order.CustomerID).then((response) => {
        var orderObject = { CustomerName: response.data.name, foodName: "" };
        axios.get("http://localhost:3000/food/" + order.FoodID).then((response) => {
          orderObject.foodName = response.data.name;
          res.json(orderObject);
        });
      });
    } else {
      res.send("Invalid order");
    }
  });
});

app.listen(3002, () => {
  console.log("Order Server Running on Port 3002!");
});
