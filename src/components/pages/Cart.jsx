import React, { useContext, useEffect } from "react";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const {
    cartItems = [],
    removeCartItem,
    addCartItem,
    reduceCartItem,
    url,
  } = useContext(MenuContext);

  useEffect(() => {
    console.log("Cart items in Cart component:", cartItems); // Debug log to check cartItems
  }, [cartItems]);

  const totalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      if (item.price && item.quantity) {
        totalAmount += item.price * item.quantity;
      }
    });
    return totalAmount.toFixed(2);
  };

  const handleAddItem = (itemId) => {
    addCartItem(itemId);
    toast.success("Item added to cart");
  };

  const handleRemoveItem = (itemId) => {
    removeCartItem(itemId);
    toast.error("Item removed from cart");
  };

  const handleReduceItem = (itemId) => {
    reduceCartItem(itemId);
    toast.info("Item quantity reduced");
  };

  return (
    <div className="bg-purple-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Shop Cart</h1>
      {cartItems.length === 0 ? (
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
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex justify-center items-center space-x-2 py-2 px-2 sm:px-4">
                      <button
                        onClick={() => handleReduceItem(item._id)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                      >
                        <MdRemove />
                      </button>
                      <button
                        onClick={() => handleAddItem(item._id)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded"
                      >
                        <MdAdd />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-orange-500 hover:bg-orange-100 rounded"
                      >
                        <MdDelete />
                      </button>
                    </td>
                    <td className="py-2 px-2 sm:px-4">{item.name}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex justify-center">
                        <img
                          src={item.img ? `${url}/uploads/${item.img}` : "default_image_url"}
                          className="h-12 w-12 object-cover rounded"
                          alt={item.name}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2 sm:px-4">₦{item.price ? item.price.toFixed(2) : '0.00'}</td>
                    <td className="py-2 px-2 sm:px-4">{item.quantity || 0}</td>
                    <td className="py-2 px-2 sm:px-4">
                      ₦{item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="block sm:hidden">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src={item.img ? `${url}/uploads/${item.img}` : "default_image_url"}
                      className="h-12 w-12 object-cover rounded"
                      alt={item.name}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReduceItem(item._id)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                      >
                        <MdRemove />
                      </button>
                      <button
                        onClick={() => handleAddItem(item._id)}
                        className="p-2 text-green-500 hover:bg-green-100 rounded"
                      >
                        <MdAdd />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-orange-500 hover:bg-orange-100 rounded"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p>₦{item.price ? item.price.toFixed(2) : '0.00'}</p>
                    <p>Quantity: {item.quantity || 0}</p>
                    <p>Total: ₦{item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : '0.00'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 px-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                <b>Total Amount:</b> ₦{totalCartAmount()}
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



