import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { MenuContext } from "../../context/MenuContext";

function SignupLogin({ onClose }) {
  const navigate = useNavigate();
  const { handleUserLogin, getUserProfile } = useContext(MenuContext);
  
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

  const handleError = (error) => {
    console.error("Error:", error.response ? error.response.data : error.message);
    toast.error(error.response?.data?.message || "An error occurred");
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
      if (response.status === 200 && response.data.success) {
        setShowLoginForm(true);
        toast.success("Successfully Registered");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      handleError(error);
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
        getUserProfile();
        onClose();
        navigate("/", { replace: true });
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative  max-h-[90vh] overflow-y-auto">
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
