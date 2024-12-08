import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Contact.css";
import Footer from "../../Components/ui/Footer/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };    

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend endpoint
      await axios.post('https://lynspeed.pythonanywhere.com/api/v1/contact-support', formData);
      setStatusMessage("Message sent successfully!");
    } catch (error: unknown) {
      // Type guard for AxiosError
      if (axios.isAxiosError(error)) {
        setStatusMessage("There was an error sending your message. Please try again later.");
      } else {
        setStatusMessage("An unexpected error occurred.");
      }
    }
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

          {/* <div className="form-group">
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
          </div> */}

          <div className="form-group">
            <label htmlFor="message">Message*</label>
            <textarea
              rows={7}
              
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
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Contact;
