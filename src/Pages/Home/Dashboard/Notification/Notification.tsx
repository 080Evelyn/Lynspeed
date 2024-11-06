import Footer from '../../../../Components/ui/Footer/Footer';
import Navbar2 from '../../../../Components/ui/Navbar/Navbar2';
import './Notification.css'; 


interface NotificationItem {
  time: string;
  title: string;
  description: string;
  date: string;
}

   
const Notification = () => {
  
  const notifications: NotificationItem[] = [
    {
      time: '09:00am',
      title: 'Tortor et vel',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.',
      date: '23 - 04 - 2024',
    },
    {
      time: '03:40pm',
      title: 'Tortor et vel',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.',
      date: '23 - 04 - 2024',
    },
    {
      time: '07:00am',
      title: 'Tortor et vel',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.',
      date: '24 - 04 - 2024',
    },
    {
      time: '02:20pm',
      title: 'Tortor et vel',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.',
      date: '24 - 04 - 2024',
    },
    {
      time: '04:40pm',
      title: 'Tortor et vel',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor et vel tellus massa justo tristique. Non vel vehicula sed consectetur scelerisque donec. Tortor purus pellentesque scelerisque hac.',
      date: '24 - 04 - 2024',
    },
  ];

  return (
    <div className="notification-page">
    <Navbar2/>

      <div className="notification-header">
        <h2>Notification</h2>
      </div>

      <div className="notifications">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-time">
              <i className="clock-icon">⏲️</i>
              <span>{notification.time}</span>
            </div>
            <div className="notification-content">
              <h3 className="notification-title">{notification.title}</h3>
              <p>{notification.description}</p>
            </div>
            <div className="notification-date">
              <span>{notification.date}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Notification;
