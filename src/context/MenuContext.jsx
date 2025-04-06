

import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";

export const MenuContext = createContext(null);

const MenuContextProvider = ({ children }) => {
  // const [url] = useState("http://localhost:3000");
  const [url] = useState("https://food-project-api.onrender.com");
  const [menuItems, setMenuItems] = useState([]);
  const [breakItems, setBreakItems] = useState([]);
  const [naijaItems, setNaijaItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);
  const [signatureItems, setSignatureItems] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [userName, setUserName] = useState("");
  const [order, setOrder] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("auth-token") || "");
  const [state] = useContext(AuthContext);
  const [cartItems, setCartItems] = useState({ menus: [] });
  const [loading, setLoading] = useState(true);
  const hasLoggedProfile = useRef(false);

  const isAuthenticated = state.accessToken !== null;

  // Initialize cart from localStorage for unauthenticated users
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     const savedCart = JSON.parse(localStorage.getItem("cartItems")) || { menus: [] };
  //     console.log("savedCart", savedCart);
  //     setCartItems(savedCart);
  //   }
  // }, [isAuthenticated]);

  // Fetch cart data when authentication status changes
  useEffect(() => {
    // if (isAuthenticated) {
    fetchCartData();
    // }
  }, [cartItems]);

  // Fetch all menu data
  useEffect(() => {
    fetchMenuData();
    fetchBreakData();
    fetchNaijaData();
    fetchSaladData();
    fetchSignatureData();
    fetchRestaurantData();
  }, []);

  // Fetch user profile when authenticated
  useEffect(() => {
    if (isAuthenticated && !hasLoggedProfile.current) {
      getUserProfile();
      hasLoggedProfile.current = true;
    }
  }, [isAuthenticated]);

  // API calls for menu data
  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/featured`);
      if (response.data.success) {
        setMenuItems(response?.data?.data || []);
      } else {
        console.error("Failed to fetch menu data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchNaijaData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/naija`);
      if (response.data.success) {
        setNaijaItems(response.data.data || []);
      } else {
        console.error("Failed to fetch menu data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchSaladData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/salad`);
      if (response.data.success) {
        setSaladItems(response.data.data || []);
      } else {
        console.error("Failed to fetch menu data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchBreakData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/breakfast`);
      if (response.data && response.data.success) {
        setBreakItems(response.data.data || []);
      } else {
        console.error("Response does not indicate success:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching breakfast data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchSignatureData = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/signature`);
      if (response.data.success) {
        setSignatureItems(response.data.data || []);
      } else {
        console.error("Failed to fetch menu data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurant/list`);
      if (response.data && response.data.success) {
        setRestaurantList(response.data.data || []);
      } else {
        console.error("Response does not indicate success:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching restaurant data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Cart operations
  const fetchCartData = async () => {
    if (!isAuthenticated) {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || {
        menus: [],
      };
      console.log("savedCart", savedCart);
      setCartItems(savedCart);
    } else {
      try {
        const res = await fetch(`${url}/api/carts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCartItems(data.data || { menus: [] });
        } else {
          toast.error("Could not get cart");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        // toast.error("Failed to load cart data");
      }
    }
  };

  const addToCart = async (productId, quantity = 1, menu) => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`${url}/api/add-to-cart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add item to cart");
        }

        const data = await response.json();
        setCartItems(data.data);
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(error.message || "Failed to add item to cart");
      }
    } else {
      // Handle local cart for unauthenticated users
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
        menus: [],
      };

      const existingItemIndex = storedCart.menus.findIndex(
        (item) => item.menu._id === productId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        storedCart.menus[existingItemIndex].quantity += quantity;
        storedCart.menus[existingItemIndex].amount =
          storedCart.menus[existingItemIndex].menu.price *
          storedCart.menus[existingItemIndex].quantity;
      } else {
        // Add new item
        storedCart.menus.push({
          menu,
          quantity,
          amount: menu.price * quantity,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      setCartItems(storedCart);
      toast.success("Item added to cart");
    }
  };

  const removeCartItems = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    if (isAuthenticated) {
      try {
        const response = await fetch(`${url}/api/delete-cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (response.ok) {
          setCartItems(data.data || { menus: [] });
          toast.info("Item removed from cart");
        } else {
          throw new Error(data.message || "Failed to remove item from cart");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error(error.message || "Failed to remove item from cart");
      }
    } else {
      // Handle local cart for unauthenticated users
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
        menus: [],
      };
      const updatedItems = storedCart.menus.filter(
        (item) => item.menu._id !== productId
      );

      const updatedCart = { ...storedCart, menus: updatedItems };
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      toast.info("Item removed from cart");
    }
  };

  const updateCartItems = async (productId, change) => {
    try {
      if (isAuthenticated) {
        const existingItem = cartItems.menus.find(item => item.menu._id === productId);
        const newQuantity = (existingItem?.quantity || 0) + change;
  
        if (newQuantity <= 0) {
          // Optional: You can also call a `delete` endpoint here
          setCartItems(prev => ({
            ...prev,
            menus: prev.menus.filter(item => item.menu._id !== productId),
          }));
        }
  
        const response = await fetch(`${url}/api/update-cart`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity: newQuantity,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setCartItems(data.data); // this ensures the UI syncs with DB
        } else {
          throw new Error(data.message || "Failed to update cart");
        }
      } else {
        // Unauthenticated logic
        setCartItems((prev) => {
          const updatedMenus = prev.menus
            .map((item) => {
              if (item.menu._id === productId) {
                const newQuantity = item.quantity + change;
                return {
                  ...item,
                  quantity: newQuantity,
                  amount: newQuantity * item.menu.price,
                };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);
  
          const updatedCart = { ...prev, menus: updatedMenus };
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error(error.message || "Failed to update cart");
    }
  };

  // In your context provider
const getUserProfile = async () => {
  if (!isAuthenticated) return;

  try {
    const response = await fetch(`${url}/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    setUserProfile(data.profile);
    setUserName(data.profile?.firstName || "");
    return data.profile;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

const updateUserProfile = async (formData) => {
  try {
    const response = await axios.post(
      `${url}/api/profile/update`,
      formData,
      {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    setUserProfile(response.data.profile);
    setUserName(response.data.profile.firstName);
    setSuccess("Profile updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    setError(error.response?.data?.message || "Failed to update profile");
    throw error;
  }
};
  
  // const updateCartItems = async (productId, change) => {
  //   try {
  //     if (isAuthenticated) {
  //       // For authenticated users
  //       const response = await fetch(`${url}/api/update-cart`, {
  //         // Changed endpoint to match your fetchCartData
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           productId: productId,
  //           quantity: change, // Consider changing to absolute quantity if backend expects it
  //         }),
  //       });
  //       {console.log(response)}
        
  //       const data = await response.json();
  //       {console.log(data.data)}
        
  //       if (response.ok) {
  //         // setCartItems(data.data);
  //         setCartItems((prev) => ({
  //           ...data.data,
  //           menus: prev.menus
  //             .map((item) =>
  //               item?.menu?._id === productId
  //                 ? {
  //                     ...item,
  //                     quantity: item?.quantity + change,
  //                     amount: (item?.quantity + change) * item?.menu?.price,
  //                   }
  //                 : item
  //             )
  //             .filter((item) => item?.quantity > 0),
  //         }));
  //       } else {
  //         throw new Error(data.message || "Failed to update cart");
  //       }
  //     } else {
  //       // For unauthenticated users
  //       setCartItems((prev) => {
  //         const updatedMenus = prev.menus
  //           .map((item) => {
  //             if (item.menu._id === productId) {
  //               const newQuantity = item.quantity + change;
  //               return {
  //                 ...item,
  //                 quantity: newQuantity,
  //                 amount: newQuantity * item.menu.price,
  //               };
  //             }
  //             return item;
  //           })
  //           .filter((item) => item.quantity > 0);

  //         const updatedCart = { ...prev, menus: updatedMenus };
  //         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //         return updatedCart;
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //     toast.error(error.message || "Failed to update cart");
  //   }
  // };

  // User profile operations
  // const getUserProfile = async () => {
  //   if (userProfile || !isAuthenticated) return;

  //   try {
  //     const response = await fetch(`${url}/api/profile`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user profile");
  //     }

  //     const data = await response.json();
  //     setUserProfile(data.profile);
  //     setUserName(data.profile?.firstName || "");
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateUserProfile = async (profileData) => {
  //   try {
  //     const response = await axios.post(
  //       `${url}/api/profile/update`,
  //       profileData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setUserProfile(response.data.profile);
  //     setUserName(response.data.profile.firstName);
  //     toast.success("Profile updated successfully");
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     toast.error("Failed to update profile");
  //   }
  // };

  // Order operations
  
  
  const createOrder = async (transaction_id, orderId) => {
    try {
      const res = await fetch(`${url}/api/payment/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transaction_id, orderId }),
      });

      const data = await res.json();

      if (res.ok) {
        setOrder(data.order);
        setCartItems({ menus: [] });
        localStorage.removeItem("cartItems");
        toast.success("Order created successfully");
      } else {
        throw new Error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // toast.error(error.message || "Failed to create order");
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeCartItems,
    order,
    setOrder,
    fetchCartData,
    loading,
    menuItems,
    breakItems,
    saladItems,
    naijaItems,
    signatureItems,
    restaurantList,
    url,
    setCartItems,
    updateCartItems,
    userName,
    getUserProfile,
    isAuthenticated,
    userProfile,
    updateUserProfile,
    error,
    success,
    createOrder,
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export default MenuContextProvider;
