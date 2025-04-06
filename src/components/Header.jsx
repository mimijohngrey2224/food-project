

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MenuContext } from '../context/MenuContext';
import abibiz1 from '../assets/abibiz1 logo.jpg';
import avatar from '../assets/avatar.png';
import SignupLogin from '../components/pages/SignupLogin';
import ProfileForm from '../components/pages/profileForm';
import { MdOutlineCancel } from "react-icons/md";

function Header() {
  const { cartItems, url, userProfile, getUserProfile, loading } = useContext(MenuContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bar, setBar] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      const userData = localStorage.getItem('user');
      
      setIsLoggedIn(!!token);
      
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.firstName || 'User');
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
      
      if (token) {
        getUserProfile().catch(error => {
          console.error('Failed to fetch profile:', error);
        });
      }
    };

    checkAuth();
    
    // Listen for storage changes to handle logout from other tabs
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.firstName || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUserName('User');
    setIsLoggedIn(false);
    setShowLogoutMenu(false);
    navigate('/');
    window.location.reload();
  };

  const getProfileImage = () => {
    if (!userProfile?.image) return avatar;
    // Check if image is a full URL (for social logins) or needs the uploads path
    if (userProfile.image.startsWith('http')) {
      return userProfile.image;
    }
    return `${url}/uploads/${userProfile.image}`;
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between p-4 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <Link to="">
            <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
          </Link>
          <Link to="">
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Courier's</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
          <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
          <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
            <BsFillCartPlusFill className="text-2xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems?.menus?.reduce((total, item) => total + (Number(item.quantity) || 0), 0) || 0}
            </div>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileForm(true)}>
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    e.target.src = avatar;
                  }}
                />
                <span className="text-white">
                  {loading ? '...' : userName ? `Hi ${userName}` : 'Profile'}
                </span>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  className="px-3 py-1 bg-opacity-20 rounded hover:bg-opacity-30 transition"
                >
                  Logout
                </button>
                {showLogoutMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded p-2 min-w-[150px]">
                    <p className="text-gray-700 p-2">Confirm logout?</p>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => setShowLogoutMenu(false)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-3 py-1 text-white bg-purple-500 rounded hover:bg-purple-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowSignupLogin(true)}
              className="px-4 py-2 text-white font-medium transition"
            >
              Sign Up / Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
          <RiMenu4Fill />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col items-center gap-6 mt-20">
          <MdOutlineCancel 
            onClick={() => setOpen(false)} 
            className='absolute top-10 right-10 text-2xl cursor-pointer hover:text-purple-500 transition-colors duration-300' 
          />
          
          <Link to="/" className="text-xl font-medium hover:text-purple-500 transition-colors duration-300" onClick={() => setOpen(false)}>
            Restaurant
          </Link>
          
          <Link to="/menu" className="text-xl font-medium hover:text-purple-500 transition-colors duration-300" onClick={() => setOpen(false)}>
            Menu
          </Link>
          
          <Link to="/cart" className="text-xl font-medium hover:text-purple-500 transition-colors duration-300 relative" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2">
              <BsFillCartPlusFill />
              {/* <span>Cart</span> */}
              <div className="absolute -top-2 -right-6 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems?.menus?.reduce((total, item) => total + (Number(item.quantity) || 0), 0) || 0}
              </div>
            </div>
          </Link>

          {isLoggedIn ? (
            <>
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setShowProfileForm(true);
                  setOpen(false);
                }}
              >
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover"
                  onError={(e) => {
                    e.target.src = avatar;
                  }}
                />
                <span className="text-gray-700">
                  {loading ? '...' : userName ? `Hi ${userName}` : 'Profile'}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2  text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowSignupLogin(true);
                setOpen(false);
              }}
              className="px-4 py-2 text-black transition"
            >
              Sign Up / Login
            </button>
          )}
        </nav>
      </div>

      {/* Modals */}
      {showSignupLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupLogin onClose={() => setShowSignupLogin(false)} />
        </div>
      )}

      {showProfileForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ProfileForm onClose={() => setShowProfileForm(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;
