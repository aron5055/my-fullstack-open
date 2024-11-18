const _ = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((x, y) => x + y, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((x, y) => (x.likes < y.likes ? y : x));
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const count = (arr, prop, fn) => {
  const map = new Map();
  for (const elem of arr) {
    const p = elem[prop];
    if (map.has(p)) {
      map.set(p, map.get(p) + fn(elem));
    } else {
      map.set(p, fn(elem));
    }
  }
  return map;
};

const mostBlogsWithoutLodash = (blogs) => {
  const map = count(blogs, "author", () => 1);

  let o = { author: "", blogs: 0 };
  for (const [author, nums] of map.entries()) {
    if (nums > o.blogs) {
      o.author = author;
      o.blogs = nums;
    }
  }
  return o;
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");

  const maxAuthor = _.maxBy(
    Object.entries(authorCounts),
    ([_, count]) => count
  );
  return {
    author: maxAuthor[0],
    blogs: maxAuthor[1],
  };
};

const mostLikesWithoutLodash = (blogs) => {
  const map = count(blogs, "author", (blog) => blog.likes);

  let o = { author: "", likes: 0 };
  for (const [author, likes] of map.entries()) {
    if (o.likes < likes) {
      o.author = author;
      o.likes = likes;
    }
  }
  return o;
};

const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, "author");
  const likeSums = _.mapValues(authorLikes, (blogs) => _.sumBy(blogs, "likes"));

  const maxAuthor = _.maxBy(Object.entries(likeSums), ([_, likes]) => likes);

  return {
    author: maxAuthor[0],
    likes: maxAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsWithoutLodash,
  mostLikes,
  mostLikesWithoutLodash,
};
