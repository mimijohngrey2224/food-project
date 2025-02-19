// import React, { useContext, useEffect } from "react";
// import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { MenuContext } from "../../context/MenuContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Cart() {
//   const {
//     cartItems,
//     removeCartItems,
//     // addCartItem,
//     // reduceCartItem,
//     updateCartItems,
//     url,
//   } = useContext(MenuContext);

// // old item 29 oct
//   useEffect(() => {
//     console.log("Cart items in Cart component:", cartItems); // Debug log to check cartItems
//   }, [cartItems]);

  
  

//   // const totalCartAmount = () => {
//   //   // let totalAmount = 0;
//   //     if (cartItems && Array.isArray(cartItems.products)) {
//   //       return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
        
//   //     }
    
//   //   return totalAmount.toFixed(2);
//   // };

//   const totalCartAmount = () => {
//     if (cartItems && Array.isArray(cartItems.products)) {
//       return cartItems.products.reduce((total, item) => {
//         const itemTotal = (item.price || 0) * (item.quantity || 0); // Calculate item total
//         return total + itemTotal;
//       }, 0).toFixed(2); // Return total with two decimal points
//     }
  
//     return "0.00"; // Default value if cart is empty or invalid
//   };
  
//   // just testing 22 november
//   // const calculateTotalPrice = (cart) => {
//   //   if (!cart || !Array.isArray(cart)) return 0;
  
//   //   return cart.reduce((total, item) => {
//   //     return total + (item.price || 0) * (item.quantity || 0);
//   //   }, 0).toFixed(2);
//   // };
  
//   // // Usage:
//   // const totalPrice = calculateTotalPrice(cartItems.products || cartItems);
  

//   const handleAddItem = (itemId) => {
//     // addCartItem(itemId);
//      updateCartItems(itemId, 1);
//     toast.success("Item added to cart");
//   };

//   const handleRemoveItem = (itemId) => {
//     removeCartItems(itemId);
//     toast.error("Item removed from cart");
//   };

//   const handleReduceItem = (itemId) => {
//     updateCartItems(itemId, -1);
//     // reduceCartItem(itemId);
//     toast.info("Item quantity reduced");
//   };

//   return (
//     <div className="bg-purple-100 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Shop Cart</h1>
//       {(!cartItems || !cartItems.products || cartItems.products.length === 0) ? (
//         <p className="text-center text-lg">Your cart is empty</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-md rounded-lg hidden sm:table">
//               <thead className="bg-purple-200">
//                 <tr className="text-left">
//                   <th className="py-3 px-2 text-center sm:px-4">Action</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Item</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Image</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Price</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Quantity</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {console.log(cartItems)}
//                 {cartItems.products?.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="flex justify-center items-center space-x-2 py-2 px-2 sm:px-4">
//                       <button
//                         onClick={() => handleReduceItem(item.product._id)}
//                         className="p-2 text-blue-500 hover:bg-blue-100 rounded"
//                       >
//                         <MdRemove />
//                       </button>
//                       <button
//                         onClick={() => handleAddItem(item.product._id)}
//                         className="p-2 text-green-500 hover:bg-green-100 rounded"
//                       >
//                         <MdAdd />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveItem(item.product._id)}
//                         className="p-2 text-orange-500 hover:bg-orange-100 rounded"
//                       >
//                         <MdDelete />
//                       </button>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">{item.product.name}</td> 
//                     <td className="py-2 px-2 sm:px-4">
//                       <div className="flex justify-center">
//                         <img
//                           src={item.product?.img ? `http://food-project-api.onrender.com/uploads/${item.product.img}` : "default_image_url"}
//                           className="h-12 w-12 object-cover rounded"
//                           alt={item.name}
//                         />
//                       </div>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">₦{item.product.price ? item.product.price.toFixed(2) : '0.00'}</td>
//                     <td className="py-2 px-2 sm:px-4">{item.quantity || 0}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       ₦{item.product.price && item.quantity ? (item.product.price * item.quantity).toFixed(2) : '0.00'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Mobile View */}
//             <div className="block sm:hidden">
//               {cartItems?.products?.map((item, index) => (
//                 <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <img
//                       src={item.img ? `${url}/uploads/${item.product.img}` : "default_image_url"}
//                       className="h-12 w-12 object-cover rounded"
//                       alt={item.name}
//                     />
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleReduceItem(item.product._id)}
//                         className="p-2 text-blue-500 hover:bg-blue-100 rounded"
//                       >
//                         <MdRemove />
//                       </button>
//                       <button
//                         onClick={() => handleAddItem(item.product._id)}
//                         className="p-2 text-green-500 hover:bg-green-100 rounded"
//                       >
//                         <MdAdd />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveItem(item.product._id)}
//                         className="p-2 text-orange-500 hover:bg-orange-100 rounded"
//                       >
//                         <MdDelete />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-center mb-2">
//                     <h2 className="font-semibold text-lg">{item.product.name}</h2>
//                     <p>₦{item.product.price ? item.product.price.toFixed(2) : '0.00'}</p>
//                     <p>Quantity: {item.quantity || 0}</p>
//                     <p>Total: ₦{item.product.price && item.quantity ? (item.product.price * item.quantity).toFixed(2) : '0.00'}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6 px-4">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-semibold">
//                 <b>Total Amount:</b> ₦{totalCartAmount()}
//               </p>
//               <Link
//                 to="/checkout"
//                 className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
//               >
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
  
// }

// export default Cart;


// new code 15 november
import React, { useContext, useEffect } from "react";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
    // zainab suggestion
    const cart = JSON.parse(localStorage.getItem("cart"));
  const {
    cartItems,
    removeCartItems,
    updateCartItems,
    fetchCartData,
    url,
  } = useContext(MenuContext);

  useEffect(() => {
    fetchCartData()
  }, [cartItems])



  // Updated totalCartAmount function to handle undefined cartItems.products
  const totalCartAmount = () => {
    let totalAmount = 0;
    if (cartItems && cartItems.menus && Array.isArray(cartItems.menus)) {
      cartItems.menus.forEach((item) => {
        if (item.menu && item.menu.price && item.quantity) {
          totalAmount += item.menu.price * item.quantity;
        }
      });
    }
    return totalAmount.toFixed(2);
  };

  // just now to check if it wil count and add to cart
  // const totalCartCount = () => {
  //   // Safely handle cases where cartItems or cartItems.menus may be undefined
  //   if (cartItems && Array.isArray(cartItems.products)) {
  //     return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
  //   }
  //   return 0;
  // };


  const handleAddItem = (itemId) => {
    updateCartItems(itemId, 1);
    toast.success("Item added to cart");
  };

  const handleRemoveItem = (itemId) => {
    removeCartItems(itemId);
    toast.error("Item removed from cart");
  };

  const handleReduceItem = (itemId) => {
    updateCartItems(itemId, -1);
    toast.info("Item quantity reduced");
  };
  
  return (
    <div className="bg-purple-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Shop Cart</h1>
      {(!cartItems || !cartItems.menus || cartItems.menus.length === 0) ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <>
       
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg hidden sm:table">
              <thead className="bg-purple-200">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center sm:px-4">Action</th>
                  <th className="py-3 px-2 text-center sm:px-4">Item</th>
                  <th className="py-3 px-2 text-center sm:px-4">Image</th>
                  <th className="py-3 px-2 text-center sm:px-4">Price</th>
                  <th className="py-3 px-2 text-center sm:px-4">Quantity</th>
                  <th className="py-3 px-2 text-center sm:px-4">Amount</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.menus?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex justify-center items-center space-x-2 py-2 px-2 sm:px-4">
                      <button
                        onClick={() => handleReduceItem(item.menu._id)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                      >
                        <MdRemove />
                      </button>
                      <button
                        onClick={() => handleAddItem(item.menu._id)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded"
                      >
                        <MdAdd />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.menu._id)}
                        className="p-2 text-orange-500 hover:bg-orange-100 rounded"
                      >
                        <MdDelete />
                      </button>
                    </td>
                    <td className="py-2 px-2 sm:px-4">{item.menu.name}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex justify-center">
                        <img
                       
                        // http://food-project-api.onrender.com/uploads
                          src={item.menu?.img ? ` https://food-project-api.onrender.com/uploads/${item.menu.img}` : "default_image_url"}
                          className="h-12 w-12 object-cover rounded"
                          alt={item.name}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2 sm:px-4">₦{item.menu.price ? item.menu.price.toFixed(2) : '0.00'}</td>
                    <td className="py-2 px-2 sm:px-4">{item.quantity || 0}</td>
                    <td className="py-2 px-2 sm:px-4">
                      ₦{item.menu.price && item.quantity ? (item.menu.price * item.quantity).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="block sm:hidden">
              {cartItems.menus?.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src={item.menu?.img ? `${url}/uploads/${item.menu.img}` : "default_image_url"}
                      className="h-12 w-12 object-cover rounded"
                      alt={item.name}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReduceItem(item.menu._id)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                      >
                        <MdRemove />
                      </button>
                      <button
                        onClick={() => handleAddItem(item.menu._id)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded"
                      >
                        <MdAdd />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.menu._id)}
                        className="p-2 text-orange-500 hover:bg-orange-100 rounded"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <h2 className="font-semibold text-lg">{item.menu.name}</h2>
                    <p>₦{item.menu.price ? item.menu.price.toFixed(2) : '0.00'}</p>
                    <p>Quantity: {item.quantity || 0}</p>
                    <p>Total: ₦{item.menu.price && item.quantity ? (item.menu.price * item.quantity).toFixed(2) : '0.00'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 px-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                <b>Total Amount:</b> ₦{totalCartAmount()}
                {/* <p className="text-center text-lg">Total Items in Cart: {totalCartAmount()}</p> */}
              </p>
              <Link
                to="/checkout"
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

// testing updated code to be sure cart is counting
// import React, { useContext } from "react";
// import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { MenuContext } from "../../context/MenuContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Cart() {
//   const {
//     cartItems,
//     removeCartItems,
//     updateCartItems,
//     url,
//   } = useContext(MenuContext);

//   const totalCartCount = () => {
//     // Safely handle cases where cartItems or cartItems.products may be undefined
//     if (cartItems && Array.isArray(cartItems.products)) {
//       return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
//     }
//     return 0;
//   };

//   const handleAddItem = (itemId) => {
//     updateCartItems(itemId, 1);
//     toast.success("Item added to cart");
//   };

//   const handleRemoveItem = (itemId) => {
//     removeCartItems(itemId);
//     toast.error("Item removed from cart");
//   };

//   const handleReduceItem = (itemId) => {
//     updateCartItems(itemId, -1);
//     toast.info("Item quantity reduced");
//   };

//   return (
//     <div className="bg-purple-100 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Shop Cart</h1>
//       {(!cartItems || !cartItems.products || cartItems.products.length === 0) ? (
//         <p className="text-center text-lg">Your cart is empty</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-md rounded-lg hidden sm:table">
//               <thead className="bg-purple-200">
//                 <tr className="text-left">
//                   <th className="py-3 px-2 text-center sm:px-4">Action</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Item</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Image</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Price</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Quantity</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {cartItems.products?.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="flex justify-center items-center space-x-2 py-2 px-2 sm:px-4">
//                       <button
//                         onClick={() => handleReduceItem(item.product._id)}
//                         className="p-2 text-blue-500 hover:bg-blue-100 rounded"
//                       >
//                         <MdRemove />
//                       </button>
//                       <button
//                         onClick={() => handleAddItem(item.product._id)}
//                         className="p-2 text-green-500 hover:bg-green-100 rounded"
//                       >
//                         <MdAdd />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveItem(item.product._id)}
//                         className="p-2 text-orange-500 hover:bg-orange-100 rounded"
//                       >
//                         <MdDelete />
//                       </button>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">{item.product.name}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       <div className="flex justify-center">
//                         <img
//                           src={item.product?.img ? `${url}/uploads/${item.product.img}` : "default_image_url"}
//                           className="h-12 w-12 object-cover rounded"
//                           alt={item.name}
//                         />
//                       </div>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">₦{item.product.price ? item.product.price.toFixed(2) : "0.00"}</td>
//                     <td className="py-2 px-2 sm:px-4">{item.quantity || 0}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       ₦{item.product.price && item.quantity ? (item.product.price * item.quantity).toFixed(2) : "0.00"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 px-4">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-semibold">
//                 Total Items in Cart: {totalCartCount()}
//               </p>
//               <Link
//                 to="/checkout"
//                 className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
//               >
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;

// same code 21 november
// import React, { useContext} from "react";
// import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { MenuContext } from "../../context/MenuContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Cart() {
//   const {
//     cartItems,
//     removeCartItems,
//     updateCartItems,
//     url,
//   } = useContext(MenuContext);

//     useEffect(() => {
//     console.log("Cart items in Cart component:", cartItems); // Debug log to check cartItems
//   }, [cartItems]);

//   const totalCartCount = () => {
//     // Safely handle cases where cartItems or cartItems.products may be undefined
//     if (cartItems && Array.isArray(cartItems.products)) {
//       return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
//     }
//     return 0;
//   };

//   const handleAddItem = (itemId) => {
//     updateCartItems(itemId, 1);
//     toast.success("Item added to cart");
//   };

//   const handleRemoveItem = (itemId) => {
//     removeCartItems(itemId);
//     toast.error("Item removed from cart");
//   };

//   const handleReduceItem = (itemId) => {
//     updateCartItems(itemId, -1);
//     toast.info("Item quantity reduced");
//   };

//   return (
//     <div className="bg-purple-100 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Shop Cart</h1>
//       {(!cartItems || !cartItems.products || cartItems.products.length === 0) ? (
//         <p className="text-center text-lg">Your cart is empty</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-md rounded-lg hidden sm:table">
//               <thead className="bg-purple-200">
//                 <tr className="text-left">
//                   <th className="py-3 px-2 text-center sm:px-4">Action</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Item</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Image</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Price</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Quantity</th>
//                   <th className="py-3 px-2 text-center sm:px-4">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {cartItems.products?.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="flex justify-center items-center space-x-2 py-2 px-2 sm:px-4">
//                       <button
//                         onClick={() => handleReduceItem(item.product._id)}
//                         className="p-2 text-blue-500 hover:bg-blue-100 rounded"
//                       >
//                         <MdRemove />
//                       </button>
//                       <button
//                         onClick={() => handleAddItem(item.product._id)}
//                         className="p-2 text-green-500 hover:bg-green-100 rounded"
//                       >
//                         <MdAdd />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveItem(item.product._id)}
//                         className="p-2 text-orange-500 hover:bg-orange-100 rounded"
//                       >
//                         <MdDelete />
//                       </button>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">{item.product.name}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       <div className="flex justify-center">
//                         <img
//                           src={item.product?.img ? `${url}/uploads/${item.product.img}` : "default_image_url"}
//                           className="h-12 w-12 object-cover rounded"
//                           alt={item.name}
//                         />
//                       </div>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">₦{item.product.price ? item.product.price.toFixed(2) : "0.00"}</td>
//                     <td className="py-2 px-2 sm:px-4">{item.quantity || 0}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       ₦{item.product.price && item.quantity ? (item.product.price * item.quantity).toFixed(2) : "0.00"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 px-4">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-semibold">
//                 Total Items in Cart: {totalCartCount()}
//               </p>
//               <Link
//                 to="/checkout"
//                 className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
//               >
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;






