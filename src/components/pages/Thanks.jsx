


import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";

const Thanks = () => {
  const { createOrder, order, isAuthenticated, url } = useContext(MenuContext);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [error, setError] = useState(null);
  const [orderProcessed, setOrderProcessed] = useState(false);

  useEffect(() => {
        const transaction_id = searchParams.get("transaction_id");
        const tx_ref = searchParams.get("tx_ref");
    
        if (!transaction_id || !tx_ref) {
          setError("Invalid payment verification parameters");
          setStatus("failed");
          return;
        }
    
        // Check if we've already processed this order
        if (orderProcessed || order?.transactionId === transaction_id) {
          setStatus("completed");
          return;
        }
    
        const verifyPayment = async () => {
          try {
            // setStatus("processing");
            await createOrder(transaction_id, tx_ref);
            setOrderProcessed(true);
            setStatus("completed");
          } catch (err) {
            console.error("Payment verification error:", err);
            // setError(err.message || "Payment verification failed");
            // setStatus("failed");
          }
        };
    
        verifyPayment();
      }, [searchParams, createOrder, orderProcessed, order]);

  if(!isAuthenticated){
    return <Navigate to={"/"} />
  }

  if (status === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        <h2 className="text-2xl font-semibold">Verifying your payment...</h2>
        <p className="text-gray-600">Please wait while we confirm your order</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="mb-4">{error || "There was an issue processing your payment"}</p>
        <Link 
          to="/cart" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-green-600 text-white p-6">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-2">Thank you for your order #{order?.orderId}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Date:</span> {new Date(order?.createdAt).toLocaleString()}</p>
                <p><span className="font-medium">Total:</span> ₦{order?.amount?.toFixed(2)}</p>
                <p><span className="font-medium">Payment Method:</span> Flutterwave</p>
                <p><span className="font-medium">Transaction ID:</span> {order?.transactionId}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="space-y-2">
                <p>{order?.firstName} {order?.lastName}</p>
                <p>{order?.address}</p>
                <p>{order?.phone}</p>
                <p>{order?.email}</p>
                <p className="font-medium">Status: <span className="text-green-600">{order?.status}</span></p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order?.menus?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.menu?.image && (
                          <img
                            className="h-10 w-10 rounded-full object-cover mr-4"
                            src={`${url}/uploads/${item.menu.image}`}
                            alt={item.menu.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.menu?.name || item.name || "Unknown Item"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₦{(item.menu?.price || item.price || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{((item.menu?.price || item.price || 0) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-medium">Total:</td>
                  <td className="px-6 py-4 font-bold">₦{order?.amount?.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/menu"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
        {/* <Link
          to="/orders"
          className="inline-block ml-4 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          View All Orders
        </Link> */}
      </div>
    </div>
  );
};

export default Thanks;