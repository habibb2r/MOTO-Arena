import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-myGradient text-black font-semibold">
      {/* Logo */}
      <Link to="/">
        <img className="h-[50px]" src={logo} alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        {[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'About Us', path: '/about-us' },
        ].map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-green-800 pb-1 rounded-md'
                  : 'hover:text-violet-800'
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="border px-4 py-1 rounded hover:bg-green-300">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
