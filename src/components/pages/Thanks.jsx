// old 30 jan 2025

// import { useContext, useEffect } from "react"
// import { useSearchParams } from "react-router-dom"
// import thax from "/thax.jpg";
// import { MenuContext } from "../../context/MenuContext";


// // import thax from './path/to/thax.png'; // Update the path according to your project structu


// const Thanks = () => {
//   const {createOrder, order} = useContext(MenuContext)
//   const [searchParams] = useSearchParams()
//   const tx_ref = searchParams.get("tx_ref")
//   const transaction_id = searchParams.get("transaction_id")
//   // window.location.reload(); //reload the current page
//   // const { firstName, lastName, totalAmount, Date } = body

//   // State to track if there was an error
//   const [error, setError] = useState(false);


 

//   console.log( transaction_id, tx_ref )
//   console.log("Order", order)
//   useEffect(()=>{
//     if (transaction_id && tx_ref) {
//       // if(order){
//         createOrder(transaction_id, tx_ref)
//       // }
//     }
//   }, [transaction_id, tx_ref])

//   return (
    
//       <div className="thanks-content">
//         <div className="mt-10 flex justify-center">
//         {/* <img src={thax} alt="Thank you" className="w-[600px] h-[450px]" /> */}
//         <video className=" w-[60vw] h-[60vh] rounded-full" src="/thanks-vid.mp4" loop autoPlay muted controls></video>
//         </div>
//         {/* <h1 className="font-bold text-center text-2xl">Thank You!</h1> */}
//         <p className="text-center font-bold text-2xl mt-3">
//           We appreciate your feedback. Have a great day!
//         </p>
//         <div className="font-bold text-2xl">
        
//         <div className="receipt bg-gray-100 shadow-md rounded-lg p-6 mt-8 mx-auto w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center mb-4 text-indigo-600">
//             Payment Receipt
//           </h2>
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between">
//               <span className="font-medium">First Name: {order.firstName}</span>
//               {/* <span>{firstName || "N/A"}</span> */}
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Last Name: {order.lastName}</span>
//               {/* <span>{lastName || "N/A"}</span> */}
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Total Amount: {order.amount}</span>
//               {/* <span>₦{amount || "0.00"}</span> */}
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Date:</span>
//               <span className="">
//                 { order.date ? new Date(order.date).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}
//               </span>
//               {/* <span className="">
//   {order.date ? new Date(order.date).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric" }).replace(",", "") : ""}
// </span> */}

//             </div>
//           </div>
//           <div className="listing">
//               <h2 className="mt-5 capitalize mb-2">Purchased Items</h2>
//               {/* <li className="p-2 font-serif mb-2 font-normal text-xl capitalize hover:bg-slate-300 bg-slate-200">new goods &nbsp;  -- 3 &nbsp;-- 200</li> */}
//               {order?.menus?.map((items)=> (
//                 <ul>
//                     <li className="p-2 font-serif mb-2 font-normal text-xl capitalize hover:bg-slate-300 bg-slate-200">{items?.menu?.name} &nbsp; -- {items?.quantity} -- &nbsp; {items?.menu?.price}</li>
//                 </ul>
//               ))}
//           </div>
//         </div>

// </div>
// </div>
      

//   );
// };

// export default Thanks;


// new 30th jan 2025

// import { useContext, useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import thax from "/thax.jpg";
// import { MenuContext } from "../../context/MenuContext";

// const Thanks = () => {
//   const { createOrder, order } = useContext(MenuContext);
//   const [searchParams] = useSearchParams();
//   const tx_ref = searchParams.get("tx_ref");
//   const transaction_id = searchParams.get("transaction_id");

//   // State to track if there was an error
//   const [error, setError] = useState(false);

//   console.log(transaction_id, tx_ref);
//   console.log("Order", order);

//   useEffect(() => {
//     if (transaction_id && tx_ref) {
//       // Try to create the order
//       createOrder(transaction_id, tx_ref)
//         .then(() => {
//           // Successful order creation - do nothing or show success message
//         })
//         .catch((err) => {
//           // If there's an error, set the error state to true
//           console.error("Error creating order:", err);
//           setError(true);
//         });
//     }
//   }, [transaction_id, tx_ref]);

//   // If there's an error, reload the page
//   useEffect(() => {
//     if (error) {
//       window.location.reload();
//     }
//   }, [error]);

//   return (
//     <div className="thanks-content">
//       <div className="mt-10 flex justify-center">
//         <video
//           className=" w-[60vw] h-[60vh] rounded-full"
//           src="/thanks-vid.mp4"
//           loop
//           autoPlay
//           muted
//           controls
//         ></video>
//       </div>
//       <p className="text-center font-bold text-2xl mt-3">
//         We appreciate your feedback. Have a great day!
//       </p>
//       <div className="font-bold text-2xl">
//         <div className="receipt bg-gray-100 shadow-md rounded-lg p-6 mt-8 mx-auto w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center mb-4 text-indigo-600">
//             Payment Receipt
//           </h2>
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between">
//               <span className="font-medium">First Name: {order.firstName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Last Name: {order.lastName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Total Amount: {order.amount}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Date:</span>
//               <span className="">
//                 {order.date
//                   ? new Date(order.date).toLocaleString("en-GB", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })
//                   : ""}
//               </span>
//             </div>
//           </div>
//           <div className="listing">
//             <h2 className="mt-5 capitalize mb-2">Purchased Items</h2>
//             {order?.menus?.map((items) => (
//               <ul key={items?.menu?.id}>
//                 <li className="p-2 font-serif mb-2 font-normal text-xl capitalize hover:bg-slate-300 bg-slate-200">
//                   {items?.menu?.name} &nbsp; -- {items?.quantity} -- &nbsp;
//                   {items?.menu?.price}
//                 </li>
//               </ul>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Thanks;


// 30th jan 2025
// import { useContext, useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { MenuContext } from "../../context/MenuContext";

// const Thanks = () => {
//   const { createOrder, order, clearCart } = useContext(MenuContext); // Assuming clearCart is a function to reset the cart
//   const [searchParams] = useSearchParams();
//   const tx_ref = searchParams.get("tx_ref");
//   const transaction_id = searchParams.get("transaction_id");

//   const [loading, setLoading] = useState(true); // To handle loading state
//   const [error, setError] = useState(""); // To store error messages

//   useEffect(() => {
//     if (transaction_id && tx_ref) {
//       // Attempt to create the order
//       createOrder(transaction_id, tx_ref)
//         .then((response) => {
//           if (response.success) {
//             // Clear the cart after successful order
//             clearCart();
//             setLoading(false); // Stop loading once the order is created successfully
//           } else {
//             // Set error message if order creation fails
//             setError("An error occurred while processing your order.");
//             setLoading(false);
//           }
//         })
//         .catch((err) => {
//           console.error("Error creating order:", err);
//           setError("An error occurred while processing your order.");
//           setLoading(false);
//         });
//     }
//   }, [transaction_id, tx_ref, createOrder, clearCart]);

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <p>Loading...</p>
//       </div>
//     ); // Display loading state while waiting for the order to complete
//   }

//   return (
//     <div className="thanks-content">
//       {error && (
//         <div className="error-message">
//           <p>{error}</p>
//         </div>
//       )}
//       <div className="mt-10 flex justify-center">
//         <video
//           className=" w-[60vw] h-[60vh] rounded-full"
//           src="/thanks-vid.mp4"
//           loop
//           autoPlay
//           muted
//           controls
//         ></video>
//       </div>
//       <p className="text-center font-bold text-2xl mt-3">
//         We appreciate your feedback. Have a great day!
//       </p>
//       {order && (
//         <div className="font-bold text-2xl">
//           <div className="receipt bg-gray-100 shadow-md rounded-lg p-6 mt-8 mx-auto w-full max-w-md">
//             <h2 className="text-xl font-semibold text-center mb-4 text-indigo-600">
//               Payment Receipt
//             </h2>
//             <div className="flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span className="font-medium">First Name: {order.firstName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Last Name: {order.lastName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Total Amount: {order.amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Date:</span>
//                 <span className="">
//                   {order.date
//                     ? new Date(order.date).toLocaleString("en-GB", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })
//                     : ""}
//                 </span>
//               </div>
//             </div>
//             <div className="listing">
//               <h2 className="mt-5 capitalize mb-2">Purchased Items</h2>
//               {order?.menus?.map((items) => (
//                 <ul key={items?.menu?.id}>
//                   <li className="p-2 font-serif mb-2 font-normal text-xl capitalize hover:bg-slate-300 bg-slate-200">
//                     {items?.menu?.name} &nbsp; -- {items?.quantity} -- &nbsp;
//                     {items?.menu?.price}
//                   </li>
//                 </ul>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Thanks;


// trying 30th jan 2025
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";

const Thanks = () => {
  const { createOrder, order, clearCart } = useContext(MenuContext); // Assuming clearCart is a function to reset the cart
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(""); // To store error messages

  useEffect(() => {
    if (transaction_id && tx_ref) {
      // Attempt to create the order
      createOrder(transaction_id, tx_ref)
        .then((response) => {
          console.log("Response from createOrder:", response); // Log the response to debug
          if (response && response.success) {
            // Clear the cart after successful order
            clearCart();
            setLoading(false); // Stop loading once the order is created successfully
          } else {
            // Set error message if order creation fails
            setError("An error occurred while processing your order.");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error creating order:", err);
          setError("An error occurred while processing your order.");
          setLoading(false);
        });
    }
  }, [transaction_id, tx_ref, createOrder, clearCart]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading...</p>
      </div>
    ); // Display loading state while waiting for the order to complete
  }

  return (
    <div className="thanks-content">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <div className="mt-10 flex justify-center">
        <video
          className=" w-[60vw] h-[60vh] rounded-full"
          src="/thanks-vid.mp4"
          loop
          autoPlay
          muted
          controls
        ></video>
      </div>
      <p className="text-center font-bold text-2xl mt-3">
        We appreciate your feedback. Have a great day!
      </p>
      {order && (
        <div className="font-bold text-2xl">
          <div className="receipt bg-gray-100 shadow-md rounded-lg p-6 mt-8 mx-auto w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4 text-indigo-600">
              Payment Receipt
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-medium">First Name: {order.firstName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Name: {order.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount: {order.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span className="">
                  {order.date
                    ? new Date(order.date).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </div>
            <div className="listing">
              <h2 className="mt-5 capitalize mb-2">Purchased Items</h2>
              {order?.menus?.map((items) => (
                <ul key={items?.menu?.id}>
                  <li className="p-2 font-serif mb-2 font-normal text-xl capitalize hover:bg-slate-300 bg-slate-200">
                    {items?.menu?.name} &nbsp; -- {items?.quantity} -- &nbsp;
                    {items?.menu?.price}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thanks;










