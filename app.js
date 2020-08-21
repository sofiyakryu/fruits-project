const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  score: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  score: 10,
  review: "Peaches are yummy."
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});

//person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });
//
// Fruit.insertMany([kiwi, orange, banana], function(error){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function(error, fruits) {
  if (error) {
    console.log(error);
  } else {
    mongoose.connection.close()
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
