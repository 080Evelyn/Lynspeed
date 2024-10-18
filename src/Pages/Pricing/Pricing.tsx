import Footer from "../../Components/ui/Footer/Footer";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Pricing.css";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <h1 className="pricing-title">Pricing List</h1>
      <div className="pricing-cards grid-cols-1 md:grid-cols-3 container mx-auto px-5">
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★</div>
          </div>
          <div className="card-body">
            <h2>FREE</h2>
            <h3>₦0</h3>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button>Get Started</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★</div>
          </div>
          <div className="card-body">
            <h2>WEEKLY</h2>
            <h3>₦600</h3>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button>Get Started</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★★</div>
          </div>
          <div className="card-body">
            <h2>MONTHLY</h2>
            <h3>₦2000</h3>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button>Get Started</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
