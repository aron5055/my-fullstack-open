import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ updateBlogs, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNote = async (event) => {
    event.preventDefault();

    const blog = await blogService.create({ title, author, url }, token);
    updateBlogs(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <p>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
