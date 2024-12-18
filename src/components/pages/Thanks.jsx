import { useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import thax from "/thax.jpg";
import { MenuContext } from "../../context/MenuContext";


// import thax from './path/to/thax.png'; // Update the path according to your project structu

const Thanks = () => {
  const {createOrder} = useContext(MenuContext)
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")
  // const { firstName, lastName, totalAmount, Date } = body

 

  // console.log(transaction_id, tx_ref)
  // useEffect(()=>{
  //   if (transaction_id && tx_ref) {
  //     createOrder(transaction_id, tx_ref)
  //   }
  // }, [transaction_id, tx_ref, createOrder])

  return (
    
      <div className="thanks-content">
        <div className="mt-10 flex justify-center">
        {/* <img src={thax} alt="Thank you" className="w-[600px] h-[450px]" /> */}
        <video className=" w-[60vw] h-[60vh] rounded-full" src="/thanks-vid.mp4" loop autoPlay muted controls></video>
        </div>
        {/* <h1 className="font-bold text-center text-2xl">Thank You!</h1> */}
        <p className="text-center font-bold text-2xl mt-3">
          We appreciate your feedback. Have a great day!
        </p>
        <div className="font-bold text-2xl">
        
        <div className="receipt bg-gray-100 shadow-md rounded-lg p-6 mt-8 mx-auto w-full max-w-md">
  <h2 className="text-xl font-semibold text-center mb-4 text-indigo-600">
    Payment Receipt
  </h2>
  <div className="flex flex-col gap-4">
    <div className="flex justify-between">
      <span className="font-medium">First Name:</span>
      {/* <span>{firstName || "N/A"}</span> */}
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Last Name:</span>
      {/* <span>{lastName || "N/A"}</span> */}
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Total Amount:</span>
      {/* <span>₦{amount || "0.00"}</span> */}
    </div>
    <div className="flex justify-between">
      {/* <span className="font-medium">Date:</span> */}
      <span>
        {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
      </span>
    </div>
  </div>
</div>

            

          </div>
        </div>
      

  );
};

export default Thanks;


// import { useContext, useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// // import thax from "/thax.jpg";
// import { MenuContext } from "../../context/MenuContext";

// const Thanks = () => {
//   const { createOrder } = useContext(MenuContext);
//   const [searchParams] = useSearchParams();
//   const [receiptDetails, setReceiptDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const tx_ref = searchParams.get("tx_ref");
//   const transaction_id = searchParams.get("transaction_id");

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (transaction_id && tx_ref) {
//         try {
//           const orderDetails = await createOrder(transaction_id, tx_ref);
//           setReceiptDetails(orderDetails);
//         } catch (error) {
//           console.error("Error fetching order details:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchOrderDetails();
//   }, [transaction_id, tx_ref, createOrder]);

//   if (loading) {
//     return <div className="text-center text-xl mt-10">Loading receipt...</div>;
//   }

//   if (!receiptDetails) {
//     return (
//       <div className="text-center text-xl mt-10 text-red-500">
//         Failed to fetch receipt details. Please contact support.
//       </div>
//     );
//   }

//   const { orderId, totalAmount, paymentMethod, items } = receiptDetails;

//   return (
//     <div className="thanks-content px-5">
//       <div className="mt-10 flex justify-center">
//         <video
//           className="w-[60vw] h-[60vh] rounded-full"
//           src="/thanks-vid.mp4"
//           loop
//           autoPlay
//           muted
//           controls
//         ></video>
//       </div>
//       <h1 className="text-center font-bold text-2xl mt-3">
//         Thank you for your order!
//       </h1>
//       <p className="text-center text-gray-700">
//         Your order has been successfully placed. Below is your payment receipt.
//       </p>

//       {/* Payment Receipt */}
//       <div className="receipt bg-gray-100 shadow-lg rounded-lg p-6 mt-8 mx-auto w-full max-w-lg">
//         <h2 className="text-lg font-semibold text-center mb-4 text-indigo-600">
//           Payment Receipt
//         </h2>
//         <div className="flex justify-between mb-2">
//           <span className="font-medium">Order ID:</span>
//           <span>{orderId}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span className="font-medium">Transaction ID:</span>
//           <span>{transaction_id}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span className="font-medium">Payment Method:</span>
//           <span>{paymentMethod}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span className="font-medium">Total Amount:</span>
//           <span>${totalAmount.toFixed(2)}</span>
//         </div>

//         {/* Order Summary */}
//         <h3 className="text-lg font-semibold text-indigo-600 mt-4">Order Summary:</h3>
//         <ul className="mt-2 space-y-1">
//           {items.map((item, index) => (
//             <li key={index} className="flex justify-between">
//               <span>
//                 {item.name} x{item.quantity}
//               </span>
//               <span>${(item.price * item.quantity).toFixed(2)}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Thanks;




