import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import './NavBar.css';
function NavBar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/Fisico">Fisico</Link>
      <Link to="/Digital">Digital</Link>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
