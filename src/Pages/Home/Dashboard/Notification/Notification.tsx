// import Footer from '../../../../Components/ui/Footer/Footer';
// import Navbar2 from '../../../../Components/ui/Navbar/Navbar2';
import { useDispatch, useSelector } from "react-redux";
import "./Notification.css";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useEffect } from "react";
import { fetchNotification } from "../../../../State/NotificationSlice";

import BtnNotify from "./BtnNotify";

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
  const notificationsArray = Array.isArray(notification) ? notification : [];
  const sortedNotifications = [...notificationsArray].reverse();
  return (
    <div className="notification-page">
      {/* <Navbar2/> */}
      {loading ? (
        <h2 style={{ textAlign: "center", paddingTop: "5px" }}>Loading...</h2>
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

          <div className="notifications ">
            {notification.message && <h2>{notification.message}</h2>}
            {notification.length > 0 &&
              sortedNotifications.map((notification: any, index: any) => (
                <div key={index} className="notification-item">
                  <div className="notification-time">
                    <i className="clock-icon">⏲️</i>
                    <span>{notification.created_at}</span>
                  </div>
                  <div className="notification-content">
                    <h3 className="notification-title">{notification.title}</h3>
                    {!notification.is_read && (
                      <>
                        <p>{notification.snippet}</p>
                        <BtnNotify id={notification.id} />
                      </>
                    )}
                    {notification.is_read && <p>{notification.message}</p>}
                  </div>
                  <div className="notification-date">
                    <span>{notification.date}</span>
                  </div>
                  {!notification.is_read && <span className="notified"></span>}
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
