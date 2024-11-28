import Notification from "./Notification";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  info,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification info={info} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            name="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
