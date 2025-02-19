import React, { createContext, useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  // Load initial cart from localStorage
  const storedCart = JSON.parse(localStorage.getItem("cartItems"));
  return storedCart || { products: [] };
}
const isAuthenticated = false;

const MenuContextProvider = ({ children }) => {
  // const [cartItems, setCartItems] = useState([]);
  // const [url] = useState("http://food-project-api.onrender.com");
  const [url] = useState("https://food-project-api.onrender.com");
  const [menuItems, setMenuItems] = useState([]);
  const [breakItems, setBreakItems] = useState([]);
  const [naijaItems, setNaijaItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);
  const [signatureItems, setSignatureItems] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [userName, setUserName] = useState('');
  const [order, setOrder] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
  const [ state, dispatch ] = useContext(AuthContext);
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState({ products: [] });
  const hasLoggedProfile = useRef(false); // Use a ref to track logging state
  const [loading, setLoading] = useState(true)



  const isAuthenticated = state.accessToken !== null

  // Load cart items from localStorage initially if not logged in
  // useEffect(() => {
  //   if (!token) {
  //     const storedCartItems = localStorage.getItem('cartItems');
  //     if (storedCartItems) {
  //       setCartItems(JSON.parse(storedCartItems));
  //     }
  //   }
  // }, [token]);

  // Save cart items to localStorage if not logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartData()
    }
  }, [cartItems]);


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
    setCartItems(savedCart);
  }, []);
  
  // Sync local cart with server
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


  // mr promise code 1st november
  // fetch cart
  const fetchCartData = async () => {
    if (isAuthenticated) {
      // authenticated
      
      // https://food-project-api.onrender.com/api/carts
      const res = await fetch("https://food-project-api.onrender.com/api/carts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolation
          "Content-Type": "application/json",
          // "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });
      console.log(res, "fetchCart")

      // testing 4th december 2024
      // Fetch cart items after login (client-side)
// fetch('/api/cart', {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem("auth_token")}`,
//   },
// })
// .then(response => response.json())
// .then(cart => {
//   // Sync cart data on the client
//   localStorage.setItem('cart_items', JSON.stringify(cart));
// });

      const data = await res.json();
      console.log(data, "data")
      console.log(cartItems, "data22")
      if (res.ok) {
        setCartItems(data.data); // change the operator both statement has to be true
      } else {
        toast("error", "Could not get cart");
      }
      // authenticated done
    } else {
      // unauthenticated  old just change 2 feb 2025
      // const localCart = localStorage.getItem("cartItems");
      // const cart = JSON.parse(localStorage.getItem("cartItems")) || { menus: [] };

      const localCart = localStorage.getItem("cartItems");
      const parsedCart = localCart ? JSON.parse(localCart) : { menus: [] }; // new added 2 feb 2025
  
      if (parsedCart.menus && parsedCart.menus.length > 0) {
        setCartItems(parsedCart);
      } else {
        setCartItems([]); // Clear cart items if nothing is in local storage
      }
      // console.log("Cart:", cart);

      // console.log("cart",localCart);
      // console.log("cart",cartItems);
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        setCartItems([]); // Clear cart items if nothing is in local storage
      }
      // unauthenticated done
    }
  };


  // my code 1st november
  // Fetch cart data from server
  // const fetchCartData = async (authToken) => {
  //   if (!authToken) {
  //     console.error('No authentication token found');
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`${url}/api/cart/users`, {
  //       headers: { Authorization: `Bearer ${authToken}` }
  //     });
  //     if (response.data && Array.isArray(response.data.cartData)) {
  //       setCartItems(response.data.cartData);
  //       localStorage.removeItem('cartItems'); // Ensure localStorage is cleared when fetching cart data
  //     } else {
  //       console.error('Cart data is not an array or is missing');
  //       setCartItems([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart data:', error.message || error);
  //     setCartItems([]);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem('auth-token', token);
  //     syncLocalCartWithServer();
  //   } else {
  //     localStorage.removeItem('auth-token');
  //     const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
  //     setCartItems(localCart);
  //   }
  // }, [token]);

  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/featured`);
      if (response.data.success) {
        setMenuItems(response.data.data || []);
        // console.log(response.data.data)
        // if (isAuthenticated) {
        //   console.log("Cart items for logged-in user:", cartItems);
        // }
        
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


   // mr promise code 1st november
  // adding items to cart
  // Modified addToCart function to ensure reliable localStorage storage for unauthenticated users

// const addToCart = async (productId, quantity, product) => {
//   if (isAuthenticated) {
//     try {
//       const res = await fetch("http://food-project-api.onrender.com/api/add-to-cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           // "Authorization": `${localStorage.getItem("auth-token")}`,
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("cart",JSON.stringify(data))
//         setCartItems(data); // Updates the cart items in state for authenticated users
//         showHide("success", "You have successfully added item to cart");
//       } else {
//         // showHide("error", "Product was not added to cart");
//         console.log("error", "Product already exists")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     // Handle unauthenticated users' cart using localStorage
//     // console.log("running unauth")
//     // const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
//     // console.log("running unauth 1", storedCart)
//     // // Check if the product already exists in the cart
//     // const itemIndex = storedCart.products.findIndex((item) => item.product._id === productId);
//     // console.log(itemIndex)
//     const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
//     console.log("running unauth 1", storedCart);

   


//     // Ensure storedCart.products is an array
//     if (!Array.isArray(storedCart.products)) {
//       storedCart.products = [];
//     }

//     // Check if the product already exists in the cart
//     const itemIndex = storedCart.products.findIndex((item) => item.product._id === productId);
//     console.log(itemIndex);

//     if (itemIndex >= 0) {
//       // If the product exists, update the quantity and amount
//       storedCart.products[itemIndex].quantity += quantity;
//       storedCart.products[itemIndex].amount = product.price * storedCart.products[itemIndex].quantity;
//     } else {
//       // If the product doesn't exist, add it to the cart
//       // storedCart.products.push({
//       //   product,
//       //   quantity,
//       //   amount: product.price * quantity,
//       // });
//       if (!product) {
//         throw new Error("Product is undefined. Ensure the product is fetched correctly.");
//       }
//       if (!productId) {
//   throw new Error("Product ID is missing. Ensure the correct product ID is provided.");
// }

      
//       storedCart.products.push({
//         product,
//         quantity,
//         amount: product.price * quantity, // Safe to access now
//       });
//       console.log("Adding product to cart:", product);

// if (!product) {
//   throw new Error("Product is undefined. Check the source of 'product'.");
// }

      
//     }
//     const stringed = JSON.stringify(storedCart)
//     localStorage.setItem("cartItems", stringed)
//     setCartItems(storedCart); // Updates cart items in state for unauthenticated users
//   }
// };


console.log(isAuthenticated) // shows false on console


//testimg updated code 18th november testing new 21 november
// const addToCart = async (productId, quantity, product) => {
//   if (isAuthenticated) {
//     // Handle authenticated user's cart
//     try {
//       // const token = localStorage.getItem("token");
//       // if (!token) {
//       //   console.error("User token is missing. Please log in.");
//       //   return;
//       // }

//       const res = await fetch("http://food-project-api.onrender.com/api/add-to-cart", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       console.log("Request Payload:", { productId, quantity });

//       console.log("res", res)
//       const data = await res.json();
//       console.log("Server Response", data)

//       if (res.ok) {
//         // Clear localStorage cart for authenticated users
//         localStorage.removeItem("cartItems");
//         localStorage.setItem("cartItems", JSON.stringify(data)); // Persist the updated cart
//         setCartItems(data); // Update state with server response
//         toast("success", "You have successfully added the item to the cart");
//       } else {
//         console.error("Failed to add product to cart:", data.message || "Unknown error");
//         toast("error", data.message || "Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast("error", "An error occurred while adding the item to the cart.");
//     }
//   } else {
//     // Handle unauthenticated user's cart using localStorage
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       // Check if the product already exists in the cart
//       const itemIndex = storedCart.products.findIndex((item) => item.product._id === productId);

//       if (itemIndex >= 0) {
//         // If the product exists, update the quantity and amount
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         if (!product) {
//           throw new Error("Product details are missing. Ensure the correct product is being added.");
//         }

//         // Add new product to the cart
//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       // Update localStorage and UI
//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart.products); // Update state for UI
//       toast("success", "Item added to cart");
//     } catch (error) {
//       console.error("Error adding to localStorage cart:", error);
//       toast("error", "Failed to add the item to the cart.");
//     }
//   }
// };


// const totalCartCount = () => {
//   return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
// };


//trying new 21 november
// const addToCart = async (productId, quantity, product) => {
//   if (isAuthenticated) {
//     // Handle authenticated user's cart logic here...
//     // (your server sync logic as we discussed earlier)
//   } else {
//     try {
//       // Get the existing cart or initialize it
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       // Ensure products is an array
//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       // Find the product in the cart
//       const itemIndex = storedCart.products.findIndex(
//         (item) => item.product._id === productId
//       );

//       if (itemIndex >= 0) {
//         // Update quantity if product exists in the cart
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         // Add new product to the cart
//         if (!product) {
//           throw new Error("Product details are missing. Please provide the correct product.");
//         }

        

//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       // Update localStorage and state
//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart.products); // Update state for UI
     

//       toast("success", "Item added to cart");
//     } catch (error) {
//       console.error("Error adding to cart (localStorage):", error);
//       toast("error", "Failed to add the item to the cart.");
//     }
//   }
// };


// just now to check if it will count and add to cart
// const addToCart = async (productId, quantity, product) => {
//   if (isAuthenticated) {
//     // Handle authenticated user's cart logic here (e.g., server sync)
//   } else {
//     try {
//       // Get the existing cart or initialize it
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       // Ensure products is an array
//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       // Find the product in the cart
//       const itemIndex = storedCart.products.findIndex(
//         (item) => item.product._id === productId
//       );

//       if (itemIndex >= 0) {
//         // Update quantity if product exists in the cart
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         // Add new product to the cart
//         if (!product) {
//           throw new Error("Product details are missing. Please provide the correct product.");
//         }

//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       // Update localStorage and state
//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart); // Set the entire cart object, not just products

//       toast("success", "Item added to cart");
//     } catch (error) {
//       console.error("Error adding to cart (localStorage):", error);
//       toast("error", "Failed to add the item to the cart.");
//     }
//   }
// };



//  testing guest and authenticated user 22 november
// const addToCart = async (productId, quantity, product) => {
//     console.log("addToCart called with:", { productId, quantity, product });
//     // Rest of your function logic
  
//   if (isAuthenticated) {
//     // Handle authenticated user's cart logic here...
//   } else {
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       const itemIndex = storedCart.products.findIndex(
//         (item) => item.product._id === productId
//       );

//       if (itemIndex >= 0) {
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         if (!product) {
//           throw new Error("Product details are missing. Please provide the correct product.");
//         }

//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart); // Update state for components

//       toast.success("Item added to cart");
//     } catch (error) {
//       console.error("Error adding to cart (localStorage):", error);
//       toast.error("Failed to add the item to the cart.");
//       console.log(menuItems); // Ensure this outputs an array with valid objects
//     }
    
//   }
// };


// the guest and authenticated logic in addtocart testin 22 november 
// const addToCart = async (productId, quantity, product) => {
//   console.log("addToCart called with:", { productId, quantity, product });

//   if (isAuthenticated) {
//     // Authenticated user's cart logic
//     try {
//       const response = await fetch("/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`, // Pass the user's token if required
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add item to authenticated user's cart.");
//       }

//       const updatedCart = await response.json();
//       setCartItems(updatedCart.cart); // Update frontend state with the latest cart from the backend
//       toast.success("Item added to cart");
//     } catch (error) {
//       console.error("Error adding to authenticated cart:", error);
//       toast.error("Failed to add the item to the cart.");
//     }
//   } else {
//     // Guest user's cart logic
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       const itemIndex = storedCart.products.findIndex(
//         (item) => item.product._id === productId
//       );

//       if (itemIndex >= 0) {
//         // Update quantity and amount if the item already exists
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         // Add new product to the cart
//         if (!product) {
//           throw new Error("Product details are missing. Please provide the correct product.");
//         }

//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       // Save updated cart to localStorage
//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart); // Update state for components

//       toast.success("Item added to cart");
//     } catch (error) {
//       console.error("Error adding to cart (localStorage):", error);
//       toast.error("Failed to add the item to the cart.");
//     }
//   }
// };
useEffect(() => console.log(cartItems, "cartItems 2") , [cartItems])

// const addToCart = async (productId, quantity, product) => {
//   console.log("called endpoint for add to cart")
//   try{
//   const response = await fetch("http://food-project-api.onrender.com/api/add-to-cart", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Send the token in the Authorization header
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ productId, quantity, product }),
//   });
//   console.log(response)
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add item to authenticated user's cart.");
//   }

//   const updatedCart = await response.json();
//   console.log(updatedCart)
//   setCartItems(updatedCart.cart); // Update frontend state with the latest cart from the backend
//   toast.success("Item added to cart");
// } catch (error) {
//   console.error("Error adding to authenticated cart:", error.message);
//   toast.error(error.message || "Failed to add the item to the cart.");
// }
// }

const addToCart = async (productId, quantity, menu) => {
  console.log("addToCart called with:", { productId, quantity, menu });
  console.log("request made")
  const userToken = localStorage.getItem("auth-token"); // Retrieve token from localStorage Z
  if (isAuthenticated) {
    // Authenticated user's cart logic
    try {
      if (!userToken) {
        toast.error("User token is missing. Please log in.");
        return; // Exit the function if token is missing
      }
        // http://food-project-api.onrender.com/api/add-to-cart
        // https://food-project-api.onrender.com/api/add-to-cart
      const response = await fetch("https://food-project-api.onrender.com/api/add-to-cart", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Send the token in the Authorization header
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      // trying 4th december 2024

//       const localCart = JSON.parse(localStorage.getItem("cart_items"));
//           if (localCart && localCart.length > 0) {
//   // Send local cart to the server (client-side)
//             fetch('/api/cart/sync', {
//                method: 'POST',
//                 headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(localCart),
//   });
// }


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to authenticated user's cart.");
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart.cart); // Update frontend state with the latest cart from the backend
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to authenticated cart:", error.message);
      toast.error(error.message || "Failed to add the item to the cart.");
    }
  } else {
    // Guest user's cart logic remains the same
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { menus: [] };

      if (!Array.isArray(storedCart.menus)) {
        storedCart.menus = [];
      }

      const itemIndex = storedCart.menus.findIndex(
        (item) => item.menu._id === productId
      );

      if (itemIndex >= 0) {
        storedCart.menus[itemIndex].quantity += quantity;
        storedCart.menus[itemIndex].amount =
          menu.price * storedCart.menus[itemIndex].quantity;
      } else {
        if (!menu) {
          throw new Error("Product details are missing. Please provide the correct product.");
        }

        storedCart.menus.push({
          menu,
          quantity,
          amount: menu.price * quantity,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      setCartItems(storedCart); // Update state for components

      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart (localStorage):", error);
      toast.error("Failed to add the item to the cart.");
    }
  }
};










// mr promise code
// const updateCartItems = async (productId, quantity, itemId, change) => {
//   if (isAuthenticated) {
//     try {
//       const res = await fetch("http://food-project-api.onrender.com/api/update-cart", {
//         method: "PUT",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolation
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });
      
//       const data = await res.json();
//       if (res.status === 200) {
//         // Find the index of the product in the cart
//         const existingItemsIndex = cartItems.products?.findIndex(
//           (item) => item.product._id === productId
//         );

//         if (existingItemsIndex !== -1) {
//           // Clone the products array and update the specific product
//           const updatedCartItems = [...cartItems.products];
//           const updatedProduct = updatedCartItems[existingItemsIndex];

//           // Update the product's quantity and amount
//           updatedProduct.quantity = parseInt(quantity, 10);
//           updatedProduct.amount = updatedProduct.product.price * updatedProduct.quantity;

//           // Set the new cart state
//           setCartItems({ ...cartItems, products: updatedCartItems });
//           console.log("success", "Cart updated successfully!");
//         }
//       } else {
//         console.log("error", "Could not update cart");
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       console.log("error", "An error occurred while updating your cart.");
//     }
//   } else {
//     // Handle unauthenticated users (localStorage path)
//      // Get cart from localStorage
//   let cart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
  
//   const existingItemIndex = cart.products.findIndex(item => item.product._id === productId);

//   if (existingItemIndex !== -1) {
//     // Item found, update quantity
//     const updatedItem = cart.products[existingItemIndex];
//     updatedItem.quantity += quantity;

//     // If the quantity is 0 or less, remove the item from the cart
//     if (updatedItem.quantity <= 0) {
//       cart.products.splice(existingItemIndex, 1);
//     } else {
//       updatedItem.amount = updatedItem.product.price * updatedItem.quantity;
//     }
//   } else if (quantity > 0) {
//     // Item not found and quantity > 0, add it to the cart
//     const newItem = { product: { _id: productId }, quantity, amount: 0 }; // Populate with actual product data
//     cart.products.push(newItem);
//   }

//   // Save the updated cart to localStorage
//   localStorage.setItem("cartItems", JSON.stringify(cart));

//   // Update the context or state
//   setCartItems(cart);
    // const storedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    // const itemIndex = storedCart.products.findIndex(
    //   (item) => item.product._id === productId
    // );

    // if (itemIndex >= 0) {
    //   if (quantity === 0) {
    //     // Remove item from cart if quantity is 0
    //     storedCart.products.splice(itemIndex, 1);
    //   } else {
    //     // Update the quantity and amount for the item
    //     storedCart.products[itemIndex].quantity = parseInt(quantity, 10);
    //     storedCart.products[itemIndex].amount =
    //       storedCart.products[itemIndex].product.price *
    //       storedCart.products[itemIndex].quantity;
    //   }
    //   // Update localStorage with the modified cart
    //   localStorage.setItem("cart", JSON.stringify(storedCart));
    //   setCartItems(storedCart); // Update state with the new cart
    //   console.log("success", "Cart updated successfully!");
    // } else {
    //   console.log("error", "Item not found in cart.");
    // }
//   }
// };


// just now

// const addToCart = async (productId, quantity, product) => {
//   if (isAuthenticated) {
//     // Handle authenticated user's cart
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("User token is missing. Please log in.");
//         return;
//       }

//       const res = await fetch("http://food-project-api.onrender.com/api/add-to-cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Clear localStorage cart for authenticated users
//         localStorage.removeItem("cartItems");
//         localStorage.setItem("cart", JSON.stringify(data)); // Persist the updated cart
//         setCartItems(data); // Update state with server response
//         toast("success", "You have successfully added the item to the cart");
//       } else {
//         console.error("Failed to add product to cart:", data.message || "Unknown error");
//         toast("error", data.message || "Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast("error", "An error occurred while adding the item to the cart.");
//     }
//   } else {
//     // Handle unauthenticated user's cart using localStorage
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//       if (!Array.isArray(storedCart.products)) {
//         storedCart.products = [];
//       }

//       // Check if the product already exists in the cart
//       const itemIndex = storedCart.products.findIndex((item) => item.product._id === productId);

//       if (itemIndex >= 0) {
//         // If the product exists, update the quantity and amount
//         storedCart.products[itemIndex].quantity += quantity;
//         storedCart.products[itemIndex].amount =
//           product.price * storedCart.products[itemIndex].quantity;
//       } else {
//         if (!product) {
//           throw new Error("Product details are missing. Ensure the correct product is being added.");
//         }

//         // Add new product to the cart
//         storedCart.products.push({
//           product,
//           quantity,
//           amount: product.price * quantity,
//         });
//       }

//       // Update localStorage and UI
//       localStorage.setItem("cartItems", JSON.stringify(storedCart));
//       setCartItems(storedCart.products); // Update state for UI
//       toast("success", "Item added to cart");
//     } catch (error) {
//       console.error("Error adding to localStorage cart:", error);
//       toast("error", "Failed to add the item to the cart.");
//     }
//   }
// };

// const totalCartCount = () => {
//   return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
// };

// const updateCartItems = async (productId, quantity, itemId, change) => {
//   if (isAuthenticated) {
//     try {
//       const res = await fetch("http://food-project-api.onrender.com/api/update-cart", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolation
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       const data = await res.json();
//       if (res.status === 200) {
//         // Find the index of the product in the cart
//         const existingItemsIndex = cartItems.products?.findIndex(
//           (item) => item.product._id === productId
//         );

//         if (existingItemsIndex !== -1) {
//           // Clone the products array and update the specific product
//           const updatedCartItems = [...cartItems.products];
//           const updatedProduct = updatedCartItems[existingItemsIndex];

//           // Update the product's quantity and amount
//           updatedProduct.quantity = parseInt(quantity, 10);
//           updatedProduct.amount = updatedProduct.product.price * updatedProduct.quantity;

//           // Set the new cart state
//           setCartItems({ ...cartItems, products: updatedCartItems });
//           toast("success", "Cart updated successfully!");
//         }
//       } else {
//         toast("error", "Could not update cart");
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       toast("error", "An error occurred while updating your cart.");
//     }
//   } else {
//     // Handle unauthenticated users (localStorage path)
//     let cart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };

//     const existingItemIndex = cart.products.findIndex((item) => item.product._id === productId);

//     if (existingItemIndex !== -1) {
//       // Item found, update quantity
//       const updatedItem = cart.products[existingItemIndex];
//       updatedItem.quantity += quantity;

//       // If the quantity is 0 or less, remove the item from the cart
//       if (updatedItem.quantity <= 0) {
//         cart.products.splice(existingItemIndex, 1);
//       } else {
//         updatedItem.amount = updatedItem.product.price * updatedItem.quantity;
//       }
//     } else if (quantity > 0) {
//       // Item not found and quantity > 0, add it to the cart
//       const newItem = { product: { _id: productId }, quantity, amount: 0 }; // Populate with actual product data
//       cart.products.push(newItem);
//     }

//     // Save the updated cart to localStorage
//     localStorage.setItem("cartItems", JSON.stringify(cart));

//     // Update the context or state
//     setCartItems(cart);
//   }
// };



// trying new code 7 november
  // const addToCart = async (productId, quantity, product) => {
  //   if (isAuthenticated) {
  //     try {
  //       const res = await fetch("https://food-project-api.onrender.com/api/add-to-cart", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auth-token": `${localStorage.getItem("auth-token")}`,
  //         },
  //         body: JSON.stringify({ productId, quantity }),
  //       });
  
  //       if (res.ok) {
  //         const data = await res.json();
  //         setCartItems(data); // add the data
  //         showHide("success", "You have successfully added the item to the cart");
  //       } else {
  //         throw new Error(`Failed to add product: ${res.statusText}`);
  //       }
  //     } catch (error) {
  //       console.error("Error adding item to cart:", error);
  //       showHide("error", `Failed to add product to cart: ${error.message}`);
  //     }
  //   } else {
  //     const storedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
  //     const itemIndex = storedCart.products.findIndex(
  //       (item) => item.product._id === productId
  //     );
  
  //     if (itemIndex >= 0) {
  //       storedCart.products[itemIndex].quantity += 1;
  //       storedCart.products[itemIndex].amount = product.price * storedCart.products[itemIndex].quantity;
  //     } else {
  //       storedCart.products.push({
  //         product,
  //         quantity: 1,
  //         amount: product.price * 1,
  //       });
  //     }
  
  //     localStorage.setItem("cart", JSON.stringify(storedCart));
  //     showHide("success", "Product added to cart successfully!");
  //     setCartItems(storedCart);
  //   }
  // };
  

  // my code 1st november
  // const addToCart = async (item) => {
  //   if (!token) {
  //     // Add to localStorage if not logged in
  //     const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
  //     const updatedCart = [...existingCart];
  //     const existingItemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

  //     if (existingItemIndex > -1) {
  //       updatedCart[existingItemIndex].quantity += 1;
  //     } else {
  //       updatedCart.push({ ...item, quantity: 1 });
  //     }

  //     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  //     setCartItems(updatedCart);
  //   } else {
  //     try {
  //       // Add to server cart if logged in
  //       const response = await axios.post(
  //         `${url}/api/cart/add`,
  //         { itemId: item._id },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       if (response.data.success) {
  //         setCartItems((prevCartItems) => {
  //           const updatedCartItems = [...prevCartItems];
  //           const existingItemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

  //           if (existingItemIndex > -1) {
  //             updatedCartItems[existingItemIndex].quantity += 1;
  //           } else {
  //             updatedCartItems.push({ ...item, quantity: 1 });
  //           }

  //           return updatedCartItems;
  //         });
  //       } else {
  //         console.error('Failed to add item to cart:', response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error adding item to cart:', error);
  //     }
  //   }
  // };


  // mr promise code 1st november
  // remove cart items
  const removeCartItems = async (productId) => {
    if (window.confirm("Are you sure you want to delete this item?..")) {
      if (isAuthenticated) {
        try {
          // authenticated
          
          // https://food-project-api.onrender.com/api/delete-cart
          const res = await fetch("https://food-project-api.onrender.com/api/delete-cart", {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolationfetch
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
          });
          const data = await res.json();
          if (res.ok) {
            console.log("success", "Product Successfully deleted from cart");
            setCartItems(data);
            fetchCartData()
            toast.info("Item removed from cart");
            //   setCartItems(data || data.products);
          }
        } catch (error) {
          console.log(error);
        }
        // authenticated done
      } else {
        // unauthenticated
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
        const itemIndex = storedCart.menus.findIndex(
          (item) => item.menu._id === productId
        );
        if (itemIndex >= 0) {
          storedCart.menus.splice(itemIndex, 1);
          localStorage.setItem("cartItems", JSON.stringify(storedCart));
          setCartItems(storedCart); // Update the state to reflect changes in local storage
          toast.info("Item removed from cart");
          console.log("success", "Product removed from cart successfully!");
        } else {
          console.log("error", "Product not found in cart.");
        }
        // unauthenticated done
      }
    }
  };

  // testing removedcartitems 21 november

  // const removeCartItems = (productId) => {
  //   const updatedCart = {
  //     ...cartItems,
  //     menus: cartItems.menus.filter((item) => item.menu._id !== productId),
  //   };
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  //   toast.info("Item removed from cart");
  // };


  // update testing 21 november
const updateCartItems = async (productId, quantity, itemId, change) => {
  if (isAuthenticated) {
    try {
     
      // https://food-project-api.onrender.com/api/update-cart
      const res = await fetch("https://food-project-api.onrender.com/api/update-cart", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`, // Correct string interpolation
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      const data = await res.json();
      console.log("Update cart data", data)
      if (res.status === 200) {
        // Find the index of the product in the cart
        const updatedCart = { ...cartItems };
        const itemIndex = updatedCart.menus.findIndex(
          (item) => item.menu._id === productId
        );
      
        if (itemIndex >= 0) {
          updatedCart.menus[itemIndex].quantity += change;
    
          if (updatedCart.menus[itemIndex].quantity <= 0) {
            updatedCart.menus.splice(itemIndex, 1); // Remove item if quantity is zero
          } else {
            updatedCart.menus[itemIndex].amount =
              updatedCart.menus[itemIndex].menu.price *
              updatedCart.menus[itemIndex].quantity;
          }
        }
        console.log("update cart", updatedCart)
        setCartItems(updatedCart);
      } else {
        console.log("error", "Could not update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      console.log("error", "An error occurred while updating your cart.");
    }
  }else {
  const updatedCart = { ...cartItems };
    const itemIndex = updatedCart.menus.findIndex(
      (item) => item.menu._id === productId
    );

    if (itemIndex >= 0) {
      updatedCart.menus[itemIndex].quantity += quantity;

      if (updatedCart.menus[itemIndex].quantity <= 0) {
        updatedCart.menus.splice(itemIndex, 1); // Remove item if quantity is zero
      } else {
        updatedCart.menus[itemIndex].amount =
          updatedCart.menus[itemIndex].menu.price *
          updatedCart.menus[itemIndex].quantity;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }
};


  // } else {
  //   // Handle unauthenticated users (localStorage path)
  //    // Get cart from localStorage
  // let cart = JSON.parse(localStorage.getItem("cartItems")) || { menus: [] };
  
  // const existingItemIndex = cart.menus.findIndex(item => item.menu._id === productId);

  // if (existingItemIndex !== -1) {
  //   // Item found, update quantity
  //   const updatedItem = cart.menus[existingItemIndex];
  //   updatedItem.quantity += quantity;

  //   // If the quantity is 0 or less, remove the item from the cart
  //   if (updatedItem.quantity <= 0) {
  //     cart.menus.splice(existingItemIndex, 1);
  //   } else {
  //     updatedItem.amount = updatedItem.menu.price * updatedItem.quantity;
  //   }
  // } else if (quantity > 0) {
  //   // Item not found and quantity > 0, add it to the cart
  //   const newItem = { product: { _id: productId }, quantity, amount: 0 }; // Populate with actual product data
  //   cart.menus.push(newItem);
  // }

  // // Save the updated cart to localStorage
  // localStorage.setItem("cartItems", JSON.stringify(cart));

  // // Update the context or state
  // setCartItems(cart);
  //   const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { menus: [] };
  //   const itemIndex = storedCart.menus.findIndex(
  //     (item) => item.menu._id === productId
  //   );

  //   if (itemIndex >= 0) {
  //     if (quantity === 0) {
  //       // Remove item from cart if quantity is 0
  //       storedCart.menus.splice(itemIndex, 1);
  //     } else {
  //       // Update the quantity and amount for the item
  //       storedCart.menus[itemIndex].quantity = parseInt(quantity, 10);
  //       storedCart.menus[itemIndex].amount =
  //         storedCart.menus[itemIndex].menu.price *
  //         storedCart.menus[itemIndex].quantity;
  //     }
  //     // Update localStorage with the modified cart
  //     localStorage.setItem("cart", JSON.stringify(storedCart));
  //     setCartItems(storedCart); // Update state with the new cart
  //     console.log("success", "Cart updated successfully!");
  //   } else {
  //     console.log("error", "Item not found in cart.");
  //   }
  // }



  // const updateCartItems = (productId, change) => {
  //   const updatedCart = { ...cartItems };
  //   const itemIndex = updatedCart.menus.findIndex(
  //     (item) => item.menu._id === productId
  //   );

  //   if (itemIndex >= 0) {
  //     updatedCart.menus[itemIndex].quantity += change;

  //     if (updatedCart.menus[itemIndex].quantity <= 0) {
  //       updatedCart.menus.splice(itemIndex, 1); // Remove item if quantity is zero
  //     } else {
  //       updatedCart.menus[itemIndex].amount =
  //         updatedCart.menus[itemIndex].menu.price *
  //         updatedCart.menus[itemIndex].quantity;
  //     }
  //   }

  //   localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  // };

  useEffect(() => {
    // Sync state with localStorage changes (if needed)
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);


  // my code 1st november 
  // not sure
  // const removeCartItem = async (itemId) => {
  //   if (!token) {
  //     const updatedCart = cartItems.filter(item => item._id !== itemId);
  //     setCartItems(updatedCart);
  //     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  //   } else {
  //     try {
  //       const updatedCart = cartItems.filter(item => item._id !== itemId);
  //       setCartItems(updatedCart);
  //       localStorage.setItem('cartItems', JSON.stringify(updatedCart));

  //       await axios.delete(`${url}/api/cart/delete`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //         data: { itemId },
  //       });
  //     } catch (error) {
  //       console.error('Error removing item from cart:', error);
  //       window.location.href = '/menu'; // Redirect to menu if necessary
  //     }
  //   }
  // };


 




  //Still on frontend my code 1st november 
  // const addCartItem = (itemId) => {
  //   setCartItems(prevCartItems => {
  //     const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
  //     if (existingItemIndex > -1) {
  //       const updatedCartItems = prevCartItems.map(item => 
  //         item._id === itemId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //       return updatedCartItems;
  //     } else {
  //       const newItem = {}; // Replace with actual item details
  //       return [...prevCartItems, { ...newItem, quantity: 1 }];
  //     }
  //   });
  // };


 




// new item with undefined my work
  // const addCartItem = (itemId) => {
  //   setCartItems(prevCartItems => {
  //     const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
  //     if (existingItemIndex > -1) {
  //       // Increment quantity
  //       return prevCartItems.map(item =>
  //         item._id === itemId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       // Find the item in menuItems
  //       const newItem = menuItems.find(item => item._id === itemId);
  //       if (newItem) {
  //         // Return new cart item structure
  //         return [...prevCartItems, { ...newItem, quantity: 1 }];
  //       } else {
  //         console.error('Item not found:', itemId);
  //         return prevCartItems; // Avoid undefined items
  //       }
  //     }
  //   });
  // };
  

  // new item 29
  // const addCartItem = (itemId) => {
  //   setCartItems(prevCartItems => {
  //     const existingItemIndex = prevCartItems.findIndex(item => item._id === itemId);
  //     if (existingItemIndex > -1) {
  //       // Increment quantity if the item already exists
  //       return prevCartItems.map(item => 
  //         item._id === itemId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       const newItem = menuItems.find(item => item._id === itemId); // Find the item details
  //       if (newItem) {
  //         return [...prevCartItems, { ...newItem, quantity: 1 }];
  //       }
  //       console.error('Item not found for ID:', itemId);
  //       return prevCartItems; // Return existing if the item is not found
  //     }
  //   });
  // };
  
  // still on frontend
  // const reduceCartItem = (itemId) => {
  //   setCartItems(prevCartItems => {
  //     const updatedCartItems = prevCartItems.map(item => {
  //       if (item._id === itemId) {
  //         return {
  //           ...item,
  //           quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
  //         };
  //       }
  //       return item;
  //     }).filter(item => item.quantity > 0); // Remove items with zero quantity
  //     return updatedCartItems;
  //   });
  // };
  

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


// new oct 30th 
  const getUserProfile = async () => {
    const token = localStorage.getItem('auth-token');
  
    // Only fetch profile if it hasn't been set yet
    if (userProfile) return;
  
    if (token) {
      try {
        const response = await fetch(`${url}/api/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text(); // Get error text for better insight
          throw new Error(`Network response was not ok: ${errorText}`);
        }
  
        const data = await response.json();
  
        // Log profile data old to test perplexity24 november
        console.log("Profile data:", data.profile);
  
        setUserProfile(data.profile);
        setUserName(data.profile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }finally{
        setLoading(false)
      }

      // update from perplexity 24 november
      // try {
      //   const response = await getUserProfile(); // Fetch user profile from API
      //   console.log("Profile data:", response.profile);
        
      //   setUserProfile(response.profile); // Update state with fetched profile data
      //   setUserName(response.profile.name); // Assuming 'name' is the field for username
      // } catch (error) {
      //   console.error('Failed to fetch user profile:', error);
      // }
    }
  };

  // Fetch user profile when the component mounts or `url` changes
// useEffect(() => {
//   if (!userProfile) {
//       console.log("Fetching user profile...");
//       getUserProfile();
//   }
// }, [url, userProfile]); // Run on `url` change or if `userProfile` is not set

useEffect(() => {
  if (isAuthenticated) {
    console.log("Fetching user profile...");
    getUserProfile();
  }
}, [isAuthenticated]);

// Reset state when user profile updates
// useEffect(() => {
//   if (userProfile) {
//       console.log("User profile updated, resetting hasLoggedProfile...");
//       setHasLoggedProfile(false);
//   }
// }, [userProfile]);


  // november 1st i changed from 30th oct
//   const getUserProfile = async () => {
//     const token = localStorage.getItem('auth-token');

//     // Only fetch profile if it hasn't been set yet
//     if (userProfile) return;

//     if (token) {
//         try {
//             const response = await fetch(`${url}/api/profile`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 if (response.status === 401) {
//                     alert("Your session has expired. Please log in again."); // Notify user
//                     window.location.href = '/login'; // Redirect to login
//                 }
//                 const errorText = await response.text(); // Get error text for better insight
//                 throw new Error(`Network response was not ok: ${errorText}`);
//             }

//             const data = await response.json();
//             console.log("Profile data:", data.profile);

//             setUserProfile(data.profile);
//             setUserName(data.profile.name); // Assuming you want to set just the name
//         } catch (error) {
//             console.error('Failed to fetch user profile:', error);
//         }
//     } else {
//         alert("No authentication token found. Please log in.");
//     }
// };

  

// const getUserProfile = async () => {
//   const token = localStorage.getItem('auth-token');
  
//   // Only fetch profile if it hasn't been set yet
//   if (userProfile) return;

//   if (token) {
//       try {
//           const response = await fetch(`${url}/api/profile`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`,
//               },
//           });

//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }

//           const data = await response.json();

//           // Log profile data only once
//           if (!hasLoggedProfile.current) {
//               console.log("Profile data:", data.profile);
//               hasLoggedProfile.current = true; // Prevent further logging
//           }

//           setUserProfile(data.profile);
//           setUserName(data.profile);
//       } catch (error) {
//           console.error('Failed to fetch user profile:', error);
//       }
//   }
// };

// // useEffect to fetch user profile on component mount
// useEffect(() => {
//   getUserProfile();
// }, [url]); // Only re-run if `url` changes


// const getUserProfile = async () => {
//   const token = localStorage.getItem('auth-token');
  
//   // Only fetch profile if it hasn't been set yet
//   if (userProfile) return;

//   if (token) {
//       try {
//           const response = await fetch(`${url}/api/profile`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`,
//               },
//           });

//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }

//           const data = await response.json();

//           // Log profile data only once
//           if (!hasLoggedProfile) {
//               console.log("Profile data:", data.profile);
//               setHasLoggedProfile(true); // Prevent further logging
//           }

//           setUserProfile(data.profile);
//           setUserName(data.profile);
//       } catch (error) {
//           console.error('Failed to fetch user profile:', error);
//       }
//   }
// };


// useEffect to fetch user profile on component mount
// useEffect(() => {
//   getUserProfile();
// }, [url]); // Only re-run if `url` changes

// // useEffect to reset the profile on logout or when userProfile is set
// useEffect(() => {
//   if (userProfile) {
//       setHasLoggedProfile(false); // Reset logging state if user profile changes
//   }
// }, [userProfile]);






  // updated 26 oct 2024
  // const getUserProfile = async () => {
  //   const token = localStorage.getItem('auth-token');
  //   if (userProfile) return; // Avoid fetching if userProfile is already set
  //   if (token) {
  //     try {
  //       const response = await fetch(`${url}/api/profile`, {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const data = await response.json();
  //       console.log("profile data", data.profile);
  //       setUserProfile(data.profile);
  //       setUserName(data.profile.firstName); // Assuming userName is firstName
  //     } catch (error) {
  //       console.error('Failed to fetch user profile:', error);
  //     }
  //   }
  // };
  
  // // Example usage in a component
  // useEffect(() => {
  //   getUserProfile();
  // }, []); // Empty dependency array ensures this runs only once when the component mounts
  

  // const updateUserProfile = async (formData) => {
  //   // Perform the update request...
  //   const updatedProfile = await api.updateProfile(formData); // Assuming this returns the updated profile
  
  //   // Update the context state
  //   setUserProfile(updatedProfile);
  // };

  
  // new page 17th oct working perfectly
  const updateUserProfile = async (profileData) => {
    try {
      const response = await axios.post(`${url}/api/profile/update`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update the context state with the new profile
      setUserProfile(response.data.profile);
      setUserName(response.data.profile.firstName); // Update username immediately
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  // useEffect(()=>{
  //     setUserProfile(null)
  // }, [])

  const handleUserLogin = (newToken, user) => {  //testing 4th december checking 1 feb 2025
    const token = localStorage.getItem("auth_token");
if (!token) {
  // Handle token missing
}
// Add cart item logic here

    setToken(newToken);
    // setUserName(user.name);
    setUserName(user.name || 'Guest');  // Fallback to 'Guest' if name is undefined
    setUserProfile(user);


    console.log(user); // Log the whole user object to check if name is present
    
      // On successful login

  };
  
  console.log(isAuthenticated); //Debug to check the status
  

  // new 31th oct
  // const updateUserProfile = async (profileData) => {
  //   if (!token) {
  //     console.error("No authentication token found.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post(`${url}/api/profile/update`, profileData, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  
  //     // Update the context state with the new profile
  //     setUserProfile(response.data.profile);
  //     setUserName(response.data.profile.firstName); // Update username immediately
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error response:", error.response.data);
  //     } else {
  //       console.error("Error updating profile:", error.message);
  //     }
  //   }
  // };
  
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     if (token) {
  //       try {
  //         const response = await axios.get(`${url}/api/profile`, {
  //           headers: { Authorization: `Bearer ${token}` }
  //         });
  //         setUserProfile(response.data.profile);
  //         setUserName(response.data.profile.firstName);
  //       } catch (error) {
  //         console.error("Error fetching user profile:", error);
  //       }
  //     }
  //   };
  
  //   fetchUserProfile();
  // }, [token]);
  
  // const handleUserLogin = (newToken, user) => {
  //   setToken(newToken);
  //   setUserName(user.name);
  //   setUserProfile(user);
  // };
  

  // const handleUserLogin = (token, user) => {
  //   setUserData(user); // Assuming this updates user data including avatar
  //   setAuthToken(token);
  // };

 
  // mr promise code 1st november
  const createOrder = async (transaction_id, orderId) => {
    try {
      const res = await fetch("https://food-project-api.onrender.com/api/payment/verify", {
        //  const res = await fetch("https://food-project-api.onrender.com/api/payment/verify", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transaction_id, orderId }),
      });

      //just added 31 jan 2025
      // const response = await fetch('/api/payment/verify');
      // if (!response.ok) {
      //     console.error('Error verifying payment:', response.statusText);
      //     return;
      // }
      // const data = await response.json();
      // if (!data) {
      //     console.error('No data returned from createOrder');
      //     return;
      // }
      console.log("order", res)
      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
        console.log(data.order && data);
        console.log("Menu Order", order)
        console.log("Menu Order data", data)
        console.error('No data returned from createOrder'); // to check
        setCartItems([]);
      } else {
        // toast("error", "insufficient Funds!...Credit your acct boss");
      }
    } catch (error) {
      console.log(error);
    }

  };

  // my code 1st november
  // const createOrder = async(transaction_id, orderId)=>{
  //   try {
  //     const response = await fetch("https://localhost:3000/api/payment/verify", {
  //     // const response = await fetch("https://food-project-api.onrender.com/api/payment/verify", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //       },
  //       body: JSON.stringify({ transaction_id, orderId }),
  //       credentials: "include"
  //     });
  //     console.log({ transaction_id, orderId })
  
  //     const data = await response.json()
  //     console.log(data)
  //     if (response.ok) {
  //       setOrder(data.order)
  //       setCartItems([])
  //     }else{
  //       console.error(data.msg)
  //     }
  //   } catch (error) {
  //     console.error(error);
      
  //   }
  
  // }
  

  const contextValue = {
    cartItems,
    addToCart,
    removeCartItems,
    order, setOrder,
    loading,

    // addCartItem,
    // reduceCartItem,
    menuItems,
    breakItems,
    saladItems,
    naijaItems,
    signatureItems,
    restaurantList,
    url,
    setCartItems,
    syncLocalCartWithServer,
    updateCartItems,
    fetchUserData,
    fetchCartData,
    userName,
    getUserProfile,
    isAuthenticated,
    userProfile,
    updateUserProfile,
    handleUserLogin,
    error,
    success,
    createOrder,
  }

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;



// new 25 oct



// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';
// import AuthContext from "./AuthContext";

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

//   const isAuthenticated = !!token; // Check if token exists

//   // Load cart items from localStorage
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
//           const response = await axios.post(`${url}/api/cart/sync`, { cartItems: localCart }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           if (response.data?.cartData) {
//             setCartItems(response.data.cartData);
//             localStorage.removeItem('cartItems'); // Clear local storage after sync
//           }
//         } else {
//           fetchCartData(token);
//         }
//       } catch (error) {
//         console.error("Error syncing cart data with server:", error);
//         setError("Failed to sync cart data");
//       }
//     }
//   };

//   const fetchCartData = async (authToken) => {
//     try {
//       const response = await axios.get(`${url}/api/cart/get`, {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       if (response.data?.cartData) {
//         setCartItems(response.data.cartData);
//         localStorage.removeItem('cartItems');
//       } else {
//         console.error('Cart data is missing');
//         setCartItems([]);
//       }
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//       setError("Failed to fetch cart data");
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('auth-token', token);
//       syncLocalCartWithServer();
//     } else {
//       localStorage.removeItem('auth-token');
//       setCartItems(JSON.parse(localStorage.getItem('cartItems') || '[]'));
//     }
//   }, [token]);

//   const fetchMenuData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/menu/featured`);
//       if (response.data.success) {
//         setMenuItems(response.data.data || []);
//       } else {
//         console.error('Failed to fetch menu data:', response.data.message);
//         setError('Failed to fetch menu data');
//       }
//     } catch (error) {
//       console.error('Error fetching menu data:', error);
//       setError('Error fetching menu data');
//     }
//   };

//   // Other fetch functions follow the same pattern...

//   useEffect(() => {
//     fetchMenuData();
//     // Fetch other data here...
//   }, []);

//   const handleUserLogin = (newToken, user) => {
//     setToken(newToken);
//     setUserName(user.name);
//     setUserProfile(user);
//     localStorage.setItem('auth-token', newToken); // Store the token in localStorage
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeCartItem,
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
//     isAuthenticated,
//     userProfile,
//     updateUserProfile,
//     handleUserLogin,
//     error,
//     success,
//   };

//   return (
//     <MenuContext.Provider value={contextValue}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export default MenuContextProvider;
