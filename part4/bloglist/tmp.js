const mongoose = require("mongoose");
const config = require("./utils/config");
const Blog = require("./models/blog");

mongoose.connect(config.MONGODB_URI);

const blog = new Blog({
  title: "Test title",
  author: "me",
  url: "https://example.com",
  likes: 999,
});

blog.save().then((result) => {
  console.log("saved");
  mongoose.connection.close();
});
