import React, { useContext, useState, useEffect } from 'react';
import { MenuContext } from '../../context/MenuContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, url } = useContext(MenuContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Cart items in Checkout:', cartItems);
    console.log('Checkout component state:', { formData, isLoading, error });
  }, [cartItems, formData, isLoading, error]);

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    console.log('Form submitted with data:', formData);
    console.log('Cart items before submission:', cartItems);
  
    const { firstName, lastName, phone, address, email } = formData;
    const amount = calculateTotalAmount();
    const currency = 'NGN';
  
    const payload = {
      amount,
      currency,
      firstName,
      lastName,
      phone,
      address,
      email,
      cart: cartItems,
    };
  
    console.log('Sending payload to backend:', payload);
  
    try {
      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }
  
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const createPaymentLink = async (payload) => {
        try {
          const token = localStorage.getItem('auth-token');
          const response = await axios.post(`${url}/api/payment/initiate`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          // Log the full response to debug
          console.log('Full response from payment initiation API:', response.data);
      
          if (response.data.success) {
            const paymentLink = response.data.link;
            window.location.href = paymentLink; // Redirect to Flutterwave payment page
          } else {
            throw new Error(response.data.error || 'Payment initiation failed');
          }
        } catch (error) {
          console.error('Error creating payment link:', error);
          throw error;
        }
      };
  
      // Call the createPaymentLink function with the payload
      await createPaymentLink(payload);
  
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="font-bold text-xl md:text-2xl mb-4">Order Summary</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b font-semibold">
                      <th className="py-2">Item</th>
                      <th className="py-2">Image</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b text-center">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">
                          <div className="flex justify-center">
                            <img src={`${url}/uploads/${item.img}`} className="h-12 md:h-16" alt={item.name} />
                          </div>
                        </td>
                        <td className="py-2">₦{item.price}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">₦{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="font-bold text-xl">
                  <h1>Total = ₦{calculateTotalAmount()}</h1>
                </div>
              </div>

              {/* Mobile View */}
              <div className="block sm:hidden">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <img
                        src={`${url}/uploads/${item.img}`}
                        className="h-16 w-16 object-cover rounded"
                        alt={item.name}
                      />
                      <div className="flex flex-col text-center flex-grow">
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <p>₦{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ₦{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="font-bold text-xl text-center">
                  <h1>Total = ₦{calculateTotalAmount()}</h1>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Delivery Information Section */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="mb-4 font-bold text-xl md:text-2xl text-center">Delivery Information</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleFormSubmit} id="orderId">
            <div className="flex flex-col gap-4 mb-4">
              <label className="font-semibold" htmlFor="firstName">First Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="font-semibold" htmlFor="lastName">Last Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="font-semibold" htmlFor="phone">Phone Number</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="font-semibold" htmlFor="email">Email</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="font-semibold" htmlFor="address">Address</label>
              <textarea
                className="border border-gray-300 p-2 rounded-md"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="6"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-300 w-full"
              disabled={isLoading || cartItems.length === 0}
            >
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
