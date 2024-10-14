
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/selffront5.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="Logo"  style={{width:"85px"}}/>
        <ul className="nav-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        </ul>
        <div className="nav-login"><Link to="/login">Login</Link></div>
    </div>
  )
}

export default Navbar