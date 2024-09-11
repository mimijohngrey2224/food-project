// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const [url] = useState("https://food-project-api.onrender.com");

//   const [signupData, setSignupData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     street: "",
//     city: "",
//     country: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showLoginForm, setShowLoginForm] = useState(false);

//   // States for password visibility
//   const [showSignupPassword, setShowSignupPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (signupData.password !== signupData.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }
  
//     try {
//       const response = await axios.post(`${url}/api/user/register`, signupData);
//       console.log("Signup response status:", response.status);
//       console.log("Signup response data:", response.data);
  
//       if (response.status === 200 && response.data.success) {
//         setShowLoginForm(true);
//         toast.success("Successfully Registered");
//       } else {
//         toast.error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error(
//         "Signup error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed due to Invalid Credentials");
//     }
//   };
  

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${url}/api/user/login`, loginData);
//       console.log("Login response:", response.data);
//       toast.success("Logged In Successfully");

//       // Store token and user data in localStorage
//       localStorage.setItem("auth-token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       // Verify token and user data are correctly stored
//       console.log("Stored token:", localStorage.getItem("auth-token"));
//       console.log("Stored user:", localStorage.getItem("user"));

//       // Close the form and navigate
//       onClose();
//       navigate("/");
//     } catch (error) {
//       console.error(
//         "Login error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed due to Invalid Credentials");
//     }
//   };

//   const toggleLoginForm = () => {
//     setShowLoginForm(!showLoginForm);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
//       <button
//         className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full p-2"
//         onClick={onClose}
//       >
//         &times;
//       </button>
//       {showLoginForm ? (
//         <form onSubmit={handleLoginSubmit}>
//           <h2 className="text-xl font-semibold mb-4">Login</h2>
//           <div className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               value={loginData.email}
//               onChange={handleLoginChange}
//               placeholder="Email"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showLoginPassword ? "text" : "password"}
//                 name="password"
//                 value={loginData.password}
//                 onChange={handleLoginChange}
//                 placeholder="Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowLoginPassword(!showLoginPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showLoginPassword ? (
//                    <LiaEyeSolid size={20} />
//                   ) : (
//                     <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
//           >
//             Login
//           </button>
//           <p
//             className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
//             onClick={toggleLoginForm}
//           >
//             Don't have an account yet? Sign up here.
//           </p>
//         </form>
//       ) : (
//         <form onSubmit={handleSignupSubmit}>
//           <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="firstName"
//               value={signupData.firstName}
//               onChange={handleSignupChange}
//               placeholder="First Name"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={signupData.lastName}
//               onChange={handleSignupChange}
//               placeholder="Last Name"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={signupData.email}
//               onChange={handleSignupChange}
//               placeholder="Email"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showSignupPassword ? "text" : "password"}
//                 name="password"
//                 value={signupData.password}
//                 onChange={handleSignupChange}
//                 placeholder="Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowSignupPassword(!showSignupPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showSignupPassword ? (
//                   <LiaEyeSolid size={20} />
//                 ) : (
//                   <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={signupData.confirmPassword}
//                 onChange={handleSignupChange}
//                 placeholder="Confirm Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showConfirmPassword ? (
//                   <LiaEyeSolid size={20} />
//                 ) : (
//                   <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//             <input
//               type="tel"
//               name="phone"
//               value={signupData.phone}
//               onChange={handleSignupChange}
//               placeholder="Phone"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="street"
//               value={signupData.street}
//               onChange={handleSignupChange}
//               placeholder="Street"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="city"
//               value={signupData.city}
//               onChange={handleSignupChange}
//               placeholder="City"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="country"
//               value={signupData.country}
//               onChange={handleSignupChange}
//               placeholder="Country"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 mt-4 rounded w-full"
//           >
//             Sign Up
//           </button>
//           <p
//             className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
//             onClick={toggleLoginForm}
//           >
//             Already have an account? Login here.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// export default SignupLogin;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const [url] = useState("https://food-project-api.onrender.com");

//   const [signupData, setSignupData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     street: "",
//     city: "",
//     country: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showLoginForm, setShowLoginForm] = useState(false);

//   // States for password visibility
//   const [showSignupPassword, setShowSignupPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);

//   // State for password length validation
//   const [passwordError, setPasswordError] = useState("");

//   // Validate password length
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else {
//       setPasswordError(""); // Clear the error message if the password is valid
//     }
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));

//     // Validate password if the password field is changed
//     if (name === "password") {
//       validatePassword(value);
//     }
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (signupData.password !== signupData.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }
//     if (passwordError) {
//       return toast.error(passwordError);
//     }

//     try {
//       const response = await axios.post(`${url}/api/user/register`, signupData);
//       console.log("Signup response status:", response.status);
//       console.log("Signup response data:", response.data);

//       if (response.status === 200 && response.data.success) {
//         setShowLoginForm(true);
//         toast.success("Successfully Registered");
//       } else {
//         toast.error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error(
//         "Signup error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed due to Invalid Credentials");
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${url}/api/user/login`, loginData);
//       console.log("Login response:", response.data);
//       toast.success("Logged In Successfully");

//       // Store token and user data in localStorage
//       localStorage.setItem("auth-token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       // Verify token and user data are correctly stored
//       console.log("Stored token:", localStorage.getItem("auth-token"));
//       console.log("Stored user:", localStorage.getItem("user"));

//       // Close the form and navigate
//       onClose();
//       navigate("/");
//     } catch (error) {
//       console.error(
//         "Login error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed due to Invalid Credentials");
//     }
//   };

//   const toggleLoginForm = () => {
//     setShowLoginForm(!showLoginForm);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
//       <button
//         className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full p-2"
//         onClick={onClose}
//       >
//         &times;
//       </button>
//       {showLoginForm ? (
//         <form onSubmit={handleLoginSubmit}>
//           <h2 className="text-xl font-semibold mb-4">Login</h2>
//           <div className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               value={loginData.email}
//               onChange={handleLoginChange}
//               placeholder="Email"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showLoginPassword ? "text" : "password"}
//                 name="password"
//                 value={loginData.password}
//                 onChange={handleLoginChange}
//                 placeholder="Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowLoginPassword(!showLoginPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showLoginPassword ? (
//                   <LiaEyeSolid size={20} />
//                 ) : (
//                   <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
//           >
//             Login
//           </button>
//           <p
//             className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
//             onClick={toggleLoginForm}
//           >
//             Don't have an account yet? Sign up here.
//           </p>
//         </form>
//       ) : (
//         <form onSubmit={handleSignupSubmit}>
//           <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="firstName"
//               value={signupData.firstName}
//               onChange={handleSignupChange}
//               placeholder="First Name"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={signupData.lastName}
//               onChange={handleSignupChange}
//               placeholder="Last Name"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={signupData.email}
//               onChange={handleSignupChange}
//               placeholder="Email"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showSignupPassword ? "text" : "password"}
//                 name="password"
//                 value={signupData.password}
//                 onChange={handleSignupChange}
//                 placeholder="Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowSignupPassword(!showSignupPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showSignupPassword ? (
//                   <LiaEyeSolid size={20} />
//                 ) : (
//                   <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={signupData.confirmPassword}
//                 onChange={handleSignupChange}
//                 placeholder="Confirm Password"
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               >
//                 {showConfirmPassword ? (
//                   <LiaEyeSolid size={20} />
//                 ) : (
//                   <LiaEyeSlashSolid size={20} />
//                 )}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="text-red-500 text-sm">{passwordError}</p>
//             )}
//             <input
//               type="tel"
//               name="phone"
//               value={signupData.phone}
//               onChange={handleSignupChange}
//               placeholder="Phone"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="street"
//               value={signupData.street}
//               onChange={handleSignupChange}
//               placeholder="Street"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="city"
//               value={signupData.city}
//               onChange={handleSignupChange}
//               placeholder="City"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="country"
//               value={signupData.country}
//               onChange={handleSignupChange}
//               placeholder="Country"
//               className="border rounded-md p-2 w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 mt-4 rounded w-full"
//             disabled={!!passwordError} // Disable the button if there's a password error
//           >
//             Sign Up
//           </button>
//           <p
//             className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
//             onClick={toggleLoginForm}
//           >
//             Already have an account? Login here.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// export default SignupLogin;


// SignupLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

function SignupLogin({ onClose, onUserLogin }) {
  const navigate = useNavigate();
  const [url] = useState("https://food-project-api.onrender.com");

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    country: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(true);

  // States for password visibility
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // State for password length validation
  const [passwordError, setPasswordError] = useState("");

  // Validate password length
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError(""); // Clear the error message if the password is valid
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    // Validate password if the password field is changed
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (passwordError) {
      return toast.error(passwordError);
    }

    try {
      const response = await axios.post(`${url}/api/user/register`, signupData);
      console.log("Signup response status:", response.status);
      console.log("Signup response data:", response.data);

      if (response.status === 200 && response.data.success) {
        setShowLoginForm(true);
        toast.success("Successfully Registered");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed due to Invalid Credentials");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`, loginData);
      console.log("Login response:", response.data);
      toast.success("Logged In Successfully");
  
      // Store token and user data in localStorage
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      // Call the callback function to update the context
      onUserLogin(response.data.token, response.data.user);
  
      // Close the form and navigate
      console.log("Closing form...");
      onClose();
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed due to Invalid Credentials");
    }
  };
  
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleClose = () => {
    setShowSignupLogin(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full p-2"
        onClick={onClose}
      >
        &times;
      </button>
      {showLoginForm ? (
        <form onSubmit={handleLoginSubmit}>
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="border rounded-md p-2 w-full"
              required
            />
            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="border rounded-md p-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showLoginPassword ? (
                  <LiaEyeSolid size={20} />
                ) : (
                  <LiaEyeSlashSolid size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
          >
            Login {showSignupLogin && <SignupLogin onClose={handleClose} onUserLogin={handleUserLogin} />}
          </button>
          <p
            className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
            onClick={toggleLoginForm}
          >
            Don't have an account yet? Sign up here.
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit}>
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={signupData.firstName}
              onChange={handleSignupChange}
              placeholder="First Name"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              value={signupData.lastName}
              onChange={handleSignupChange}
              placeholder="Last Name"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder="Email"
              className="border rounded-md p-2 w-full"
              required
            />
            <div className="relative">
              <input
                type={showSignupPassword ? "text" : "password"}
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="border rounded-md p-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showSignupPassword ? (
                  <LiaEyeSolid size={20} />
                ) : (
                  <LiaEyeSlashSolid size={20} />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm Password"
                className="border rounded-md p-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <LiaEyeSolid size={20} />
                ) : (
                  <LiaEyeSlashSolid size={20} />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <input
              type="tel"
              name="phone"
              value={signupData.phone}
              onChange={handleSignupChange}
              placeholder="Phone"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="text"
              name="street"
              value={signupData.street}
              onChange={handleSignupChange}
              placeholder="Street"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="text"
              name="city"
              value={signupData.city}
              onChange={handleSignupChange}
              placeholder="City"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="text"
              name="country"
              value={signupData.country}
              onChange={handleSignupChange}
              placeholder="Country"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
          >
            Sign Up
          </button>
          <p
            className="mt-2 text-sm text-gray-500 cursor-pointer text-center"
            onClick={toggleLoginForm}
          >
            Already have an account? Log in here.
          </p>
        </form>
      )}
    </div>
  );
}

export default SignupLogin;
