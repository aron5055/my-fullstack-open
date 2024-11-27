const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany();
    await User.deleteMany();
    for (let user of helper.users) {
      await api.post("/api/users").send(user);
    }
    for (let blog of helper.blogs) {
      const token = await helper.getRandomToken();
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blog);
    }
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.blogs.length);
  });

  test("check blog id property", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
      assert(blog.id);
      assert(!blog._id);
    });
  });

  describe("adding a new blog", () => {
    test("success with valid data", async () => {
      let newBlog = {
        title: "The Art of Being Alone",
        author: "fsblog",
        url: "https://fs.blog/being-alone/",
        likes: 5,
      };

      const token = await helper.getRandomToken();
      const beforeAdd = await helper.blogsInDb();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const added = await helper.blogsInDb();
      const titles = added.map((b) => b.title);
      assert(titles.includes(newBlog.title));
      assert.strictEqual(added.length, beforeAdd.length + 1);
    });

    test("add blog without likes", async () => {
      const newBlog = {
        title: "fake",
        author: "nobody",
        url: "https://example.com",
      };

      const token = await helper.getRandomToken();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();
      const added = blogs.find((b) => b.id === response.body.id);

      assert.strictEqual(added.likes, 0);
      assert.strictEqual(added.title, newBlog.title);
    });

    test("blog missing title or url should return status 400", async () => {
      let missTitle = {
        url: "www.google.com",
        author: "google",
      };
      let missUrl = {
        title: "google",
        author: "google",
      };

      const token = await helper.getRandomToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(missTitle)
        .expect(400);
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(missUrl)
        .expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.blogs.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204", async () => {
      const token = await helper.getRandomToken();
      const newBlog = {
        title: "Test delete Blog",
        author: "Delete Tester",
        url: "https://example.com",
        likes: 0,
      };
      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);
      const blogToDelete = response.body;

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogs = await helper.blogsInDb();
      const titles = blogs.map((b) => b.title);

      assert(!titles.includes(blogToDelete.title));
    });
  });

  describe("update blog", () => {
    test("update likes", async () => {
      const token = await helper.getRandomToken();
      const blog = {
        title: "Test update Blog",
        author: "Update Tester",
        url: "https://example.com",
        likes: 0,
      };
      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blog)
        .expect(201);

      const updatedResponse = await api
        .put(`/api/blogs/${response.body.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...blog,
          likes: blog.likes + 1,
        })
        .expect("Content-Type", /application\/json/)
        .expect(200);

      const blogs = await helper.blogsInDb();
      const updatedBlog = blogs.filter((b) => b.id === response.body.id);
      assert.strictEqual(updatedResponse.body.likes, updatedBlog[0].likes);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const nonExistingId = await helper.nonExistingId();
      const token = await helper.getRandomToken();
      await api
        .put(`/api/blogs/${nonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ likes: 0 })
        .expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
