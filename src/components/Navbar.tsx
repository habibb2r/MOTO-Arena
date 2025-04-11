import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isAuthenticated, logout, useCurrentUser } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const isLogin = useAppSelector(isAuthenticated);
    const user = useAppSelector(useCurrentUser);
   
    const dispatch = useAppDispatch()
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
        {
          isLogin? <div className="flex gap-4 items-center">
          <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="" />
          <button onClick={() => dispatch(logout())} className="bg-[#862020] text-white px-4 py-1 rounded">Logout</button>
        </div> : <div className='flex gap-4 items-center'>
            <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="" />
            <Link to={"/login"}>
          <button className="border px-4 py-1 rounded hover:bg-green-300">
            Login
          </button>
        </Link>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
