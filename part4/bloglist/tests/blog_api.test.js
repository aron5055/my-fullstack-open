const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany();
    await Blog.insertMany(helper.blogs);
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

      const beforeAdd = await helper.blogsInDb();

      await api
        .post("/api/blogs")
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

      const response = await api
        .post("/api/blogs")
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

      await api.post("/api/blogs").send(missTitle).expect(400);
      await api.post("/api/blogs").send(missUrl).expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.blogs.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204", async () => {
      const blogAtStart = await helper.blogsInDb();
      const blog = blogAtStart[0];

      await api.delete(`/api/blogs/${blog.id}`).expect(204);

      const blogAtEnd = await helper.blogsInDb();
      const titles = blogAtEnd.map((b) => b.title);

      assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1);
      assert(!titles.includes(blog.title));
    });
  });

  describe("update blog", () => {
    test("update likes", async () => {
      const blogs = await helper.blogsInDb();
      const blog = blogs[0];

      await api
        .put(`/api/blogs/${blog.id}`)
        .send({
          ...blog,
          likes: blog.likes + 1,
        })
        .expect("Content-Type", /application\/json/);

      const updated = await helper.blogsInDb();
      const updatedBlog = updated.filter((b) => b.id === blog.id);
      assert.strictEqual(blog.likes, updatedBlog[0].likes - 1);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const nonExistingId = await helper.nonExistingId();
      await api
        .put(`/api/blogs/${nonExistingId}`)
        .send({ likes: 0 })
        .expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
