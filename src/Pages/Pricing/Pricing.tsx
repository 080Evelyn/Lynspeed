 import Footer from "../../Components/ui/Footer/Footer";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Pricing.css";

const Pricing = () => {
  return (
    <>
      <Navbar/>
      <h1 className="pricing-title">Pricing List</h1>
      <div className="pricing-cards">
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