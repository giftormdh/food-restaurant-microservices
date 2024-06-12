const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Customer");
const Customer = mongoose.model("Customer");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://giftoramadha:Abcd!234@foodsservice.ogjiqof.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected! - Customer service");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    address: req.body.address,
  };
  var customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      res.send("Customer added");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customers/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.send("Invalid ID");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customers/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Customer Deleted");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(3001, () => {
  console.log("Customer Server Running on Port 3001!");
});
