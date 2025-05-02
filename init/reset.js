const express = require("express");
const mongoose = require("mongoose");
let { data } = require("./data");
const listing = require("../models/listing");

async function connMongo() {
  await mongoose.connect("mongodb://localhost:27017/airbnb");
}
connMongo()
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const resetData = async () => {
  await listing.deleteMany({});
  data = data.map((item) => {
    return {
      ...item,
      owner: "67fddd9553eba0811d629787", // Replace with the actual user ID
    };
  });
  await listing.insertMany(data);
  console.log("Data was initialized!");
};

resetData();
