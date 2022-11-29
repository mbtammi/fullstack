import "../index.css";

const Notification = ({ message, style }) => {
  if (message === null) {
    return <div></div>;
  }

  return <div className={style}>{message}</div>;
};

export default Notification;
