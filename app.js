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

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
});

//mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(error){
  if (error) {
    console.log(error);
  } else {
    console.log("Succesfully updated the document.");
  }
});

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });

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

// Fruit.updateOne({_id: "5f3f9b92d7702ca946733223"}, {name: "Peach"}, function(error){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Succesfully updated the document!");
//   }
// });

// Fruit.deleteOne({name: "Peach"}, function(error){
//   if (error) {
//       console.log(error);
//     } else {
//       console.log("Succesfully deleted the document.");
//     }
// });

// Person.deleteMany({name: "John"}, function(error){
//   if (error) {
//       console.log(error);
//     } else {
//       console.log("Succesfully deleted all the documents.");
//     }
// });
