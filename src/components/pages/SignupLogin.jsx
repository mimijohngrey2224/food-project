// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
// import { useContext } from "react";
// import { MenuContext } from "../../context/MenuContext";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const { handleUserLogin,getUserProfile } = useContext(MenuContext); // Get handleUserLogin from context

//   // const [url] = useState("http://localhost:3000");
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
//   const [showSignupPassword, setShowSignupPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState("");

//   // Validate password length
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));

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
//       if (response.status === 200 && response.data.success) {
//         setShowLoginForm(true);
//         toast.success("Successfully Registered");
//       } else {
//         toast.error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Signup error:", error.response ? error.response.data : error.message);
//       toast.error("Failed due to Invalid Credentials");
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${url}/api/user/login`, loginData);
//       toast.success("Logged In Successfully");
  
//       // Store token and user data in localStorage
//       localStorage.setItem("auth-token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
  
//       // Update context with user data
//       handleUserLogin(response.data.token, response.data.user);
//       // await getUserProfile()
//       // Close the form and navigate
//       onClose();
//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error.response ? error.response.data : error.message);
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
//                 {showLoginPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
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
//                 {showSignupPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
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
//                 {showConfirmPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
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
//             className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
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


import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { MenuContext } from "../../context/MenuContext";

function SignupLogin({ onClose }) {
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(MenuContext);
  
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
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Validate password length
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSignupSubmit = async (e) => {
  //   e.preventDefault();
  //   if (signupData.password !== signupData.confirmPassword) {
  //     return toast.error("Passwords do not match");
  //   }
  //   if (passwordError) {
  //     return toast.error(passwordError);
  //   }

  //   try {
  //     const response = await axios.post(`${url}/api/user/register`, signupData);
  //     if (response.status === 200 && response.data.success) {
  //       setShowLoginForm(true);
  //       toast.success("Successfully Registered");
  //     } else {
  //       toast.error(response.data.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error.response ? error.response.data : error.message);
  //     toast.error(error.response.data.message || "Registration failed"); // Show specific error message
  //   }
  // };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (signupData.password !== signupData.confirmPassword) {
        return toast.error("Passwords do not match");
    }
    
    // Handle any other validation errors here (if applicable)
    if (passwordError) {
        return toast.error(passwordError);
    }

    try {
        // Attempt to register the user
        const response = await axios.post(`${url}/api/user/register`, signupData);

        // Check if the registration was successful
        if (response.status === 200 && response.data.success) {
            setShowLoginForm(true);
            toast.success("Successfully Registered");
        } else {
            // If the registration wasn't successful, show the error message
            toast.error(response.data.message || "Registration failed");
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Signup error:", error.response ? error.response.data : error.message);

        // Show specific error messages
        if (error.response) {
            // If the server responded with an error status
            if (error.response.status === 409) {
                // Conflict error (user already exists)
                toast.error("User already exists");
            } else {
                // Show the server's error message
                toast.error(error.response.data.message || "Registration failed");
            }
        } else {
            // Network error or other issue
            toast.error("Error registering user. Please try again later.");
        }
    }
};


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`, loginData);
      if (response.data.success) {
        toast.success("Logged In Successfully");

        // Store token and user data in localStorage
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Update context with user data
        handleUserLogin(response.data.token, response.data.user);
        
        // Close the form and navigate
        onClose();
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      toast.error(error.response.data.message || "Login failed"); // Show specific error message
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
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
                {showLoginPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
          >
            Login
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
                {showSignupPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
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
                {showConfirmPassword ? <LiaEyeSolid size={20} /> : <LiaEyeSlashSolid size={20} />}
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
            Already have an account? Login here.
          </p>
        </form>
      )}
    </div>
  );
}

export default SignupLogin;