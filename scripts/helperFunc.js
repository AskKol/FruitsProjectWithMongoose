"use strict";

const getFruitSchema = () => {
  return {
    name: {
      type: String,
      required: [true, "The name property is required"],
    },
    rating: {
      type: Number,
      required: [true, "rating is a required property"],
      validate: {
        validator: (value) => {
          return !(
            !value ||
            typeof value !== "number" ||
            value - Math.floor(value) !== 0 ||
            value <= 0 ||
            value > 10
          );
        },
        message: (props) => `${props.value} please provide an integer`,
      },
    },
    review: String,
  };
};

const getPersonSchema = () => {
  return {
    name: String,
    age: Number,
  };
};

const getFruitCollectionObject = (mongoose) => {
  if (!mongoose) throw "Please provide a valid mongoose connection object";

  const fruitSchema = mongoose.Schema(getFruitSchema());
  const Fruit = mongoose.model("fruit", fruitSchema);
  return Fruit;
};

const saveCallback = async (err, doc, mongoose) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.log(`Document inserted successfully. ${doc}`);
  await closeConnection(mongoose);
};

const closeConnection = async (mongoose) => {
  if (mongoose) {
    console.log("Closing connection");
    await mongoose.connection.close();
    console.log("Connection closed");
  }
};

const getFruits = (Fruit) => {
  return [
    new Fruit({
      name: "Juicy Apple",
      rating: 7,
      review: "Lovely, though it can get too sugary for me",
    }),
    new Fruit({
      name: "pineapple",
      rating: 7.5,
      review: "Lovely pick",
    }),
    new Fruit({
      name: "cashew",
      rating: 8,
      review: "Love it's sour taste",
    }),
  ];
};

const insertFruit = (mongoose) => {
  try {
    const Fruit = getFruitCollectionObject(mongoose);
    const fruit = new Fruit({
      name: "mango",
      rating: 8.4,
      review: "Pretty lovely fruit",
    });

    fruit.save(async (err, doc) => {
      await saveCallback(err, doc, mongoose);
    });
  } catch (error) {}
};

const insertManyFruits = (mongoose) => {
  const Fruit = getFruitCollectionObject(mongoose);
  Fruit.insertMany(getFruits(Fruit), async (err) => {
    if (err) throw err;

    console.log("Fruit(s) added to collection!");
    await closeConnection(mongoose);
  });
};

const getAllFruits = async (mongoose) => {
  const Fruit = getFruitCollectionObject(mongoose);
  Fruit.find(async (err, fruits) => {
    if (err) throw err;

    fruits.forEach(async (f) => {
      console.log(`${f.name}`);
    });
    await closeConnection(mongoose);
  });
};

const insertPerson = (mongoose) => {
  const personSchema = mongoose.Schema(getPersonSchema());
  const Person = mongoose.model("person", personSchema);
  const person = new Person({
    name: "John",
    age: 37,
  });
  person.save(async (err, doc) => {
    await saveCallback(err, doc, mongoose);
  });
};

module.exports = {
  getFruitSchema,
  getPersonSchema,
  getFruits,
  insertFruit,
  insertManyFruits,
  getAllFruits,
  insertPerson,
  closeConnection,
};
