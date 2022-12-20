import "../index.css";

const Notification = ({ message, typeOf }) => {
  if (message === null) {
    return null;
  }

  return <div className={typeOf}>{message}</div>;
};

export default Notification;

