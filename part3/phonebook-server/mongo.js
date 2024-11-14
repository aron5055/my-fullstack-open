const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length === 3) {
  console.log("phonebook:");
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.uvhxd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3] || "";
  const number = process.argv[4] || "";

  const p = new Person({
    name,
    number,
  });

  p.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
