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
    <div>
      <Navbar />
      <div className="contact-container container mx-auto grid place-content-center text-center py-10 space-y-10">
        <h3>Contact Support</h3>
        <form
          className="max-w-md space-y-4 px-5 md:px-0"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Eg. example"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Eg. xxxxxxx@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Eg. 08140003000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="message">Message*</label>
            <textarea
              rows={7}
              id="message"
              name="message"
              placeholder="Please enter your comments......"
              value={formData.message}
              onChange={handleInputChange}
              className="border p-4 w-full rounded-md"
            />
          </div>
          <button type="submit" className="contact-submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
