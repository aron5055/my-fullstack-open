const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "password at least 3 characters" });
  }
  const saltround = 10;
  const passwordHash = await bcrypt.hash(password, saltround);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

module.exports = userRouter;
