
import React, { useContext, useState, useEffect } from "react";
import { MenuContext } from "../../context/MenuContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const { cartItems, url, isAuthenticated } = useContext(MenuContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotalAmount = () => {
    if (!cartItems?.menus?.length) return "0.00";
    return cartItems.menus.reduce((total, item) => {
      return total + (item.menu?.price || 0) * (item.quantity || 0);
    }, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initiatePayment = async (payload) => {
    const token = localStorage.getItem("auth-token");
    if (!token) throw new Error("Authentication required");

    const response = await axios.post(`${url}/api/payment/initiate`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data?.link) {
      throw new Error(response.data?.error || "Payment initiation failed");
    }
    return response.data.link;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate cart
      if (!cartItems?.menus?.length) {
        throw new Error("Your cart is empty");
      }

      // Validate form
      if (!formData.email || !formData.phone) {
        throw new Error("Email and phone number are required");
      }

      const payload = {
        amount: calculateTotalAmount(),
        currency: "NGN",
        ...formData,
        cart: cartItems,
      };

      const paymentLink = await initiatePayment(payload);
      window.location.href = paymentLink;

    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if(!isAuthenticated){
    toast.warning("Please login!..")
    return <Navigate to={"/"} />
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="font-bold text-xl md:text-2xl mb-4">Order Summary</h1>
          {!cartItems?.menus?.length ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="hidden sm:block">
                <table className="w-full mb-4">
                  <thead>
                    {/* <tr className="border-b font-semibold">
                      <th className="py-2">Item</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Amount</th>
                    </tr> */}
                    <tr className="border-b font-semibold">
                       <th className="py-2">Item</th>
                       <th className="py-2">Image</th>
                       <th className="py-2">Price</th>
                       <th className="py-2">Quantity</th>
                       <th className="py-2">Amount</th>
                     </tr>
                  </thead>
                  <tbody>
                    {cartItems?.menus?.map((item, index) => (
                      <tr key={index} className="border-b text-center">
                        <td className="py-2 font-medium text-gray-900">
                        {item?.menu?.name}
                      </td>
                      <td className="py-2">
                        <div className="flex justify-center">
                          <img
                            src={item?.menu?.img ? `${url}/uploads/${item?.menu?.img}` : "/default-food.jpg"}
                            className="h-12 w-12 object-cover rounded-lg"
                            alt={item?.menu?.name}
                            loading="lazy"
                          />
                        </div>
                      </td>
                        <td className="py-2">₦{(item.menu?.price || 0).toFixed(2)}</td>
                        <td className="py-2">{item.quantity || 0}</td>
                        <td className="py-2">
                          ₦{((item.menu?.price || 0) * (item.quantity || 0)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="font-bold text-xl">
                  Total: ₦{calculateTotalAmount()}
                </div>
              </div>

              {/* Mobile View */}
              <div className="block sm:hidden">
                {cartItems.menus.map((item, index) => (
                  <div key={index} className="mb-4 p-3 border rounded">
                    <p className="font-semibold">{item.menu?.name || "Unknown"}</p>
                    <p>₦{(item.menu?.price || 0).toFixed(2)} × {item.quantity || 0}</p>
                    <p>Total: ₦{((item.menu?.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                  </div>
                ))}
                <div className="font-bold text-xl mt-4">
                  Total: ₦{calculateTotalAmount()}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Delivery Information */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="mb-4 font-bold text-xl md:text-2xl">Delivery Information</h1>
          {error && <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>}
          <form onSubmit={handleFormSubmit}>
            {[
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "address", label: "Delivery Address", type: "text" },
            ].map((field) => (
              <div className="mb-4" key={field.name}>
                <label className="block mb-1 font-medium">{field.label}</label>
                <input
                  className="w-full p-2 border rounded"
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md text-white font-bold ${
                isLoading || !cartItems?.menus?.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              disabled={isLoading || !cartItems?.menus?.length}
            >
              {isLoading ? "Processing Payment..." : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
