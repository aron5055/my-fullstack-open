const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

const users = [
  {
    name: "aron",
    username: "aronyang",
    password: "test12345",
  },
  {
    name: "jack",
    username: "jack202",
    password: "imjackyeah",
  },
];

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "fake",
    author: "nobody",
    url: "example.com",
  });

  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const response = await Blog.find({});
  return response.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const response = await User.find({});
  return response.map((user) => user.toJSON());
};

const getToken = async (username, password) => {
  const response = await api.post("/api/login").send({ username, password });
  return response.body.token;
};

const getRandomToken = async () => {
  const user = users[Math.floor(Math.random() * users.length)];
  return await getToken(user.username, user.password);
};

module.exports = {
  nonExistingId,
  blogsInDb,
  blogs,
  users,
  usersInDb,
  getRandomToken,
};
