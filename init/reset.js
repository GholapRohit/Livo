require("dotenv").config({ path: "../.env" }); // accessing environment variables from .env file
const mongoose = require("mongoose");
let { data } = require("./data");
const listing = require("../models/listing");

const dbUrl = process.env.ATLASDB_URL;
async function connMongo() {
  await mongoose.connect(dbUrl);
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
      owner: "68ac47dfd0ca9ce9aa920c28",
    };
  });
  await listing.insertMany(data);
  console.log("Data was initialized!");
};
resetData();
