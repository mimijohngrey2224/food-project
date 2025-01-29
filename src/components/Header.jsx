import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MenuContext } from '../context/MenuContext';
import abibiz1 from '../assets/abibiz1 logo.jpg';
import avatar from '../assets/avatar.png'; // Fallback avatar
import SignupLogin from '../components/pages/SignupLogin';
import ProfileForm from '../components/pages/profileForm';
import { MdOutlineCancel } from "react-icons/md";

function Header() {
  const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bar, setBar] = useState(false)
  

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('auth-token');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.firstName || 'User');
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    } else {
      setUserName('User');
      setIsLoggedIn(false);
    }
    
    if (token) {
      getUserProfile(); // Fetch profile
    }
  }, [getUserProfile]);

  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.firstName || 'User');
    }
  }, [userProfile]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUserName('User');
    setIsLoggedIn(false);
    setShowLogoutMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-4">
          <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Courier's</h1>
        </div>

        <div className='lg:hidden'>
          {bar}

        </div>
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
          <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
          <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
            <BsFillCartPlusFill className="text-2xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {(cartItems?.menus?.reduce((total, item) => total + (Number(item.quantity) || 0), 0)) || 0}

            </div>
          </Link>
          {isLoggedIn ? (
            <div className="text-lg font-medium flex items-center gap-2 relative">
              <img
                src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
                alt="Profile"
                className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setShowProfileForm(!showProfileForm)}
              />
              <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
              <div className="relative group">
                <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={() => setShowLogoutMenu(!showLogoutMenu)}>logout</p>
                {showLogoutMenu && (
                  <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
                    <button
                      className="w-full text-red-600 hover:bg-gray-100 rounded py-1 px-2"
                      onClick={handleLogout}
                    >
                       Confirm Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

) : (
  <div className="relative group">
    <p onClick={() => setShowSignupLogin(!showSignupLogin)} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>
      SignUp
    </p>
    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xb py-2 px-3 rounded">
      Login
    </div>
  </div>
)}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
         
          <RiMenu4Fill />
        </button>
      </div>   
    {/* Mobile Menu Dropdown */}
    <div className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform       transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="flex flex-col items-center gap-6 mt-20">
      <MdOutlineCancel onClick={() => setOpen(false)} className='absolute z-50 top-[40px] right-[40px] text-xl cursor-pointer hover:text-purple-500 transition-colors duration-300' />
      <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" onClick={() => setOpen(false)}>Restaurant</Link>
      <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" onClick={() => setOpen(false)}>Menu</Link>
      <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
        <BsFillCartPlusFill className="text-2xl" />
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {(cartItems?.menus?.reduce((total, item) => total + (Number(item.quantity) || 0), 0)) || 0}

        </div>
      </Link>
        {isLoggedIn ? (
          <div className="text-2xl font-medium flex flex-col items-center gap-2 relative">
            <img
              src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
              alt="Profile"
              className="h-12 w-12 rounded-full"
              onClick={() => setShowProfileForm(!showProfileForm)}
            />
            <p>Hi, {userName}!</p>
            {/* {userName && <p>{userName}</p>}  // username appears regardless of profile image 14 december */}

            <div className="relative">
              <div onClick={() => setShowLogoutMenu(!showLogoutMenu)} className="cursor-pointer hover:text-purple-500 transition-colors duration-300">Logout</div>
              {showLogoutMenu && (
                <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
                  <button
                    className="w-full text-red-600 hover:bg-gray-100 rounded py-2 px-3"
                    onClick={handleLogout}
                  >
                    Confirm Logout
                  </button>
                </div>
              )}
            </div>
          </div>
    ) : (
      <div className="text-2xl font-medium cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => setShowSignupLogin(true)}>
        SignUp / Login
      </div>
    )}
  </nav>
</div>
      {/* Signup/Login Overlay */}
      {showSignupLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupLogin onClose={() => setShowSignupLogin(false)} />
        </div>
      )}

      {/* Profile Form Overlay */}
      {showProfileForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ProfileForm onClose={() => setShowProfileForm(false)} userProfile={userProfile} />
        </div>
      )}
    </header>
  );
}

export default Header;
