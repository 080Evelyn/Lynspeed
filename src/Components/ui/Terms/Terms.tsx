import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import './Terms.css'

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="terms">
        <h2>Terms and Conditions</h2>
        <ul className="termlist">
          <div className="start">
            <li>Introduction</li>
            <p>
              Welcome to Lynspeed, a JAMB simulation platform designed to help
              students in Nigeria prepare for their Joint Admissions and
              Matriculation Board (JAMB) exams. These Terms and Conditions
              govern your use of our website and services. By
              accessing or using the platform, you agree to comply with these
              Terms. If you do not agree to any part of these Terms, you must
              discontinue your use of the platform.
            </p>
          </div>
          <div className="start">
            <li>User Accounts</li>
            <p>
              To access certain features of the platform, users must create an
              account. You agree to provide accurate and current information
              during the registration process. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. If you suspect
              any unauthorized use of your account, you must notify us
              immediately. The platform is intended for use by students and
              individuals preparing for exams. By using the platform, you
              confirm that you meet the eligibility criteria and that your use
              will comply with all applicable laws and regulations.
            </p>
          </div>
          <div className="start">
            <li>User Conduct</li>
            <p>
              By using our platform, you agree to the following:
              <ul>
                <ol>
                  You will not use the platform for any illegal or unauthorized
                  purpose.
                </ol>
                <ol>
                  You will not misuse the platform by attempting to hack or
                  disrupt its functionality.
                </ol>
                <ol>
                  You will not share your account credentials with others or
                  allow others to use your account.
                </ol>
                <ol>
                  You will not attempt to cheat or manipulate the results of the
                  simulation exams.
                </ol>
              </ul>
              Any violation of these rules may result in the immediate
              suspension or termination of your account, at our discretion.
            </p>
          </div>
          <div className="start">
            <li>Fees and Payments</li>
            <p>
              Lynspeed may offer both free and paid services. Any
              fees associated with premium features or services will be clearly
              displayed on our website. Payments for these services are
              non-refundable unless otherwise specified. We reserve the right to
              change the pricing of any premium services. If you have purchased
              a subscription or access to paid services, any changes in pricing
              will not affect your current subscription period but may apply to
              future renewals.
            </p>
          </div>
          <div className="start">
            <li>Intellectual Property</li>
            <p>
              All content available on the platform, including but not limited
              to text, graphics, logos, images, and software, is the exclusive
              property of Lynspeed. This content is protected by
              intellectual property laws, and you may not copy, reproduce,
              distribute, or create derivative works from any part of the
              platform without our express permission. Users are granted a
              limited license to access and use the platform solely for personal
              and non-commercial purposes. Any unauthorized use of the
              platform's content will result in the termination of this license.
            </p>
          </div>
          <div className="start">
            <li>Privacy</li>
            <p>
              We are committed to protecting your privacy. Our platform collects
              and uses personal data, including but not limited to your name,
              email address, and performance data, in accordance with our
              Privacy Policy. This data is collected to improve user experience
              and provide personalized services. We take appropriate measures to
              safeguard the personal data you provide, but we cannot guarantee
              the absolute security of your information. For more details on how
              we handle your data, please refer to our Privacy Policy.
            </p>
          </div>
          <div className="start">
            <li>Performance and Results</li>
            <p>
            The platform offers simulated exams that aim to reflect real-life
            JAMB scenarios. While we make every effort to provide accurate
            simulations, we do not guarantee that the results you achieve on the
            platform will match your actual performance in the official JAMB
            exams. We are not liable for any consequences that arise from the
            use of our simulations, including any negative outcomes on the
            actual JAMB exam. The simulation is a tool to help you practice and
            prepare, but it should not be relied upon as the sole means of exam
            preparation.
            </p>
          </div>
          <div className="start">
            <li>Limitation of liability</li>
            <p>
              The platform and all its services are provided on an "as is" and
              "as available" basis. We make no warranties or representations,
              either express or implied, regarding the functionality, accuracy,
              or reliability of the platform. To the fullest extent permitted by
              law, we disclaim any liability for damages arising from the use of
              the platform, including but not limited to loss of data, business
              interruptions, or any other indirect, incidental, or consequential
              damages. Our liability to you for any claims arising out of or
              related to your use of the platform will not exceed the amount you
              have paid (if any) for access to the platform.
            </p>
          </div>
          <div className="start">
            <li>Modification to the Platform</li>
            <p>
              We reserve the right to modify, update, or discontinue any part of
              the platform at any time without notice. This includes but is not
              limited to changes in content, features, pricing, or availability.
              We are not liable for any disruptions or changes that affect your
              use of the platform.
            </p>
          </div>
          <div className="start">
            <li>Termination</li>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the platform at any time, without prior notice, for
              conduct that we believe violates these Terms or is otherwise
              harmful to the platform or other users. If your account is
              terminated, you will not be entitled to any refunds of fees paid,
              and you will be barred from re-registering for the platform.
            </p>
          </div>
          <div className="start">
            <li>Governing Law</li>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the Federal Republic of Nigeria. Any
              disputes arising under or related to these Terms will be resolved
              in the Nigerian courts.
            </p>
          </div>
          <div className="start">
            <li>Third-Party Services</li>
            <p>
              Our platform may contain links to third-party websites or services
              that are not owned or controlled by Lynspeed. We are
              not responsible for the content, privacy policies, or practices of
              any third-party sites or services. By using the platform, you
              acknowledge that Lynspeed is not responsible or liable
              for any damages or losses caused by your use of third-party
              services.
            </p>
          </div>
          <div className="start">
            <li>Changes to these Terms</li>
            <p>
              We may revise these Terms from time to time to reflect changes in
              our services or legal requirements. If we make significant changes
              to the Terms, we will notify you by posting the updated Terms on
              the platform. Your continued use of the platform after the changes
              take effect constitutes your acceptance of the revised Terms.
            </p>
          </div>
        </ul>
      </div>
      <Footer/>
    </>
  );
};

export default Terms;
