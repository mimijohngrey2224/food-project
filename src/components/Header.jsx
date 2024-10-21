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
//   const navigate = useNavigate()

//   // useEffect(() => {
//   //   getUserProfile();
//   // }, [])
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"))


//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//         // getUserProfile(); // Fetch profile
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//         getUserProfile(); // Fetch profile
//     }
//   }, [userProfile]);

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
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {/* {console.log(userProfile.image)} */}
//           {/* {console.log(user.firstName)} */}
//           {/* {console.log('username', userName)} */}
//           {isLoggedIn ? (
//             <div className="text-lg font-medium flex items-center gap-2 relative">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
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
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Login</div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}


//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={toggleProfileForm}
//           />

//           {/* <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={toggleProfileForm}
//           /> */}
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
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
// last page



// new updated page 17th

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';
// // import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile, updateUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const userData = localStorage.getItem('user');
//   // const user = JSON.parse(localStorage.getItem("user"));

//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     // const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     updateUserProfile()
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//         getUserProfile(); // Fetch profile
//         // updateUserProfile() 
//     }
//   }, [userProfile]);

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
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {isLoggedIn ? (
//             <div className="text-lg font-medium flex items-center gap-2 relative">
//               {/* {console.log("userprofile", userProfile.image )} */}
//               {/* {console.log(`http://localhost:3000/${userProfile.profile.image}`)} */}
//               <img
//                 src={userProfile?.image ? `http://localhost:3000/${userProfile.image}` : avatar}
//                 // src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//                 onClick={toggleProfileForm}
//               />
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
           
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp
//               </p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xb py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>
//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <d onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</d>
//             <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xb py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}
//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={toggleProfileForm}
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
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
// working page but want to try another code 17th oct 




// the new one 17th oct showing the profile image but not showing everything on the header

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, userProfile, getUserProfile, url } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('User');

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     setUserName('User');
//     setIsLoggedIn(false);
//     navigate('/thanks');
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           {isLoggedIn && (
//             <div className="flex items-center">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer"
//                 onClick={() => setShowProfileForm(true)}
//               />
//               <p className="text-white ml-2">Hi, {userName}!</p>
//               <button onClick={handleLogout} className="text-red-600">Logout</button>
//             </div>
//           )}
//         </nav>
//       </div>
//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
//             onClick={() => setShowProfileForm(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <ProfileForm onClose={() => setShowProfileForm(false)} />
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;


// trying another new updated to see the changes 17th oct

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile, updateUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     navigate('/thanks');
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//                 onClick={() => setShowProfileForm(true)}
//               />
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={() => setShowSignupLogin(true)} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <p onClick={() => setShowSignupLogin(true)} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}
//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={() => setShowProfileForm(true)}
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowSignupLogin(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={() => setShowSignupLogin(false)} onLoginSuccess={fetchUserData} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowProfileForm(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={() => setShowProfileForm(false)} onUpdateSuccess={getUserProfile} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;


// another testing 17th oct

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     navigate('/thanks');
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//                 onClick={() => setShowProfileForm(true)} // Open ProfileForm
//               />
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={() => setShowSignupLogin(true)} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <p onClick={() => setShowSignupLogin(true)} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}
//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={() => setShowProfileForm(true)} // Open ProfileForm
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowSignupLogin(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={() => setShowSignupLogin(false)} onLoginSuccess={fetchUserData} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowProfileForm(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={() => setShowProfileForm(false)} onUpdateSuccess={getUserProfile} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;

// another corrected one 17th oct this page is updating the profile image at last, but taking my signup page to somewhere else

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const userData = localStorage.getItem('user');

//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => { // Ensure this function is defined
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     getUserProfile(); // Fetch profile
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

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
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp
//               </p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <d onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</d>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}
//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={toggleProfileForm}
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && <SignupLogin onClose={handleCloseSignupLogin} />}
//       {/* Profile Form Overlay */}
//       {showProfileForm && <ProfileForm onClose={handleCloseProfileForm} userProfile={userProfile} />}
//     </header>
//   );
// }

// export default Header;

// tring other one to check if the signup age is corrected 17th,signup page is corrected but having issue with the usernmae, until i refesh my page before it will come up

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const userData = localStorage.getItem('user');

//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => { // Ensure this function is defined
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     getUserProfile(); // Fetch profile
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

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
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp
//               </p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}
//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={toggleProfileForm}
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <SignupLogin onClose={handleCloseSignupLogin} />
//         </div>
//       )}
//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <ProfileForm onClose={handleCloseProfileForm} userProfile={userProfile} />
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;

// new update with the issue of refeshing page before the username comes out 17th oct 

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile, setUserProfile } = useContext(MenuContext); // Added setUserProfile
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const userData = localStorage.getItem('user');

//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     getUserProfile(); // Fetch profile
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   // Add an effect to update username immediately after login
//   useEffect(() => {
//     if (isLoggedIn && userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [isLoggedIn, userProfile]);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp
//               </p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                   Login
//                 </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div className="text-2xl font-medium flex items-center gap-2">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full"
//                 onClick={toggleProfileForm}
//               />
//               <p>Hi, {userName}!</p>
//             </div>
//           )}
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <SignupLogin onClose={handleCloseSignupLogin} />
//         </div>
//       )}
//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <ProfileForm onClose={handleCloseProfileForm} userProfile={userProfile} />
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;


// 18th oct checking if the username will come up immedialy without refreshing

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, url, userProfile, getUserProfile, setUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);

//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const userData = localStorage.getItem('user');

//   const toggleSignupLogin = () => {
//     setShowSignupLogin(!showSignupLogin);
//   };

//   const handleCloseSignupLogin = () => {
//     setShowSignupLogin(false);
//   };

//   const toggleProfileForm = () => {
//     setShowProfileForm(!showProfileForm);
//   };

//   const handleCloseProfileForm = () => {
//     setShowProfileForm(false);
//   };

//   const toggleLogoutMenu = () => {
//     setShowLogoutMenu(!showLogoutMenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   const fetchUserData = () => {
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   // Add a function to update username after successful login
//   const updateUserNameAfterLogin = () => {
//     const token = localStorage.getItem('auth-token');
//     if (token) {
//       getUserProfile().then((fetchedUserProfile) => {
//         if (fetchedUserProfile) {
//           setUserName(fetchedUserProfile.firstName || 'User');
//           setIsLoggedIn(true);
//         }
//       });
//     }
//   };

//   // const handleLoginSuccess = () => {
//   //   localStorage.setItem('auth-token', token);
//   //   updateUserNameAfterLogin();
//   // };

//   useEffect(() => {
//     if (isLoggedIn) {
//       updateUserNameAfterLogin();
//     }
//   }, [isLoggedIn]);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold rounded' onClick={toggleLogoutMenu}>logout</p>
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
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className='text-lg font-medium flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded'>SignUp
//               </p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//         </nav>
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-3xl">
//           <RiMenu4Fill />
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div className="relative group">
//               <p onClick={toggleSignupLogin} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">SignUp</p>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
//                 Login
//               </div>
//             </div>
//           )}
//           {isLoggedIn && (
//             <div className="text-2xl font-medium flex items-center gap-2">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full"
//                 onClick={toggleProfileForm}
//               />
//               <p>Hi, {userName}!</p>
//             </div>
//           )}
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <SignupLogin onClose={handleCloseSignupLogin} />
//         </div>
//       )}
//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <ProfileForm onClose={handleCloseProfileForm} userProfile={userProfile} />
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;


// 20th oct correct and working perfectly

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MenuContext } from '../context/MenuContext';
import abibiz1 from '../assets/abibiz1 logo.jpg';
import avatar from '../assets/avatar.png'; // Fallback avatar
import SignupLogin from '../components/pages/SignupLogin';
import ProfileForm from '../components/pages/profileForm';

function Header() {
  const { cartItems, url, userProfile, getUserProfile } = useContext(MenuContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

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
    navigate('/thanks');
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-4">
          <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
          <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
          <Link to="/cart" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative">
            <BsFillCartPlusFill className="text-2xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
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
        <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
        <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
        <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
          <BsFillCartPlusFill className="text-xl" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
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




              {/* {!isLoggedIn && (
  <div className="relative group">
    <p
      onClick={() => setShowSignupLogin(!showSignupLogin)}
      className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300"
    >
      SignUp
    </p>
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-green-400 text-white text-xs py-1 px-2 rounded">
      Login
    </div>
  </div>
)} */}




// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';

// function Header() {
//   const { cartItems, userProfile, getUserProfile } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('User');

//   useEffect(() => {
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     setUserName('User');
//     setIsLoggedIn(false);
//     navigate('/thanks');
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           {/* Navigation links */}
//           {isLoggedIn && (
//             <div className="flex items-center">
//               <img
//                 src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full cursor-pointer"
//                 onClick={() => setShowProfileForm(true)}
//               />
//               <p className="text-white ml-2">Hi, {userName}!</p>
//               <button onClick={handleLogout} className="text-red-600">Logout</button>
//             </div>
//           )}
//         </nav>
//       </div>
//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
//             onClick={() => setShowProfileForm(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <ProfileForm onClose={() => setShowProfileForm(false)} />
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
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
//   const [userName, setUserName] = useState('User');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const fetchUserData = () => {
//     const userData = localStorage.getItem('user');
    
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         setUserName(parsedData.firstName || 'User');
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Failed to parse user data:', error);
//         setUserName('User');
//         setIsLoggedIn(false);
//       }
//     } else {
//       setUserName('User');
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//     const token = localStorage.getItem('auth-token');
//     setIsLoggedIn(!!token);
//     if (token) {
//       getUserProfile(); // Fetch profile
//     }
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setUserName(userProfile.firstName || 'User');
//     }
//   }, [userProfile]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     localStorage.removeItem('user');
//     setUserName('User');
//     setIsLoggedIn(false);
//     setShowLogoutMenu(false);
//     navigate('/thanks');
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-lg font-medium hover:text-gray-200 transition-colors duration-300">Menu</Link>
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
//                 onClick={() => setShowProfileForm(!showProfileForm)}
//               />
//               <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//               <div className="relative group">
//                 <p className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded' onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
//                   <AiOutlineLogout />
//                 </p>
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
//               <p onClick={() => setShowSignupLogin(!showSignupLogin)} className='cursor-pointer px-4 py-2 text-white font-bold text-2xl rounded'>
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
//         className={`fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-0 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-50 pointer-events-auto' : ''}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 h-screen bg-white z-30 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <nav className="flex flex-col items-center gap-6 mt-20">
//           <Link to="/" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Restaurant</Link>
//           <Link to="/menu" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Menu</Link>
//           <Link to="/cart" className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative">
//             <BsFillCartPlusFill className="text-xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)}
//             </div>
//           </Link>
//           {!isLoggedIn && (
//             <div onClick={() => setShowSignupLogin(!showSignupLogin)} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Login</div>
//           )}
//           {isLoggedIn && (
//             <div onClick={handleLogout} className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300">Logout</div>
//           )}

//           <img
//             src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : avatar}
//             alt="Profile"
//             className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
//             onClick={() => setShowProfileForm(!showProfileForm)}
//           />
//           <p className="text-white ml-2 cursor-pointer">Hi, {userName}!</p>
//         </nav>
//       </div>

//       {/* Signup/Login Overlay */}
//       {showSignupLogin && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowSignupLogin(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <SignupLogin onClose={() => setShowSignupLogin(false)} onLoginSuccess={fetchUserData} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Profile Form Overlay */}
//       {showProfileForm && (
//         <>
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
//             onClick={() => setShowProfileForm(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="relative">
//               <ProfileForm onClose={() => setShowProfileForm(false)} />
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;




