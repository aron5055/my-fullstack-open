const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const supertest = require("supertest");
const User = require("../models/user");
const helper = require("./test_helper");
const mongoose = require("mongoose");

const api = supertest(app);

describe("when db have some users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.users);
  });

  const testInvalidUser = async (user, description) => {
    test(`try add invalid user: ${description}`, async () => {
      const beforePost = await helper.usersInDb();

      await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const afterPost = await helper.usersInDb();
      assert.strictEqual(afterPost.length, beforePost.length);
    });
  };

  const invalidUsers = [
    {
      user: {
        name: "aron",
        username: "aronyang",
        password: "test12345",
      },
      description: "same username",
    },
    {
      user: {
        name: "Jhon",
        username: "ho",
        passowrd: "13876654",
      },
      description: "username length less 3 characters",
    },
    {
      user: {
        name: "Jhon",
        username: "jhon780",
        passowrd: "hi",
      },
      description: "password length less 3 characters",
    },
  ];

  invalidUsers.forEach(({ user, description }) => {
    testInvalidUser(user, description);
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
