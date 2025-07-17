import React, { useEffect } from "react";
import "./Privacy.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Privacy: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="privacy">
        <div className="first">
          <h2 className="head">Privacy Policy </h2>
          <p>
            Thank you for using Lynspeed. Your privacy is important to us, and
            we are committed to protecting your personal information. This
            privacy policy outlines how we collect, use, disclose, and protect
            your information when you use our website.
          </p>
        </div>

        <div className="set">
          <h2>1. Information We Collect</h2>
          <p>
            We collect various types of information to provide and improve our
            services, including:
          </p>

          <h3>a. Personal Information</h3>
          <ul>
            <li>
              <strong>Registration Data:</strong> When you create an account, we
              collect information such as your name, email address, password,
              and any other details you provide.
            </li>
            <li>
              <strong>Contact Information:</strong> When you contact us for
              support or inquiries, we may collect information such as your
              email address, phone number.
            </li>
          </ul>

          <h3>b. Non-Personal Information</h3>
          <ul>
            <li>
              <strong>Usage Data:</strong> We collect information on how the
              website is accessed and used, such as your device type, IP
              address, browser type, usage times, and pages visited.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use
              cookies, web beacons, and other tracking technologies to collect
              information and improve your experience.
            </li>
          </ul>
        </div>
        <div className="set">
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>
              <strong>To provide and maintain the website:</strong> Ensuring
              smooth operation and access to all features.
            </li>
            <li>
              <strong>To personalize your experience:</strong> Showing tailored
              content based on your interactions.
            </li>
            <li>
              <strong>To improve the website:</strong> Using analytical data to
              improve our services and functionalities.
            </li>
            <li>
              <strong>To communicate with you:</strong> Sending updates,
              promotional offers, security alerts, or customer service-related
              communication.
            </li>
            <li>
              <strong>To ensure security and prevent fraud:</strong> Using
              information to safeguard against unauthorized use or potential
              security issues.
            </li>
          </ul>
        </div>
        <div className="set">
          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information. However,
            we may share your information in the following situations:
          </p>
          <ul>
            <li>
              <strong>With service providers:</strong> Third-party companies
              that help us operate the website or provide services (e.g.,
              hosting providers, email services, payment gateways).
            </li>
            <li>
              <strong>Legal Obligations:</strong> If required by law or in
              response to legal processes (e.g., subpoenas or court orders).
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a
              merger, acquisition, or sale of assets, your information may be
              transferred as part of the business transaction.
            </li>
          </ul>
        </div>
        <div className="set">
          <h2>4. Security of Your Information</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, and destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
        <div className="set">
          <h2>5. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access and Update Your Information:</strong> You can
              access and update your account information at any time within the
              website.
            </li>
            <li>
              <strong>Request Deletion:</strong> You can request the deletion of
              your account and personal data by contacting us directly.
            </li>
            <li>
              <strong>Opt-Out:</strong> You may opt out of receiving promotional
              communications by following the unsubscribe instructions in emails
              or contacting us.
            </li>
          </ul>
        </div>
        <div className="set">
          <h2>6. Children's Privacy</h2>
          <p>
            Our website is not directed to individuals under the age of 13. We
            do not knowingly collect personal information from children under
            13. If we become aware of such information, we will take steps to
            delete it.
          </p>
        </div>
        <div className="set">
          <h2>7. Third-Party Links</h2>
          <p>
            The website may contain links to third-party websites or services.
            We are not responsible for the privacy practices or the content of
            those third-party sites.
          </p>
        </div>
        <div className="set">
          <h2>8. Changes to this Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page.
            We recommend checking this page periodically for updates.
          </p>
        </div>
        <div className="set">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this privacy policy,
            please contact us at:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@yourwebsitedomain.com
            </li>
            <li>
              <strong>Phone:</strong> +123 456 7890
            </li>
            <li>
              <strong>Address:</strong> Your Office Address
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
