// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';
// import { AiOutlineLogin } from "react-icons/ai";
// import { AiOutlineLogout } from "react-icons/ai";
// import axios from 'axios';

// function Header() {
//   const { cartItems, url, userProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   // Calculate total items in cart
//   const totalItemsInCart = Array.isArray(cartItems) 
//   ? cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0) 
//   : 0;

//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
  
//   const [userName, setUserName] = useState('User'); // Default value as "User"
//   // const [profileImage, setProfileImage] = useState(null); // New state for profile image URL

//   // Toggle SignupLogin component
//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   // Close SignupLogin modal
//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   // Toggle ProfileForm component
//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   // Close ProfileForm modal
//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   // Toggle Logout Menu
//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User'); // Reset username to "User"
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       console.log('User data fetched:', userData); // Inspect the data
      
//       if (userData) {
//         if (typeof userData === 'string' && userData.trim() !== '') {
//           try {
//             const parsedData = JSON.parse(userData);
//             console.log('Parsed user data:', parsedData); // Inspect parsed data
            
//             if (parsedData && typeof parsedData === 'object') {
//               setUserName(parsedData.firstName || 'User');
//               // setProfileImage(parsedData.profileImage || null); // Set the profile image URL
//             } else {
//               console.warn('User data does not have a valid structure:', parsedData);
//               setUserName('User'); // Set default username
//             }
//           } catch (parseError) {
//             console.error('Failed to parse user data:', parseError);
//             setUserName('User'); // Set default username
//           }
//         } else {
//           console.warn('User data is not a valid JSON string');
//           setUserName('User'); // Set default username
//         }
//       } else {
//         console.warn('No user data found in local storage');
//         setUserName('User'); // Set default username
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//       setUserName('User'); // Set default username
//     }
//   };


  
//   useEffect(() => {
//     fetchUserData();
//     // fetchProfile();
//   }, []);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" >
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" >
//             Menu
//           </Link>
//           <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative" >
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart}
//             </div>
//           </Link>
//           <div className="text-lg font-medium flex items-center gap-2 relative">
//             <img
//               src={userProfile?.image ? `${url}/uploads/${userProfile.image}`: avatar} 
//               alt="Profile"
//               className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//               onClick={toggleProfileForm}
//             />
            
//             <p className="text-white ml-2 cursor-pointer" >
//               Hi, {userName}!
//             </p>
//             <div class="relative group">
//             <p className=' cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={toggleSignupLogin}><AiOutlineLogin /></p>
//             <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
//                   Login
//               </div>
//             </div>
//             <div class="relative group">
//             <p onClick={toggleLogoutMenu} className='cursor-pointer font-bold text-2xl px-4 py-2 text-white rounded' ><AiOutlineLogout /></p>
//             <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
//                   Logout
//               </div>
//             </div>
//             {showLogoutMenu && (
//               <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
//                 <button
//                   className="w-full text-red-600 hover:bg-gray-100 rounded py-2 px-4"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>
//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${
//           open ? 'opacity-50 pointer-events-auto' : ''
//         }`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${
//           open ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" >
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" >
//             Menu
//           </Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative" >
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart}
//             </div>
//           </Link>
//           <div onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" >
//             Login 
//           </div>
//           <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" >
//             Logout 
//           </div>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseSignupLogin}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={handleCloseSignupLogin} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseProfileForm}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={handleCloseProfileForm} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;






 




import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MenuContext } from '../context/MenuContext';
import abibiz1 from '../assets/abibiz1 logo.jpg';
import avatar from '../assets/avatar.png'; // Fallback avatar
import SignupLogin from '../components/pages/SignupLogin';
import ProfileForm from '../components/pages/profileForm';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

function Header() {
  const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
  const navigate = useNavigate();
  
  // Calculate total items in cart
  const totalItemsInCart = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0) 
    : 0;

  const [open, setOpen] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
  
  const [userName, setUserName] = useState('User'); // Default value as "User"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  // Toggle SignupLogin component
  const toggleSignupLogin = () => {
    setShowSignupLogin(!showSignupLogin);
  };

  // Close SignupLogin modal
  const handleCloseSignupLogin = () => {
    setShowSignupLogin(false);
  };

  // Toggle ProfileForm component
  const toggleProfileForm = () => {
    setShowProfileForm(!showProfileForm);
  };

  // Close ProfileForm modal
  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  // Toggle Logout Menu
  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUserName('User'); // Reset username to "User"
    setIsLoggedIn(false); // Update login status
    navigate('/thanks');
  };

  const fetchUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      console.log('User data fetched:', userData); // Inspect the data
      
      if (userData) {
        if (typeof userData === 'string' && userData.trim() !== '') {
          try {
            const parsedData = JSON.parse(userData);
            console.log('Parsed user data:', parsedData); // Inspect parsed data
            
            if (parsedData && typeof parsedData === 'object') {
              setUserName(parsedData.firstName || 'User');
              setIsLoggedIn(true); // Update login status
              // setProfileImage(parsedData.profileImage || null); // Set the profile image URL
            } else {
              console.warn('User data does not have a valid structure:', parsedData);
              setUserName('User'); // Set default username
              setIsLoggedIn(false); // Update login status
            }
          } catch (parseError) {
            console.error('Failed to parse user data:', parseError);
            setUserName('User'); // Set default username
            setIsLoggedIn(false); // Update login status
          }
        } else {
          console.warn('User data is not a valid JSON string');
          setUserName('User'); // Set default username
          setIsLoggedIn(false); // Update login status
        }
      } else {
        console.warn('No user data found in local storage');
        setUserName('User'); // Set default username
        setIsLoggedIn(false); // Update login status
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUserName('User'); // Set default username
      setIsLoggedIn(false); // Update login status
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch user profile when the component mounts
    getUserProfile();
    
    // Update login status based on the presence of token
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
  }, [getUserProfile]);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-4">
          <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
            Restaurant
          </Link>
          <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
            Menu
          </Link>
          <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
            <BsFillCartPlusFill className="text-2xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItemsInCart}
            </div>
          </Link>
          {isLoggedIn ? (
            <div className="text-lg font-medium flex items-center gap-2 relative">
              <img
                src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
                alt="Profile"
                className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
                onClick={toggleProfileForm}
              />
              <p className="text-white ml-2 cursor-pointer">
                Hi, {userName}!
              </p>
              <div className="relative group">
                <p className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={toggleLogoutMenu}><AiOutlineLogout /></p>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
                  Logout
                </div>
              </div>
              {showLogoutMenu && (
                <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
                  <button
                    className="w-full text-red-600 hover:bg-gray-100 rounded py-2 px-4"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-lg font-medium flex items-center gap-2">
              <p onClick={toggleSignupLogin} className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded'>
                {/* <AiOutlineLogin /> */}
              </p>
              <div className="relative group">
                <p className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={toggleSignupLogin}><AiOutlineLogin /></p>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
                  Login
                </div>
              </div>
            </div>
          )}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
          <RiMenu4Fill />
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${
          open ? 'opacity-50 pointer-events-auto' : ''
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 mt-20">
          <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
            Restaurant
          </Link>
          <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
            Menu
          </Link>
          <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
            <BsFillCartPlusFill className="text-xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItemsInCart}
            </div>
          </Link>
          {!isLoggedIn && (
            <div onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
              Login
            </div>
          )}
          {isLoggedIn && (
            <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
              Logout
            </div>
          )}
          <img
                src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
                alt="Profile"
                className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
                onClick={toggleProfileForm}
              />
              <p className="text-white ml-2 cursor-pointer">
                Hi, {userName}!
              </p>
        </nav>
      </div>

      {/* Signup/Login Overlay */}
      {showSignupLogin && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={handleCloseSignupLogin}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative">
              <SignupLogin onClose={handleCloseSignupLogin} />
            </div>
          </div>
        </>
      )}

      {/* Profile Form Overlay */}
      {showProfileForm && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={handleCloseProfileForm}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative">
              <ProfileForm onClose={handleCloseProfileForm} />
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;


// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';
// import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
  
//   const [userName, setUserName] = useState('User'); // Default value as "User"
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

//   // Toggle SignupLogin component
//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   // Close SignupLogin modal
//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   // Toggle ProfileForm component
//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   // Close ProfileForm modal
//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   // Toggle Logout Menu
//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User'); // Reset username to "User"
//     setIsLoggedIn(false); // Update login status
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   // Fetch user data
//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true); // Update login status
//         // Trigger a re-fetch of the profile if needed
//         getUserProfile();
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User'); // Set default username
//         setIsLoggedIn(false); // Update login status
//       }
//     } else {
//       setUserName('User'); // Set default username
//       setIsLoggedIn(false); // Update login status
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Ensure the profile is fetched when logged in
//     }
//   }, [getUserProfile]);

//   // useEffect(() => {
//   //   if (userProfile) {
//   //     setUserName(userProfile.firstName || 'User');
//   //   }
//   // }, [userProfile]);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
//             Menu
//           </Link>
//           <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {isLoggedIn ? (
//             <div className="text-lg font-medium flex items-center gap-2 relative">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">
//                 Hi, {userName}!
//               </p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={toggleLogoutMenu}><AiOutlineLogout /></p>
//                 <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
//                   Logout
//                 </div>
//               </div>
//               {showLogoutMenu && (
//                 <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
//                   <button
//                     className="w-full text-red-600 hover:bg-gray-100 rounded py-2 px-4"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-lg font-medium flex items-center gap-2">
//               <p onClick={toggleSignupLogin} className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded'>
//                 <AiOutlineLogin />
//               </p>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>
//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${
//           open ? 'opacity-50 pointer-events-auto' : ''
//         }`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${
//           open ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//             Menu
//           </Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//               Login
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//               Logout
//             </div>
//           )}
//           <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">
//                 Hi, {userName}!
//               </p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseSignupLogin}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={handleCloseSignupLogin} onLoginSuccess={fetchUserData} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseProfileForm}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={handleCloseProfileForm} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;


// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';
// import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
  
//   const [userName, setUserName] = useState('User'); // Default value as "User"
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

//   // Toggle SignupLogin component
//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   // Close SignupLogin modal
//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   // Toggle ProfileForm component
//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   // Close ProfileForm modal
//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   // Toggle Logout Menu
//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User'); // Reset username to "User"
//     setIsLoggedIn(false); // Update login status
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   // Fetch user data
//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true); // Update login status
//         // Trigger a re-fetch of the profile if needed
//         getUserProfile();
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User'); // Set default username
//         setIsLoggedIn(false); // Update login status
//       }
//     } else {
//       setUserName('User'); // Set default username
//       setIsLoggedIn(false); // Update login status
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Ensure the profile is fetched when logged in
//     }
//   }, [getUserProfile]);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">
//             Menu
//           </Link>
//           <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {isLoggedIn ? (
//             <div className="text-lg font-medium flex items-center gap-2 relative">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">
//                 Hi, {userName}!
//               </p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={toggleLogoutMenu}><AiOutlineLogout /></p>
//                 <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded">
//                   Logout
//                 </div>
//               </div>
//               {showLogoutMenu && (
//                 <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2">
//                   <button
//                     className="w-full text-red-600 hover:bg-gray-100 rounded py-2 px-4"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-lg font-medium flex items-center gap-2">
//               <p onClick={toggleSignupLogin} className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded'>
//                 <AiOutlineLogin />
//               </p>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>
//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${
//           open ? 'opacity-50 pointer-events-auto' : ''
//         }`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${
//           open ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//             Restaurant
//           </Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//             Menu
//           </Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//               Login
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">
//               Logout
//             </div>
//           )}
//           <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar} 
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">
//                 Hi, {userName}!
//               </p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseSignupLogin}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={handleCloseSignupLogin} onLoginSuccess={fetchUserData} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={handleCloseProfileForm}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={handleCloseProfileForm} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;
