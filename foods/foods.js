const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./food");
const Food = mongoose.model("Food");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://giftoramadha:Abcd!234@foodsservice.ogjiqof.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("food service");
});

//functionality
app.post("/food", (req, res) => {
  var newFood = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  };

  //create new Food
  var food = new Food(newFood);

  food
    .save()
    .then(() => {
      console.log("New food added");
      res.send("Success add food!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error add food" + err.message);
    });
});

//show all foods
app.get("/foods", (req, res) => {
  Food.find()
    .then((foods) => {
      res.json(foods);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

//show a food by id
app.get("/food/:id", (req, res) => {
  Food.findById(req.params.id)
    .then((food) => {
      if (food) {
        res.json(food);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/food/:id", (req, res) => {
  Food.findOneAndDelete(req.params.id)
    .then(() => {
      res.send("Food Removed!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000!");
});
