// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';



// export const MenuContext = createContext(null);

// const MenuContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [url] = useState("https://food-project-api.onrender.com");
//   const [menuItems, setMenuItems] = useState([]);
//   const [breakItems, setBreakItems] = useState([]);
//   const [naijaItems, setNaijaItems] = useState([]);
//   const [saladItems, setSaladItems] = useState([]);
//   const [signatureItems, setSignatureItems] = useState([]);
//   const [restaurantList, setRestaurantList] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem('auth-token') || '');

//   // Load cart items from localStorage initially
//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   // Save cart items to localStorage
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Sync local cart with server
//   const syncLocalCartWithServer = async () => {
//     if (token) {
//       try {
//         const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//         if (localCart.length > 0) {
//           // Sync local cart with server
//           const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
  
//           if (response.data && response.data.cartData) {
//             setCartItems(response.data.cartData); // Update cart state with server data
//             localStorage.removeItem('cartItems'); // Clear local storage after successful sync
//             console.log("Local storage cleared");
//           } else {
//             console.error('Server response does not contain cart data');
//           }
//         } else {
//           // Fetch server cart data if local cart is empty
//           fetchCartData(token);
//         }
//       } catch (error) {
//         console.error("Error syncing cart data with server:", error);
//         // Consider handling the error, such as showing an alert to the user
//       }
//     } else {
//       // Use local cart data when not logged in
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   };
  

//   // Fetch cart data
//   const fetchCartData = async (authToken) => {
//     if (!authToken) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const response = await axios.get(`${url}/api/cart/get`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       if (response.data && Array.isArray(response.data.cartData)) {
//         setCartItems(response.data.cartData);
//         updateLocalStorage(response.data.cartData);
//       } else {
//         console.error('Cart data is not an array or is missing');
//         setCartItems([]);
//       }
//     } catch (error) {
//       console.error('Error fetching cart data:', error.message || error);
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('auth-token', token);
//       syncLocalCartWithServer();
//     } else {
//       localStorage.removeItem('auth-token');
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   }, [token]);
  

//   // Fetch menu data
//   const fetchMenuData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/featured`);
//       if (response.data.success) {
//         setMenuItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchNaijaData = async () => {
//     try {
//       const response = await axios.get(`https://food-project-api.onrender.com/api/menu/naija`);
//       if (response.data.success) {
//         setNaijaItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchSaladData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/salad`);
//       if (response.data.success) {
//         setSaladItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchBreakData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/breakfast`);
//       if (response.data && response.data.success) {
//         setBreakItems(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching breakfast data:', error.response ? error.response.data : error.message);
//     }
//   };

//   const fetchSignatureData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/signature`);
//       if (response.data.success) {
//         setSignatureItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchRestaurantData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/restaurant/list`);
//       if (response.data && response.data.success) {
//         setRestaurantList(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMenuData();
//     fetchBreakData();
//     fetchNaijaData();
//     fetchSaladData();
//     fetchSignatureData();
//     fetchRestaurantData();
//   }, []);

//   const addToCart = async (item) => {
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }
  
//     try {
//       // Post to the server to add the item to the cart
//       const response = await axios.post(
//         `${url}/api/cart/add`,
//         { itemId: item._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.success) {
//         // Update local state
//         setCartItems((prevCartItems) => {
//           const updatedCartItems = [...prevCartItems];
//           const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);
  
//           if (existingItemIndex > -1) {
//             // Item already exists, update quantity
//             updatedCartItems[existingItemIndex].quantity += 1;
//           } else {
//             // Item does not exist, add new item with quantity 1
//             updatedCartItems.push({ ...item, quantity: 1 });
//           }
  
//           updateLocalStorage(updatedCartItems); // Update local storage
//           return updatedCartItems;
//         });
//       } else {
//         console.error('Failed to add item to cart:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };
  
  
//   const removeCartItem = async (itemId) => {
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }
  
//     try {
//       const updatedCart = cartItems.filter(item => item._id !== itemId);
//       setCartItems(updatedCart);
//       updateLocalStorage(updatedCart);
  
//       await axios.delete(`${url}/api/cart/delete`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { itemId },
//       });
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       window.location.href = '/menu'; // Redirect to menu if necessary
//     }
//   };
  

//   const addCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
//       if (existingItemIndex > -1) {
//         const updatedCartItems = prevCartItems.map(item => 
//           item._id === itemId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return updatedCartItems;
//       } else {
//         const newItem = {}; // Replace with actual item details
//         return [...prevCartItems, { ...newItem, quantity: 1 }];
//       }
//     });
//   };

//   const reduceCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const updatedCartItems = prevCartItems.map(item => {
//         if (item._id === itemId) {
//           return {
//             ...item,
//             quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
//           };
//         }
//         return item;
//       }).filter(item => item.quantity > 0);
//       return updatedCartItems;
//     });
//   };


//   const fetchUserData = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         if (parsedData && parsedData.firstName) {
//           setUserName(parsedData.firstName);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const getUserProfile = async () => {
//     try {
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data.profile);
//       console.log("Fetched user profile:", response.data.profile);
//     } catch (error) {
//       console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
//     }
//   };
  

//   const updateUserProfile = async (profileData) => {
//     try {
//       setError(null);
//       setSuccess(false);

//       let response;     
      
//       if (profileData instanceof FormData) {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data' 
//           }
//         });
//       } else {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }
          
//       setUserProfile(response.data.profile);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeCartItem,
//     addCartItem,
//     reduceCartItem,
//     menuItems,
//     breakItems,
//     saladItems,
//     naijaItems,
//     signatureItems,
//     restaurantList,
//     url,
//     fetchUserData,
//     fetchCartData,
//     userName,
//     getUserProfile,
//     userProfile,
//     updateUserProfile,
//     error,
//     success
//   };

//   return (
//     <MenuContext.Provider value={contextValue}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export default MenuContextProvider;



// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';

// export const MenuContext = createContext(null);

// const MenuContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [url] = useState("https://food-project-api.onrender.com");
//   const [menuItems, setMenuItems] = useState([]);
//   const [breakItems, setBreakItems] = useState([]);
//   const [naijaItems, setNaijaItems] = useState([]);
//   const [saladItems, setSaladItems] = useState([]);
//   const [signatureItems, setSignatureItems] = useState([]);
//   const [restaurantList, setRestaurantList] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem('auth-token') || '');

//   // Load cart items from localStorage initially
//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   // Save cart items to localStorage
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Define updateLocalStorage function
//   const updateLocalStorage = (updatedCart) => {
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//   };

//   // Sync local cart with server
//   const syncLocalCartWithServer = async () => {
//     if (token) {
//       try {
//         const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//         if (localCart.length > 0) {
//           // Sync local cart with server
//           const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
  
//           if (response.data && response.data.cartData) {
//             setCartItems(response.data.cartData); // Update cart state with server data
//             localStorage.removeItem('cartItems'); // Clear local storage after successful sync
//             console.log("Local storage cleared");
//           } else {
//             console.error('Server response does not contain cart data');
//           }
//         } else {
//           // Fetch server cart data if local cart is empty
//           fetchCartData(token);
//         }
//       } catch (error) {
//         console.error("Error syncing cart data with server:", error);
//       }
//     } else {
//       // Use local cart data when not logged in
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   };

//   // Fetch cart data
//   const fetchCartData = async (authToken) => {
//     if (!authToken) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const response = await axios.get(`${url}/api/cart/get`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       if (response.data && Array.isArray(response.data.cartData)) {
//         setCartItems(response.data.cartData);
//         updateLocalStorage(response.data.cartData);
//       } else {
//         console.error('Cart data is not an array or is missing');
//         setCartItems([]);
//       }
//     } catch (error) {
//       console.error('Error fetching cart data:', error.message || error);
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('auth-token', token);
//       syncLocalCartWithServer();
//     } else {
//       localStorage.removeItem('auth-token');
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   }, [token]);

//   // Fetch menu data
//   const fetchMenuData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/featured`);
//       if (response.data.success) {
//         setMenuItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchNaijaData = async () => {
//     try {
//       const response = await axios.get(`https://food-project-api.onrender.com/api/menu/naija`);
//       if (response.data.success) {
//         setNaijaItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchSaladData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/salad`);
//       if (response.data.success) {
//         setSaladItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchBreakData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/breakfast`);
//       if (response.data && response.data.success) {
//         setBreakItems(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching breakfast data:', error.response ? error.response.data : error.message);
//     }
//   };

//   const fetchSignatureData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/signature`);
//       if (response.data.success) {
//         setSignatureItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchRestaurantData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/restaurant/list`);
//       if (response.data && response.data.success) {
//         setRestaurantList(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMenuData();
//     fetchBreakData();
//     fetchNaijaData();
//     fetchSaladData();
//     fetchSignatureData();
//     fetchRestaurantData();
//   }, []);

//   const addToCart = async (item) => {
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }
  
//     try {
//       // Post to the server to add the item to the cart
//       const response = await axios.post(
//         `${url}/api/cart/add`,
//         { itemId: item._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.success) {
//         // Update local state
//         setCartItems((prevCartItems) => {
//           const updatedCartItems = [...prevCartItems];
//           const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);
  
//           if (existingItemIndex > -1) {
//             // Item already exists, update quantity
//             updatedCartItems[existingItemIndex].quantity += 1;
//           } else {
//             // Item does not exist, add new item with quantity 1
//             updatedCartItems.push({ ...item, quantity: 1 });
//           }
  
//           updateLocalStorage(updatedCartItems); // Update local storage
//           return updatedCartItems;
//         });
//       } else {
//         console.error('Failed to add item to cart:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   const removeCartItem = async (itemId) => {
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }
  
//     try {
//       const updatedCart = cartItems.filter(item => item._id !== itemId);
//       setCartItems(updatedCart);
//       updateLocalStorage(updatedCart);
  
//       await axios.delete(`${url}/api/cart/delete`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { itemId },
//       });
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       window.location.href = '/menu'; // Redirect to menu if necessary
//     }
//   };

//   const addCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
//       if (existingItemIndex > -1) {
//         const updatedCartItems = prevCartItems.map(item => 
//           item._id === itemId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return updatedCartItems;
//       } else {
//         const newItem = {}; // Replace with actual item details
//         return [...prevCartItems, { ...newItem, quantity: 1 }];
//       }
//     });
//   };

//   const reduceCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const updatedCartItems = prevCartItems.map(item => {
//         if (item._id === itemId) {
//           return {
//             ...item,
//             quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
//           };
//         }
//         return item;
//       }).filter(item => item.quantity > 0);
//       return updatedCartItems;
//     });
//   };

//   const fetchUserData = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         if (parsedData && parsedData.firstName) {
//           setUserName(parsedData.firstName);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const getUserProfile = async () => {
//     try {
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data.profile);
//       console.log("Fetched user profile:", response.data.profile);
//     } catch (error) {
//       console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
//     }
//   };

//   const updateUserProfile = async (profileData) => {
//     try {
//       setError(null);
//       setSuccess(false);

//       let response;     
      
//       if (profileData instanceof FormData) {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data' 
//           }
//         });
//       } else {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }
          
//       setUserProfile(response.data.profile);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeCartItem,
//     addCartItem,
//     reduceCartItem,
//     menuItems,
//     breakItems,
//     saladItems,
//     naijaItems,
//     signatureItems,
//     restaurantList,
//     url,
//     fetchUserData,
//     fetchCartData,
//     userName,
//     getUserProfile,
//     userProfile,
//     updateUserProfile,
//     error,
//     success
//   };

//   return (
//     <MenuContext.Provider value={contextValue}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export default MenuContextProvider;




// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';

// export const MenuContext = createContext(null);

// const MenuContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [url] = useState("https://food-project-api.onrender.com");
//   const [menuItems, setMenuItems] = useState([]);
//   const [breakItems, setBreakItems] = useState([]);
//   const [naijaItems, setNaijaItems] = useState([]);
//   const [saladItems, setSaladItems] = useState([]);
//   const [signatureItems, setSignatureItems] = useState([]);
//   const [restaurantList, setRestaurantList] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem('auth-token') || '');

//   // Load cart items from localStorage initially if not logged in
//   useEffect(() => {
//     if (!token) {
//       const storedCartItems = localStorage.getItem('cartItems');
//       if (storedCartItems) {
//         setCartItems(JSON.parse(storedCartItems));
//       }
//     }
//   }, [token]);

//   // Save cart items to localStorage if not logged in
//   useEffect(() => {
//     if (!token) {
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
//   }, [cartItems, token]);

//   // Sync local cart with server
//   const syncLocalCartWithServer = async () => {
//     if (token) {
//       try {
//         const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//         if (localCart.length > 0) {
//           const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });

//           if (response.data && response.data.cartData) {
//             setCartItems(response.data.cartData); // Update cart state with server data
//             localStorage.removeItem('cartItems'); // Clear local storage after successful sync
//           } else {
//             console.error('Server response does not contain cart data');
//           }
//         } else {
//           fetchCartData(token); // Fetch server cart data if local cart is empty
//         }
//       } catch (error) {
//         console.error("Error syncing cart data with server:", error);
//       }
//     } else {
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   };

//   // Fetch cart data from server
//   const fetchCartData = async (authToken) => {
//     if (!authToken) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const response = await axios.get(`${url}/api/cart/get`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       if (response.data && Array.isArray(response.data.cartData)) {
//         setCartItems(response.data.cartData);
//         localStorage.removeItem('cartItems'); // Ensure localStorage is cleared when fetching cart data
//       } else {
//         console.error('Cart data is not an array or is missing');
//         setCartItems([]);
//       }
//     } catch (error) {
//       console.error('Error fetching cart data:', error.message || error);
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('auth-token', token);
//       syncLocalCartWithServer();
//     } else {
//       localStorage.removeItem('auth-token');
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   }, [token]);

//   // Fetch menu data
//   const fetchMenuData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/featured`);
//       if (response.data.success) {
//         setMenuItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchNaijaData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/naija`);
//       if (response.data.success) {
//         setNaijaItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchSaladData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/salad`);
//       if (response.data.success) {
//         setSaladItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchBreakData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/breakfast`);
//       if (response.data && response.data.success) {
//         setBreakItems(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching breakfast data:', error.response ? error.response.data : error.message);
//     }
//   };

//   const fetchSignatureData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/signature`);
//       if (response.data.success) {
//         setSignatureItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchRestaurantData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/restaurant/list`);
//       if (response.data && response.data.success) {
//         setRestaurantList(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMenuData();
//     fetchBreakData();
//     fetchNaijaData();
//     fetchSaladData();
//     fetchSignatureData();
//     fetchRestaurantData();
//   }, []);

//   const addToCart = async (item) => {
//     if (!token) {
//       // Add to localStorage if not logged in
//       const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       const updatedCart = [...existingCart];
//       const existingItemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

//       if (existingItemIndex > -1) {
//         updatedCart[existingItemIndex].quantity += 1;
//       } else {
//         updatedCart.push({ ...item, quantity: 1 });
//       }

//       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//       setCartItems(updatedCart);
//     } else {
//       try {
//         // Add to server cart if logged in
//         const response = await axios.post(
//           `${url}/api/cart/add`,
//           { itemId: item._id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data.success) {
//           setCartItems((prevCartItems) => {
//             const updatedCartItems = [...prevCartItems];
//             const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

//             if (existingItemIndex > -1) {
//               updatedCartItems[existingItemIndex].quantity += 1;
//             } else {
//               updatedCartItems.push({ ...item, quantity: 1 });
//             }

//             return updatedCartItems;
//           });
//         } else {
//           console.error('Failed to add item to cart:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error adding item to cart:', error);
//       }
//     }
//   };

//   const removeCartItem = async (itemId) => {
//     if (!token) {
//       const updatedCart = cartItems.filter(item => item._id !== itemId);
//       setCartItems(updatedCart);
//       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     } else {
//       try {
//         const updatedCart = cartItems.filter(item => item._id !== itemId);
//         setCartItems(updatedCart);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCart));

//         await axios.delete(`${url}/api/cart/delete`, {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { itemId },
//         });
//       } catch (error) {
//         console.error('Error removing item from cart:', error);
//         window.location.href = '/menu'; // Redirect to menu if necessary
//       }
//     }
//   };

//   const addCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
//       if (existingItemIndex > -1) {
//         const updatedCartItems = prevCartItems.map(item => 
//           item._id === itemId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return updatedCartItems;
//       } else {
//         const newItem = {}; // Replace with actual item details
//         return [...prevCartItems, { ...newItem, quantity: 1 }];
//       }
//     });
//   };

//   const reduceCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const updatedCartItems = prevCartItems.map(item => {
//         if (item._id === itemId) {
//           return {
//             ...item,
//             quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
//           };
//         }
//         return item;
//       }).filter(item => item.quantity > 0);
//       return updatedCartItems;
//     });
//   };

//   const fetchUserData = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         if (parsedData && parsedData.firstName) {
//           setUserName(parsedData.firstName);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const getUserProfile = async () => {
//     try {
//       const response = await axios.get(`${url}/api/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data.profile);
//       console.log("Fetched user profile:", response.data.profile);
//     } catch (error) {
//       console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
//     }
//   };

//   const updateUserProfile = async (profileData) => {
//     try {
//       setError(null);
//       setSuccess(false);

//       let response;
//       if (profileData instanceof FormData) {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data' 
//           }
//         });
//       } else {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }

//       setUserProfile(response.data.profile);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeCartItem,
//     addCartItem,
//     reduceCartItem,
//     menuItems,
//     breakItems,
//     saladItems,
//     naijaItems,
//     signatureItems,
//     restaurantList,
//     url,
//     fetchUserData,
//     fetchCartData,
//     userName,
//     getUserProfile,
//     userProfile,
//     updateUserProfile,
//     error,
//     success
//   };

//   return (
//     <MenuContext.Provider value={contextValue}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export default MenuContextProvider;




// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';

// export const MenuContext = createContext(null);

// const MenuContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [url] = useState("https://food-project-api.onrender.com");
//   const [menuItems, setMenuItems] = useState([]);
//   const [breakItems, setBreakItems] = useState([]);
//   const [naijaItems, setNaijaItems] = useState([]);
//   const [saladItems, setSaladItems] = useState([]);
//   const [signatureItems, setSignatureItems] = useState([]);
//   const [restaurantList, setRestaurantList] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [showSignupLogin, setShowSignupLogin] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('auth-token') || '');

//   // Initialize cart items from localStorage if not logged in
//   useEffect(() => {
//     if (!token) {
//       const storedCartItems = localStorage.getItem('cartItems');
//       if (storedCartItems) {
//         setCartItems(JSON.parse(storedCartItems));
//       }
//     }
//   }, [token]);

//   // Update localStorage when cartItems change and user is not logged in
//   useEffect(() => {
//     if (!token) {
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
//   }, [cartItems, token]);

//   // Sync local cart with server on login
//   const syncLocalCartWithServer = async () => {
//     if (token) {
//       try {
//         const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//         if (localCart.length > 0) {
//           const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });

//           if (response.data && response.data.cartData) {
//             setCartItems(response.data.cartData); // Update cart state with server data
//             localStorage.removeItem('cartItems'); // Clear local storage after successful sync
//           } else {
//             console.error('Server response does not contain cart data');
//           }
//         } else {
//           fetchCartData(token); // Fetch server cart data if local cart is empty
//         }
//       } catch (error) {
//         console.error("Error syncing cart data with server:", error);
//       }
//     } else {
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   };

//   // Fetch cart data from server
//   const fetchCartData = async (authToken) => {
//     if (!authToken) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const response = await axios.get(`${url}/api/cart/get`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       if (response.data && Array.isArray(response.data.cartData)) {
//         setCartItems(response.data.cartData);
//       } else {
//         console.error('Cart data is not an array or is missing');
//         setCartItems([]);
//       }
//     } catch (error) {
//       console.error('Error fetching cart data:', error.message || error);
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('auth-token', token);
//       syncLocalCartWithServer();
//     } else {
//       localStorage.removeItem('auth-token');
//       const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       setCartItems(localCart);
//     }
//   }, [token]);

//   // Fetch menu data
//   const fetchMenuData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/featured`);
//       if (response.data.success) {
//         setMenuItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchNaijaData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/naija`);
//       if (response.data.success) {
//         setNaijaItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchSaladData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/salad`);
//       if (response.data.success) {
//         setSaladItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchBreakData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/breakfast`);
//       if (response.data && response.data.success) {
//         setBreakItems(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching breakfast data:', error.response ? error.response.data : error.message);
//     }
//   };

//   const fetchSignatureData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/signature`);
//       if (response.data.success) {
//         setSignatureItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//     }
//   };

//   const fetchRestaurantData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/restaurant/list`);
//       if (response.data && response.data.success) {
//         setRestaurantList(response.data.data || []);
//       } else {
//         console.error('Response does not indicate success:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMenuData();
//     fetchBreakData();
//     fetchNaijaData();
//     fetchSaladData();
//     fetchSignatureData();
//     fetchRestaurantData();
//   }, []);

//   const addToCart = async (item) => {
//     if (!token) {
//       // Add to localStorage if not logged in
//       const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       const updatedCart = [...existingCart];
//       const existingItemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

//       if (existingItemIndex > -1) {
//         updatedCart[existingItemIndex].quantity += 1;
//       } else {
//         updatedCart.push({ ...item, quantity: 1 });
//       }

//       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//       setCartItems(updatedCart);
//     } else {
//       try {
//         // Add to server cart if logged in
//         const response = await axios.post(
//           `${url}/api/cart/add`,
//           { itemId: item._id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data.success) {
//           setCartItems((prevCartItems) => {
//             const updatedCartItems = [...prevCartItems];
//             const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

//             if (existingItemIndex > -1) {
//               updatedCartItems[existingItemIndex].quantity += 1;
//             } else {
//               updatedCartItems.push({ ...item, quantity: 1 });
//             }

//             return updatedCartItems;
//           });
//         } else {
//           console.error('Failed to add item to cart:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error adding item to cart:', error);
//       }
//     }
//   };

//   const removeCartItem = async (itemId) => {
//     if (!token) {
//       const updatedCart = cartItems.filter(item => item._id !== itemId);
//       setCartItems(updatedCart);
//       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     } else {
//       try {
//         const updatedCart = cartItems.filter(item => item._id !== itemId);
//         setCartItems(updatedCart);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCart));

//         await axios.delete(`${url}/api/cart/delete`, {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { itemId },
//         });
//       } catch (error) {
//         console.error('Error removing item from cart:', error);
//         window.location.href = '/menu'; // Redirect to menu if necessary
//       }
//     }
//   };

//   const addCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
//       if (existingItemIndex > -1) {
//         const updatedCartItems = prevCartItems.map(item => 
//           item._id === itemId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return updatedCartItems;
//       } else {
//         const newItem = {}; // Replace with actual item details
//         return [...prevCartItems, { ...newItem, quantity: 1 }];
//       }
//     });
//   };

//   const reduceCartItem = (itemId) => {
//     setCartItems(prevCartItems => {
//       const updatedCartItems = prevCartItems.map(item => {
//         if (item._id === itemId) {
//           return {
//             ...item,
//             quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
//           };
//         }
//         return item;
//       }).filter(item => item.quantity > 0);
//       return updatedCartItems;
//     });
//   };

//   const fetchUserData = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         if (parsedData && parsedData.firstName) {
//           setUserName(parsedData.firstName);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   const getUserProfile = async () => {
//     const token = localStorage.getItem('auth-token');
//     if (token) {
//       try {
//         const response = await fetch(`${url}/user/profile`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUserProfile(data.profile);
//         setUserName(data.profile.name);
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch user profile on mount if user is logged in
//     getUserProfile();
//   }, [url]);

//   const updateUserProfile = async (profileData) => {
//     try {
//       setError(null);
//       setSuccess(false);

//       let response;
//       if (profileData instanceof FormData) {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data' 
//           }
//         });
//       } else {
//         response = await axios.post(`${url}/api/profile/update`, profileData, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }

//       setUserProfile(response.data.profile);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   const handleUserLogin = (newToken, user) => {
//     setToken(newToken);
//     setUserName(user.name);
//     setUserProfile(user);
//   };

//   // const handleClose = () => {
//   //   setShowSignupLogin(false);
//   // };


//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeCartItem,
//     addCartItem,
//     reduceCartItem,
//     menuItems,
//     breakItems,
//     saladItems,
//     naijaItems,
//     signatureItems,
//     restaurantList,
//     url,
//     fetchUserData,
//     fetchCartData,
//     userName,
//     getUserProfile,
//     userProfile,
//     updateUserProfile,
//     error,
//     success,
//     setToken,
//     handleUserLogin
//   };

//   return (
//     <MenuContext.Provider value={contextValue}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export default MenuContextProvider;


import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const MenuContext = createContext(null);

const MenuContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [url] = useState("https://food-project-api.onrender.com");
  const [menuItems, setMenuItems] = useState([]);
  const [breakItems, setBreakItems] = useState([]);
  const [naijaItems, setNaijaItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);
  const [signatureItems, setSignatureItems] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('auth-token') || '');

  // Initialize cart items from localStorage if not logged in
  useEffect(() => {
    if (!token) {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [token]);

  // Update localStorage when cartItems change and user is not logged in
  useEffect(() => {
    if (!token) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  // Sync local cart with server on login
  const syncLocalCartWithServer = async () => {
    if (token) {
      try {
        const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (localCart.length > 0) {
          const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data && response.data.cartData) {
            setCartItems(response.data.cartData); // Update cart state with server data
            localStorage.removeItem('cartItems'); // Clear local storage after successful sync
          } else {
            console.error('Server response does not contain cart data');
          }
        } else {
          fetchCartData(token); // Fetch server cart data if local cart is empty
        }
      } catch (error) {
        console.error("Error syncing cart data with server:", error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(localCart);
    }
  };

  // Fetch cart data from server
  const fetchCartData = async (authToken) => {
    if (!authToken) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data && Array.isArray(response.data.cartData)) {
        setCartItems(response.data.cartData);
      } else {
        console.error('Cart data is not an array or is missing');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message || error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth-token', token);
      syncLocalCartWithServer();
    } else {
      localStorage.removeItem('auth-token');
      const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(localCart);
    }
  }, [token]);

  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/featured`);
      if (response.data.success) {
        setMenuItems(response.data.data || []);
      } else {
        console.error('Failed to fetch menu data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const fetchNaijaData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/naija`);
      if (response.data.success) {
        setNaijaItems(response.data.data || []);
      } else {
        console.error('Failed to fetch menu data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const fetchSaladData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/salad`);
      if (response.data.success) {
        setSaladItems(response.data.data || []);
      } else {
        console.error('Failed to fetch menu data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const fetchBreakData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/breakfast`);
      if (response.data && response.data.success) {
        setBreakItems(response.data.data || []);
      } else {
        console.error('Response does not indicate success:', response.data);
      }
    } catch (error) {
      console.error('Error fetching breakfast data:', error.response ? error.response.data : error.message);
    }
  };

  const fetchSignatureData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/signature`);
      if (response.data.success) {
        setSignatureItems(response.data.data || []);
      } else {
        console.error('Failed to fetch menu data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurant/list`);
      if (response.data && response.data.success) {
        setRestaurantList(response.data.data || []);
      } else {
        console.error('Response does not indicate success:', response.data);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchMenuData();
    fetchBreakData();
    fetchNaijaData();
    fetchSaladData();
    fetchSignatureData();
    fetchRestaurantData();
  }, []);

  const addToCart = async (item) => {
    if (!token) {
      // Add to localStorage if not logged in
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCart = [...existingCart];
      const existingItemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      try {
        // Add to server cart if logged in
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId: item._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

            if (existingItemIndex > -1) {
              updatedCartItems[existingItemIndex].quantity += 1;
            } else {
              updatedCartItems.push({ ...item, quantity: 1 });
            }

            return updatedCartItems;
          });
        } else {
          console.error('Failed to add item to cart:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  const removeCartItem = async (itemId) => {
    if (!token) {
      const updatedCart = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      try {
        const updatedCart = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        await axios.delete(`${url}/api/cart/delete`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { itemId },
        });
      } catch (error) {
        console.error('Error removing item from cart:', error);
        // Consider handling this error more gracefully
        // window.location.href = '/menu'; // Redirect to menu if necessary
      }
    }
  };

  const addCartItem = (itemId) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
      if (existingItemIndex > -1) {
        const updatedCartItems = prevCartItems.map(item => 
          item._id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCartItems;
      } else {
        const newItem = {}; // Replace with actual item details
        return [...prevCartItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const reduceCartItem = (itemId) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = prevCartItems.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          };
        }
        return item;
      }).filter(item => item.quantity > 0);
      return updatedCartItems;
    });
  };

  const fetchUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.firstName) {
          setUserName(parsedData.firstName);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const getUserProfile = async () => {
    if (token) {
      try {
        const response = await fetch(`${url}/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data.profile);
        setUserName(data.profile.name);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch user profile on mount if user is logged in
    getUserProfile();
  }, [token, url]);

  const updateUserProfile = async (profileData) => {
    try {
      setError(null);
      setSuccess(false);

      let response;
      if (profileData instanceof FormData) {
        response = await axios.post(`${url}/api/profile/update`, profileData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
          }
        });
      } else {
        response = await axios.post(`${url}/api/profile/update`, profileData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setUserProfile(response.data.profile);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleUserLogin = (newToken, user) => {
    setToken(newToken);
    setUserName(user.name);
    setUserProfile(user);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeCartItem,
    addCartItem,
    reduceCartItem,
    menuItems,
    breakItems,
    saladItems,
    naijaItems,
    signatureItems,
    restaurantList,
    url,
    fetchUserData,
    fetchCartData,
    userName,
    getUserProfile,
    userProfile,
    updateUserProfile,
    error,
    success,
    setToken,
    handleUserLogin
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
