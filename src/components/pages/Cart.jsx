
import React, { useContext, useEffect, useMemo } from "react";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { toast } from "react-toastify";

function Cart() {
  const {
    cartItems,
    removeCartItems,
    updateCartItems,
    url,
    isAuthenticated
  } = useContext(MenuContext);

  

  // Calculate total amount with memoization
  const totalCartAmount = useMemo(() => {
    if (!cartItems?.menus) return 0;
    return cartItems.menus.reduce(
      (total, item) => total + (item?.amount || 0),
      0
    ).toFixed(2);
  }, [cartItems]);

  // Handle quantity changes with validation
  const handleQuantityChange = (productId, change) => {
    const item = cartItems?.menus?.find(item => item?.menu?._id === productId);
    if (item && item?.quantity + change < 1) {
      toast.warning("Quantity cannot be less than 1");
      return;
    }
    updateCartItems(productId, change);
  };

  // Handle item removal with confirmation
  const handleRemoveItem = (productId) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      removeCartItems(productId);
      toast.success("Item removed from cart");
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">Your Shopping Cart</h1>
        
        {!cartItems?.menus?.length ? (
          <div className="text-center">
            <img 
              src="/empty-cart.svg" 
              alt="Empty cart" 
              className="mx-auto h-48 w-48"
            />
            <p className="text-lg mt-4 text-gray-600">Your cart is empty</p>
            <Link 
              to="/menu" 
              className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-200"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              {/* Desktop View */}
              <table className="w-full hidden sm:table">
                <thead className="bg-purple-100">
                  <tr className="text-left">
                    <th className="py-4 px-6 text-center">Action</th>
                    <th className="py-4 px-6">Item</th>
                    <th className="py-4 px-6 text-center">Image</th>
                    <th className="py-4 px-6 text-right">Price</th>
                    <th className="py-4 px-6 text-center">Quantity</th>
                    <th className="py-4 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.menus?.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-purple-50">
                      <td className="flex justify-center items-center space-x-2 py-4 px-6">
                        <button
                          onClick={() => handleQuantityChange(item?.menu?._id, -1)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition"
                          aria-label="Decrease quantity"
                        >
                          <MdRemove size={18} />
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item?.menu?._id, 1)}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-full transition"
                          aria-label="Increase quantity"
                        >
                          <MdAdd size={18} />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item?.menu?._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                          aria-label="Remove item"
                        >
                          <MdDelete size={18} />
                        </button>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item?.menu?.name}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          <img
                            src={item?.menu?.img ? `${url}/uploads/${item?.menu?.img}` : "/default-food.jpg"}
                            className="h-12 w-12 object-cover rounded-lg"
                            alt={item?.menu?.name}
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        ₦{item?.menu?.price?.toFixed(2) || '0.00'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item?.quantity}
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        ₦{item?.amount?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile View */}
              <div className="block sm:hidden divide-y">
                {cartItems?.menus?.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-purple-50">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item?.menu?.img ? `${url}/uploads/${item?.menu?.img}` : "/default-food.jpg"}
                        className="h-16 w-16 object-cover rounded-lg"
                        alt={item?.menu?.name}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item?.menu?.name}</h3>
                        <p className="text-gray-600">₦{item?.menu?.price?.toFixed(2) || '0.00'}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleQuantityChange(item?.menu?._id, -1)}
                            className="p-1 text-blue-500 hover:bg-blue-50 rounded-full"
                            aria-label="Decrease quantity"
                          >
                            <MdRemove size={18} />
                          </button>
                          <span className="mx-2 w-8 text-center">{item?.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item?.menu?._id, 1)}
                            className="p-1 text-green-500 hover:bg-green-50 rounded-full"
                            aria-label="Increase quantity"
                          >
                            <MdAdd size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          onClick={() => handleRemoveItem(item?.menu?._id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                          aria-label="Remove item"
                        >
                          <MdDelete size={18} />
                        </button>
                        <p className="mt-4 font-medium">
                          ₦{item?.amount?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-purple-800">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{totalCartAmount}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₦0.00</span>
                </div> */}
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold text-purple-600">
                    ₦{totalCartAmount}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full block text-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;