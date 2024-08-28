import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupLogin({ onClose }) {
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

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, signupData);
      console.log("Signup response:", response.data);
      setShowLoginForm(true);
      toast.success("Successfully Registered");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to registered");
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

      // Verify token and user data are correctly stored
      console.log("Stored token:", localStorage.getItem("auth-token"));
      console.log("Stored user:", localStorage.getItem("user"));

      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
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
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="border rounded-md p-2 w-full"
              required
            />
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
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              placeholder="Password"
              className="border rounded-md p-2 w-full"
              required
            />
            <input
              type="confirmPassword"
              name="confirmPassword"
              value={signupData.password}
              onChange={handleSignupChange}
              placeholder="Password"
              className="border rounded-md p-2 w-full"
              required
            />
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
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded w-full"
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
