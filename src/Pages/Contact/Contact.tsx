import { useState } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Contact.css";
import Footer from "../../Components/ui/Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h3>Contact Support</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Eg. example"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="contact-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Eg. xxxxxxx@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="contact-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Eg. 08140003000"
              value={formData.phone}
              onChange={handleInputChange}
              className="contact-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message*</label>
            <textarea
              rows={7}
              cols={57}
              id="message"
              name="message"
              placeholder="Please enter your comments......"
              value={formData.message}
              onChange={handleInputChange}
              className="contact-textarea"
            ></textarea>
          </div>
          <button type="submit" className="contact-submit">
            Submit
          </button>
        </form>
       
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
