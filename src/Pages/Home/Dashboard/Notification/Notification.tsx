// import Footer from '../../../../Components/ui/Footer/Footer';
// import Navbar2 from '../../../../Components/ui/Navbar/Navbar2';
import { useDispatch, useSelector } from "react-redux";
import "./Notification.css";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useEffect } from "react";
import { fetchNotification } from "../../../../State/NotificationSlice";

// interface NotificationItem {
//   time: string;
//   title: string;
//   description: string;
//   date: string;
// }

const Notification = () => {
  const notification = useSelector(
    (state: RootState) => state.notification.data
  );

  const loading = useSelector((state: RootState) => state.notification.loading);
  const error = useSelector((state: RootState) => state.notification.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotification());
  }, []);

  // const notifications: NotificationItem[] = [
  //   {
  //     time: "09:00am",
  //     title: "Tortor et vel",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.",
  //     date: "23 - 04 - 2024",
  //   },
  //   {
  //     time: "03:40pm",
  //     title: "Tortor et vel",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.",
  //     date: "23 - 04 - 2024",
  //   },
  //   {
  //     time: "07:00am",
  //     title: "Tortor et vel",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.",
  //     date: "24 - 04 - 2024",
  //   },
  //   {
  //     time: "02:20pm",
  //     title: "Tortor et vel",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.",
  //     date: "24 - 04 - 2024",
  //   },
  //   {
  //     time: "04:40pm",
  //     title: "Tortor et vel",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.",
  //     date: "24 - 04 - 2024",
  //   },
  // ];

  return (
    <div className="notification-page">
      {/* <Navbar2/> */}
      {loading ? (
        <h2>Loading...</h2>
      ) : !loading && error ? (
        <h2>Something went wrong, check internet connection</h2>
      ) : (
        <>
          <div className="notification-header">
            <span className="back-arrow" onClick={() => window.history.back()}>
              ←
            </span>
            {/* <h2>Notification</h2> */}
          </div>

          <div className="notifications">
            {notification.message && <h2>{notification.message}</h2>}
            {notification.length > 0 &&
              notification.map((notification: any, index: any) => (
                <div key={index} className="notification-item">
                  <div className="notification-time">
                    <i className="clock-icon">⏲️</i>
                    <span>{notification.created_at}</span>
                  </div>
                  <div className="notification-content">
                    <h3 className="notification-title">{notification.title}</h3>
                    <p>{notification.message}</p>
                  </div>
                  <div className="notification-date">
                    <span>{notification.date}</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* <Footer/> */}
    </div>
  );
};

export default Notification;
