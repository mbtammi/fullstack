/* eslint-disable */
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://full67shac23:${password}@cluster0.xoh2tup.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:\n");
    result.forEach((Person) => {
      console.log(Person);
    });
    mongoose.connection.close();
  });
}
if (process.argv.length === 5) {
  const person = new Person({
    id: Math.floor(Math.random() * 999),
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}
