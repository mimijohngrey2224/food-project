

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { MenuContext } from "../../context/MenuContext";
import AuthContext from "../../context/AuthContext";

function SignupLogin({ onClose }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(AuthContext);
  const { getUserProfile, fetchCartData, setCartItems } = useContext(MenuContext);
  // const { handleUserLogin, getUserProfile, fetchCartData, setCartItems } = useContext(MenuContext);
  
  // Toggle between local and production API
  // const [url] = useState("http://localhost:3000");
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
    state: ""
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
  const [isLoading, setIsLoading] = useState(false);

  // Validate password length
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
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
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleError = (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "An error occurred";
    console.error("Error:", errorMessage);
    toast.error(errorMessage);
    return errorMessage;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!validatePassword(signupData.password)) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend (excluding confirmPassword)
      const { confirmPassword, ...userData } = signupData;
      
      const response = await axios.post(`${url}/api/user/register`, userData);
      
      if (response.data.success) {
        toast.success("Successfully Registered");
        setShowLoginForm(true); // Switch to login form after successful registration
        
        // Store token and user data
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({ type: "setToken", payload: response.data.token });
        
        // Handle cart data if exists in local storage
        const localCart = JSON.parse(localStorage.getItem("cartItems"));
        if (localCart?.menus?.length > 0) {
          await syncCartWithBackend(response.data.token, localCart.menus);
          localStorage.removeItem("cartItems");
        }
        
        // Update user context and redirect
        await getUserProfile();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    
    if (!email || !password) {
      return toast.error("Email and Password are required");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${url}/api/user/login`, loginData);
      
      if (response.data.success) {
        toast.success("Logged In Successfully");
        
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Handle cart synchronization
        const localCart = JSON.parse(localStorage.getItem("cartItems"));
        if (localCart?.menus?.length > 0) {
          await syncCartWithBackend(response.data.token, localCart.menus);
          localStorage.removeItem("cartItems");
        }
        
        // Update context and close modal
        // handleUserLogin(response.data.token, response.data.user);
        await getUserProfile();
        const updatedCart = await fetchCartData();
        setCartItems(updatedCart);
        onClose();
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to sync cart with backend
  const syncCartWithBackend = async (token, cartItems) => {
    try {
      await Promise.all(cartItems.map(async (item) => {
        await axios.post(`${url}/api/add-to-cart`, {
          productId: item?.menu?._id,
          quantity: item?.quantity
        }, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      }));
      
      // Refresh cart data after sync
      // fetchCartData();
      const updatedCart = await fetchCartData();
      setCartItems(updatedCart); 
      toast.success("Cart items synced successfully");
    } catch (error) {
      console.error("Failed to sync cart items:", error);
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full p-2"
        onClick={onClose}
      >
        &times;
      </button>
      
      {showLoginForm ? (
        // Login Form
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
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Login"}
          </button>
          <p className="mt-2 text-sm text-gray-500 cursor-pointer text-center" onClick={toggleLoginForm}>
            Don't have an account yet? Sign up here.
          </p>
        </form>
      ) : (
        // Signup Form
        <form onSubmit={handleSignupSubmit}>
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            
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
                placeholder="Password (min 8 characters)"
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
            
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            
            <input
              type="tel"
              name="phone"
              value={signupData.phone}
              onChange={handleSignupChange}
              placeholder="Phone Number"
              className="border rounded-md p-2 w-full"
              required
            />
            
            <input
              type="text"
              name="street"
              value={signupData.street}
              onChange={handleSignupChange}
              placeholder="Street Address"
              className="border rounded-md p-2 w-full"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
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
                name="state"
                value={signupData.state}
                onChange={handleSignupChange}
                placeholder="State/Province"
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            
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
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Sign Up"}
          </button>
          
          <p className="mt-2 text-sm text-gray-500 cursor-pointer text-center" onClick={toggleLoginForm}>
            Already have an account? Login here.
          </p>
        </form>
      )}
    </div>
  );
}

export default SignupLogin;

