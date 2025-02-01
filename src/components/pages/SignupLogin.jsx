// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
// import { MenuContext } from "../../context/MenuContext";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const { handleUserLogin, getUserProfile } = useContext(MenuContext);
  
//   const [url] = useState("http://localhost:3000");
//   // const [url] = useState("https://food-project-api.onrender.com");
  
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

//   const handleError = (error) => {
//     console.error("Error:", error.response ? error.response.data : error.message);
//     toast.error(error.response?.data?.message || "An error occurred");
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
//       handleError(error);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${url}/api/user/login`, loginData);
//       if (response.data.success) {
//         toast.success("Logged In Successfully");

//         // Store token and user data in localStorage
//         localStorage.setItem("auth-token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         // Update context with user data
//         handleUserLogin(response.data.token, response.data.user);
        
//         // Close the form and navigate
//         getUserProfile();
//         onClose();
//         navigate("/", { replace: true });
//       } else {
//         toast.error("Invalid Credentials");
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   const toggleLoginForm = () => {
//     setShowLoginForm(!showLoginForm);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative  max-h-[90vh] overflow-y-auto">
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





// signin and login working with spinner but showing the username on the header 
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
  const [ state, dispatch ] = useContext(AuthContext)
  const { handleUserLogin, getUserProfile, fetchCartData, setCartItems } = useContext(MenuContext);
  
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
  const [isLoading, setIsLoading] = useState(false); // New loading state

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
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
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

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(`${url}/api/user/register`, signupData);
      if (response.status === 200 && response.data.success) {
        setShowLoginForm(true);
        toast.success("Successfully Registered");
      } else {
        toast.error(response.data.message || "Registration failed");
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        //Dispatch user data to context
        dispatch({ type: "setToken", payload: response.data.token });

        //Handle any cart data if available
        const cartDataItem = JSON.parse(localStorage.getItem("cartItems"));
        if (cartDataItem) {
          console.log("request made");
          await Promise.all(cartDataItem?.menus?.map(async (item) => {
            
            // http://localhost:3000/add-to-cart
            // const response = await fetch("http://food-project-api.onrender.com/api/add-to-cart",
            const cartresponse = await fetch("https://food-project-api.onrender.com/api/add-to-cart", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${getItem("auth-token")}`,  // Use the token directly
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId: item.menu._id, quantity: item.quantity }),
            });

            const cartdata = await cartresponse.json();
            // console.log( "todday", cartdata);
            if (response.ok) {
              setCartItems(cartdata && cartdata.menus);
              fetchCartData();
              showHide("success", "added to cart successfully")
            } else {
              // console.error(Failed to add items to the backend cart);
            }
          }));
          deleteItem("cart");
        }

        // if (cartDataItem) {
        //   console.log("request made");
        //   await Promise.all(
        //     cartDataItem?.products?.map(async (item) => {
        //       const cartResponse = await axios.post(
        //         "http://localhost:3000/api/add-to-cart", { productId: item.menu._id, quantity: item.quantity },
        //         {
        //           headers: {
        //             "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolation
        //             "Content-Type": "application/json",
        //           },
        //         }
        //       );
              
        //       if (cartResponse.status === 200) {
        //         setCartItems(cartResponse.data.menus);
        //         fetchCart();
        //         await getUserProfile(); // Fetch updated user profile on login
        //         onClose();
        //         navigate("/", { replace: true });
        //         console.log("success", "added to cart successfully"); 
        //       }else {
        //         console.error("Failed to add items to the backend cart");
        //       }
        //     })
        //   );
        //   localStorage.removeItem("cartItems");
        // }

        // Update context with user data and redirect
        await getUserProfile(); // Fetch updated user profile on login
        navigate("/");
        window.location.reload()
        console.log("success", "You are now logged in");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

     const { email, password } = loginData;
     if (!email || !password) {
      console.log("error", "Email and Password are required");
      return;
     }

    try {
      const response = await axios.post(`${url}/api/user/login`, loginData);
      console.log(response);
      
      if (response.data.success) {
        const cartDataItem = JSON.parse(localStorage.getItem("cartItems"));
        console.log("localstorage cart", cartDataItem)
        toast.success("Logged In Successfully");
        localStorage.setItem("auth-token", response.data.token);
        if(cartDataItem){
          await Promise.all(cartDataItem?.menus?.map(async (item) => {
            // http://localhost:3000/api/add-to-cart
            const CartResponse = await fetch("https://food-project-api.onrender.com/api/add-to-cart", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Use the token directly
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId: item.menu._id, quantity: item.quantity }),
            });
  
            const cartdata = await CartResponse.json();
            console.log(cartdata.data, "Login cart")
            if (CartResponse.ok) {
              setCartItems(cartdata && cartdata.data)
              await fetchCartData();
              toast.success("added to cart successfully")
            } else {
              console.error("Failed to add items to the backend cart");
            }
          }));
        }

        localStorage.removeItem("cartItems")
        localStorage.setItem("user", JSON.stringify(response.data.user));

        handleUserLogin(response.data.token, response.data.name);
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
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full flex items-center justify-center"
          >
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              "Sign Up"
            )}
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


// with spinner oct 30th not sigingin and not logging in
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
// import { MenuContext } from "../../context/MenuContext";
// import AuthContext from "../../context/AuthContext";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const {dispatch, state} = useContext(AuthContext)
//   const { handleUserLogin, getUserProfile } = useContext(MenuContext);
  
//   const [url] = useState("http://localhost:3000");
//   // const [url] = useState("https://food-project-api.onrender.com");
  
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
//   const [isLoading, setIsLoading] = useState(false); // New loading state

//   // Validate password length
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else {
//       setPasswordError("");
//     }
//   };

//   // New handleSignup function
//   const handleSignupSubmit = async () => {
//     await getUserProfile(); // Fetch updated user profile after registration
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));

//     if (name === "password") {
//       validatePassword(value);
//     }
//   };

//   // const handleLoginChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setLoginData((prev) => ({ ...prev, [name]: value }));
//   // };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // / Handle login form submit
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
  
//     const { email, password } = loginData;
  
//     if (!email || !password) {
//       console.log("error", "Email and Password are required");
//       return;
//     }
  
//     try {
//       const response = await axios.post("http://127.0.0.1:3000/api/user/login", loginData);
//       console.log(response);
  
//       if (response.status !== 200) {
//         console.log("error", response.data.responseText[0]);
//       } else {
//         // Store token and user data in localStorage
//         localStorage.setItem("auth-token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
  
//         // Dispatch user data to context
//         dispatch({ type: "setToken", payload: response.data.token });
  
//         // Handle any cart data if available
//         const cartDataItem = JSON.parse(localStorage.getItem("cartItems"));
//         if (cartDataItem) {
//           console.log("request made");
//           await Promise.all(
//             cartDataItem?.products?.map(async (item) => {
//               const cartResponse = await axios.post(
//                 "http://localhost:3000/api/add-to-cart",
//                 { productId: item.product._id, quantity: item.quantity },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
//                     // "auth-token": localStorage.getItem("auth-token"),
//                   },
//                 }
//               );
  
//               if (cartResponse.status === 200) {
//                 setCartItems(cartResponse.data.products);
//                 fetchCart();
//                 await getUserProfile(); // Fetch updated user profile on login
//                 onClose();
//                 navigate("/", { replace: true });
//                 console.log("success", "added to cart successfully");
//               } else {
//                 console.error("Failed to add items to the backend cart");
//               }
//             })
//           );
//           localStorage.removeItem("cartItems");
//         }
  
//         // Update context with user data and redirect
//         await getUserProfile(); // Fetch updated user profile on login
//         navigate("/");
//         console.log("success", "You are now logged in");
//       }
//     } catch (error) {
//       console.log(error);
//       console.log("error", "An error occurred during login");
//     }
//   };
  
//   // const handleLoginSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post(`${url}/api/user/login`, loginData);
//   //     if (response.data.success) {
//   //       toast.success("Logged In Successfully");

//   //       // Store token and user data in localStorage
//   //       localStorage.setItem("auth-token", response.data.token);
//   //       localStorage.setItem("user", JSON.stringify(response.data.user));

//   //       // Update context with user data
//   //       handleUserLogin(response.data.token, response.data.user);

//   //       // Close the form and navigate
//   //       await getUserProfile(); // Fetch updated user profile on login
//   //       onClose();
//   //       navigate("/", { replace: true });
//   //     } else {
//   //       toast.error("Invalid Credentials");
//   //     }
//   //   } catch (error) {
//   //     handleError(error);
//   //   }
//   // };

//   const toggleLoginForm = () => {
//     setShowLoginForm(!showLoginForm);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
//           <input
//             type="email"
//             name="email"
//             value={loginData.email}
//             onChange={handleLoginChange}
//             placeholder="Email"
//             className="border rounded-md p-2 w-full"
//             required
//           />
//             <div className="relative">
//             <input
//               type={showLoginPassword ? "text" : "password"}
//               name="password"
//               value={loginData.password}
//               onChange={handleLoginChange}
//               placeholder="Password"
//               className="border rounded-md p-2 w-full"
//               required
//             />
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
//             className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full flex items-center justify-center"
//           >
//             {isLoading ? (
//               <span className="loader"></span> // Replace with your spinner component
//             ) : (
//               "Sign Up"
//             )}
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


// signin and login working with spinner but showing the username on the header 
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
// import { MenuContext } from "../../context/MenuContext";

// function SignupLogin({ onClose }) {
//   const navigate = useNavigate();
//   const { handleUserLogin, getUserProfile } = useContext(MenuContext);
  
//   const [url] = useState("http://localhost:3000");
//   // const [url] = useState("https://food-project-api.onrender.com");
  
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
//   const [isLoading, setIsLoading] = useState(false); // New loading state

//   // Validate password length
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else {
//       setPasswordError("");
//     }
//   };

// // new
// const handleSignup = async () => {
//   // Registration logic...
//   await getUserProfile(); // Fetch updated user profile after registration
// };

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

//   const handleError = (error) => {
//     console.error("Error:", error.response ? error.response.data : error.message);
//     toast.error(error.response?.data?.message || "An error occurred");
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (signupData.password !== signupData.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }
//     if (passwordError) {
//       return toast.error(passwordError);
//     }

//     setIsLoading(true); // Start loading

//     try {
//       const response = await axios.post(`${url}/api/user/register`, signupData);
//       if (response.status === 200 && response.data.success) {
//         setShowLoginForm(true);
//         toast.success("Successfully Registered");
//       } else {
//         toast.error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${url}/api/user/login`, loginData);
//       if (response.data.success) {
//         toast.success("Logged In Successfully");

//         // Store token and user data in localStorage
//         localStorage.setItem("auth-token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         // Update context with user data
//         handleUserLogin(response.data.token, response.data.user);

        
        
        
//         // Close the form and navigate
//         getUserProfile();
//         onClose();
//         navigate("/", { replace: true });
//       } else {
//         toast.error("Invalid Credentials");
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   const toggleLoginForm = () => {
//     setShowLoginForm(!showLoginForm);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
//             className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full flex items-center justify-center"
//           >
//             {isLoading ? (
//               <span className="loader"></span> // Replace with your spinner component
//             ) : (
//               "Sign Up"
//             )}
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
