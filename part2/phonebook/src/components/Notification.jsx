const Notification = ({ message, error }) => {
  if (!message) {
    return null;
  }

  const classes = `notification ${error ? "error" : "normal"}`;
  return <div className={classes}>{message}</div>;
};

export default Notification;
