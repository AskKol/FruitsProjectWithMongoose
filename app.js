"use strict";

const mongoose = require("mongoose");
const helper = require("./scripts/helperFunc");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongooseFruitDB", {
      useNewUrlParser: true,
    });
    helper.insertFruit(mongoose);
    //helper.insertPerson(mongoose);
    //helper.insertManyFruits(mongoose);
    // helper.getAllFruits(mongoose);
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));
