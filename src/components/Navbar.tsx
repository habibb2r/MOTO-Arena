import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isAuthenticated, logout, useCurrentUser } from '../redux/features/auth/authSlice';
import { Divider, Drawer, Tooltip } from 'antd';
import { useState } from 'react';
import './nav.css'
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const isLogin = useAppSelector(isAuthenticated);
    const user = useAppSelector(useCurrentUser);
   
    const dispatch = useAppDispatch()
  return (
    <nav className="fixed  w-full mx-auto flex justify-between items-center px-6 py-4 shadow-md navbar text-black font-semibold">
      {/* Logo */}
      <Link to="/">
        <img className="h-[50px]" src={logo} alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <div className='forPc'>
      <ul className="flex gap-6 items-center font-semibold">
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
      </div>

      {/* Login Button */}
      <div className="flex gap-4">
        {
          isLogin? 
            <div className="flex gap-4 items-center">
             <button onClick={showDrawer}>
             <img className="w-10 h-10 shadow-xl shadow-green-500 rounded-full border-2 border-green-600" src={user?.photoURL} alt="" />
             </button>
          
        </div> : <div className='flex gap-4 items-center'>
        <Tooltip placement="bottom" title={`No User`}>
             <img className="w-10 h-10 shadow-xl shadow-green-500 rounded-full forPc" src={user?.photoURL} alt="" />
             </Tooltip>
            <Link to={"/login"}>
          <button className="border px-4 py-1 rounded hover:bg-green-300">
            Login
          </button>
        </Link>
          </div>
        }

    <Drawer title="Actions" onClose={onClose} open={open}>
    <ul className="forPhone font-semibold">
        {[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'About Us', path: '/about-us' },
        ].map((link) => (
          <li key={link.name}>
            <NavLink onClick={() => setOpen(!open)}
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
        <Divider></Divider>
      </ul>
      
        <Link onClick={() => setOpen(!open)} className='px-3 py-2 border-2 border-gray-300 rounded-2xl font-semibold' to={`/dashboard/${user?.role}`}>Dashboard</Link>
        <Divider></Divider>
        <button onClick={() => dispatch(logout())} className="bg-[#862020] text-white px-4 py-1 rounded">Logout</button>
      </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
