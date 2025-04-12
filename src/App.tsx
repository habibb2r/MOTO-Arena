
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
  <div>
      
      <div className="bg-myGradient text-black  min-h-screen ">
        <Navbar></Navbar>
        <div className='resOutLet'>

        <Outlet></Outlet>
        </div>
        <Footer/>
      </div>
    </div>
    </>
    
  );
}

export default App;
