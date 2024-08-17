import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MenuContext } from '../context/MenuContext';
import abibiz1 from '../assets/abibiz1 logo.jpg';
import avatar from '../assets/avatar.png'; // Fallback avatar
import SignupLogin from '../components/pages/SignupLogin';
import ProfileForm from '../components/pages/profileForm';
import axios from 'axios';

function Header() {
  const { cartItems, url, userProfile } = useContext(MenuContext);
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
  // const [profileImage, setProfileImage] = useState(null); // New state for profile image URL

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
    navigate('/login');
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
              // setProfileImage(parsedData.profileImage || null); // Set the profile image URL
            } else {
              console.warn('User data does not have a valid structure:', parsedData);
              setUserName('User'); // Set default username
            }
          } catch (parseError) {
            console.error('Failed to parse user data:', parseError);
            setUserName('User'); // Set default username
          }
        } else {
          console.warn('User data is not a valid JSON string');
          setUserName('User'); // Set default username
        }
      } else {
        console.warn('No user data found in local storage');
        setUserName('User'); // Set default username
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUserName('User'); // Set default username
    }
  };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("auth-token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.success) {
//         const { profile } = response.data;
//         if (profile && profile.image) {
//           setProfileImage(`${url}/uploads/${profile.image}`);
//         } else {
//           setProfileImage(avatar);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };
  
  

//   const updateProfile = async (updatedProfileData) => {
//   try {
//     const token = localStorage.getItem("auth-token");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('firstName', updatedProfileData.firstName);
//     formData.append('lastName', updatedProfileData.lastName);
//     formData.append('email', updatedProfileData.email);
//     if (updatedProfileData.profileImage) {
//       formData.append('profileImage', updatedProfileData.profileImage);
//     }

//     const response = await axios.post(`${url}/api/profile/update`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.data.success) {
//       console.log('Profile updated successfully:', response.data);
//       fetchProfile(); // Fetch updated profile
//     } else {
//       console.warn('Profile update failed:', response.data.message);
//     }
//   } catch (error) {
//     console.error("Error updating profile:", error);
//   }
// };

  
  useEffect(() => {
    fetchUserData();
    // fetchProfile();
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-4">
          <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo"/>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/home">
            Restaurant
          </Link>
          <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/menu">
            Menu
          </Link>
          <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative" to="/cart">
            <BsFillCartPlusFill className="text-2xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItemsInCart}
            </div>
          </Link>
          <div className="text-lg font-medium flex items-center gap-2 relative">
            <img
              src={userProfile?.image ? `${url}/uploads/${userProfile.image}`: avatar} 
              alt="Profile"
              className="h-12 w-12 rounded-full cursor-pointer border-2 border-white"
              onClick={toggleProfileForm}
            />
            <p className="text-white ml-2 cursor-pointer" onClick={toggleLogoutMenu}>
              Hi, {userName}!
            </p>
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
          <Link className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" to="/restaurant">
            Restaurant
          </Link>
          <Link className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" to="/menu">
            Menu
          </Link>
          <Link className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300 relative" to="/cart">
            <BsFillCartPlusFill className="text-xl" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItemsInCart}
            </div>
          </Link>
          <Link className="text-2xl font-medium hover:text-purple-500 transition-colors duration-300" to="/login">
            Login
          </Link>
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
// import axios from 'axios';

// function Header() {
//   const { cartItems, url } = useContext(MenuContext);
//   const navigate = useNavigate();
  
//   // Calculate total items in cart safely
//   const totalItemsInCart = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
//   const [userName, setUserName] = useState('Mimi'); // Default value
//   const [profileImage, setProfileImage] = useState(null); // New state for profile image URL

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
//     navigate('/login');
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
//               setUserName(parsedData.firstName || 'Mimi');
//               // setProfileImage(parsedData.profileImage || null); // Set the profile image URL
//             } else {
//               console.warn('User data does not have a valid structure:', parsedData);
//             }
//           } catch (parseError) {
//             console.error('Failed to parse user data:', parseError);
//           }
//         } else {
//           console.warn('User data is not a valid JSON string');
//         }
//       } else {
//         console.warn('No user data found in local storage');
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("auth-token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.success) {
//         const { profile } = response.data;
//         setProfileImage(profile);
//         if (profile.image) {
//           setProfileImage(`${url}/uploads/${profile.image}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   const updateProfile = async (updatedProfileData) => {
//     try {
//       const token = localStorage.getItem("auth-token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('firstName', updatedProfileData.firstName);
//       formData.append('lastName', updatedProfileData.lastName);
//       formData.append('email', updatedProfileData.email);
//       if (updatedProfileData.profileImage) {
//         formData.append('profileImage', updatedProfileData.profileImage);
//       }
  
//       const response = await axios.put(`${url}/api/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       if (response.data.success) {
//         console.log('Profile updated successfully:', response.data);
//         fetchProfile(); // Fetch updated profile
//       } else {
//         console.warn('Profile update failed:', response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchUserData();
//     fetchProfile();
//   }, []);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/restaurant">
//             Restaurant
//           </Link>
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/">
//             Menu
//           </Link>
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative" to="/cart">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart || 0} {/* Ensure valid number is rendered */}
//             </div>
//           </Link>
//           <div className="text-lg font-medium flex items-center gap-2 relative">
//             <img
//               src={profileImage || avatar} // Use profileImage if available, else fallback to avatar
//               alt="Avatar"
//               className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
//               onClick={toggleProfileForm}
//             />
//             <p className="text-white ml-2">{userName}</p>
//             {showLogoutMenu && (
//               <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md overflow-hidden">
//                 <button
//                   onClick={toggleLogoutMenu}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//         <RiMenu4Fill
//           className="text-white text-3xl lg:hidden"
//           onClick={() => setOpen(!open)}
//         />
//       </div>
//       {open && (
//         <nav className="lg:hidden bg-white absolute top-16 left-0 right-0 shadow-lg">
//           <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/restaurant">
//             Restaurant
//           </Link>
//           <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/">
//             Menu
//           </Link>
//           <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 relative" to="/cart">
//             Cart
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart || 0} {/* Ensure valid number is rendered */}
//             </div>
//           </Link>
//         </nav>
//       )}
//       {showSignupLogin && <SignupLogin onClose={handleCloseSignupLogin} />}
//       {showProfileForm && <ProfileForm onClose={handleCloseProfileForm} onSave={updateProfile} />}
//     </header>
//   );
// }

// export default Header;




// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { RiMenu4Fill } from 'react-icons/ri';
// import { BsFillCartPlusFill } from 'react-icons/bs';
// import { IoMdClose } from 'react-icons/io'; // Import close icon
// import { MenuContext } from '../context/MenuContext';
// import abibiz1 from '../assets/abibiz1 logo.jpg';
// import avatar from '../assets/avatar.png'; // Fallback avatar
// import SignupLogin from '../components/pages/SignupLogin';
// import ProfileForm from '../components/pages/profileForm';
// import axios from 'axios';

// function Header() {
//   const { cartItems, url } = useContext(MenuContext);
//   const navigate = useNavigate();

//   // Calculate total items in cart safely
//   const totalItemsInCart = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

//   const [open, setOpen] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu
//   const [userName, setUserName] = useState('Mimi'); // Default value
//   const [profileImage, setProfileImage] = useState(null); // New state for profile image URL

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
//     navigate('/login');
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
//               setUserName(parsedData.firstName || 'Mimi');
//               // setProfileImage(parsedData.profileImage || null); // Set the profile image URL
//             } else {
//               console.warn('User data does not have a valid structure:', parsedData);
//             }
//           } catch (parseError) {
//             console.error('Failed to parse user data:', parseError);
//           }
//         } else {
//           console.warn('User data is not a valid JSON string');
//         }
//       } else {
//         console.warn('No user data found in local storage');
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("auth-token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.success) {
//         const { profile } = response.data;
//         setProfileImage(profile);
//         if (profile.image) {
//           setProfileImage(`${url}/uploads/${profile.image}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   const updateProfile = async (updatedProfileData) => {
//     try {
//       const token = localStorage.getItem("auth-token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('firstName', updatedProfileData.firstName);
//       formData.append('lastName', updatedProfileData.lastName);
//       formData.append('email', updatedProfileData.email);
//       if (updatedProfileData.profileImage) {
//         formData.append('profileImage', updatedProfileData.profileImage);
//       }
  
//       const response = await axios.put(`${url}/api/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       if (response.data.success) {
//         console.log('Profile updated successfully:', response.data);
//         fetchProfile(); // Fetch updated profile
//       } else {
//         console.warn('Profile update failed:', response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchUserData();
//     fetchProfile();
//   }, []);

//   return (
//     <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg sticky top-0 z-20">
//       <div className="flex items-center justify-between p-4 lg:px-8">
//         <div className="flex items-center gap-4">
//           <img className="w-24 sm:w-32 h-auto object-cover" src={abibiz1} alt="Logo" />
//           <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">Food Ordering App</h1>
//         </div>
//         <nav className="hidden lg:flex items-center gap-6 text-white">
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/restaurant">
//             Restaurant
//           </Link>
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300" to="/">
//             Menu
//           </Link>
//           <Link className="text-lg font-medium hover:text-gray-200 transition-colors duration-300 relative" to="/cart">
//             <BsFillCartPlusFill className="text-2xl" />
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart || 0} {/* Ensure valid number is rendered */}
//             </div>
//           </Link>
//           <div className="text-lg font-medium flex items-center gap-2 relative">
//             <img
//               src={profileImage || avatar} // Use profileImage if available, else fallback to avatar
//               alt="Avatar"
//               className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
//               onClick={toggleProfileForm}
//             />
//             <p className="text-white ml-2">{userName}</p>
//             {showLogoutMenu && (
//               <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md overflow-hidden">
//                 <button
//                   onClick={toggleLogoutMenu}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//         <RiMenu4Fill
//           className="text-white text-3xl lg:hidden"
//           onClick={() => setOpen(!open)}
//         />
//       </div>
//       {open && (
//         <nav className="lg:hidden bg-white absolute top-16 left-0 right-0 shadow-lg z-30 max-h-[70vh] overflow-y-auto">
//           <div className="flex justify-between items-center px-4 py-2 border-b">
//             <h2 className="text-gray-700 text-xl font-semibold">Menu</h2>
//             <button
//               onClick={() => setOpen(false)}
//               className="text-gray-700 text-2xl"
//             >
//               <IoMdClose />
//             </button>
//           </div>
//           <Link
//             className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
//             to="/restaurant"
//             onClick={() => setOpen(false)}
//           >
//             Restaurant
//           </Link>
//           <Link
//             className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
//             to="/"
//             onClick={() => setOpen(false)}
//           >
//             Menu
//           </Link>
//           <Link
//             className="block px-4 py-3 text-gray-700 hover:bg-gray-100 relative"
//             to="/cart"
//             onClick={() => setOpen(false)}
//           >
//             Cart
//             <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItemsInCart || 0} {/* Ensure valid number is rendered */}
//             </div>
//           </Link>
//         </nav>
//       )}
//       {showSignupLogin && <SignupLogin onClose={handleCloseSignupLogin} />}
//       {showProfileForm && <ProfileForm onClose={handleCloseProfileForm} onSave={updateProfile} />}
//     </header>
//   );
// }

// export default Header;



 



