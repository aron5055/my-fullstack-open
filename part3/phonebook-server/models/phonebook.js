const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error in connecting to mongoDB: ", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    minLength: [8, "Phone number must be at least 8 characters long"],
    validate: {
      validator: function (v) {
        return /^(\d{2}|\d{3})-\d+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format should be XX-XXXXX or XXX-XXXXX`,
    },
    required: [true, "Phone number is required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
