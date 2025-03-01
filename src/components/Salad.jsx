import React, { useContext } from "react";
import Card from "./shared/Card";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Utility function to format numbers into thousands (K) or millions (M)
const formatPrice = (price) => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;  // For millions
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;  // For thousands
  }
  return price.toString();  // For values less than 1,000
};

function Salad() {
  const { saladItems, addToCart } = useContext(MenuContext);

  const handleAddToCart = (item) => {
    addToCart(item._id, 1, item); // Pass product ID, quantity, and product details
    toast.success(`Added ${item.name} to cart yes`);
    console.log(item._id, 1, item)
  };

  return (
    <div className="my-5 mx-2 sm:mx-5 lg:mx-20">
      <h1 className="mb-5 text-purple-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
        Salads
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {saladItems.map((item) => (
          <Card key={item._id}>
            <div className="block relative">
              <img
                src={`https://food-project-api.onrender.com/uploads/${item.img}`}
                alt={item.name}
                className="w-[350px] h-[280px] sm:h-48 md:h-52 lg:h-56 object-cover transition duration-300 transform hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <p className="text-white text-base sm:text-lg font-bold">View Details</p>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <p className="font-bold text-base sm:text-lg">{item.name}</p>
              <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              <b className="text-gray-600 block text-sm sm:text-base">₦{formatPrice(item.price)}</b>
              <button
                className="bg-purple-400 text-white p-2 rounded mt-2 w-full text-sm sm:text-base"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Salad;



// import React, { useContext } from "react";
// import Card from "./shared/Card";
// import { Link } from "react-router-dom";
// import { MenuContext } from "../context/MenuContext";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';


// // Utility function to format numbers into thousands (K) or millions (M)
// const formatPrice = (price) => {
//   if (price >= 1000000) {
//     return `${(price / 1000000).toFixed(1)}M`;  // For millions
//   }
//   if (price >= 1000) {
//     return `${(price / 1000).toFixed(1)}K`;  // For thousands
//   }
//   return price.toString();  // For values less than 1,000
// };

// function Salad() {
//   const { saladItems, addToCart } = useContext(MenuContext);

//   const handleAddToCart = (item) => {
//     addToCart(item._id, 1, item); // Here, 1 is the default quantity
//     console.log(`Added ${item.name} to cart`);
//     toast.success(`Added ${item.name} to cart`);
//   };

//   return (
//     <div className="my-5 mx-2 sm:mx-5 lg:mx-20">
//       <h1 className="mb-5 text-purple-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
//         Salads
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
//         {saladItems.map((item) => (
//           <Card key={item._id}>
//             <div to={`/details/${item._id}`} className="block relative">
//               <img
//                 src={`https://food-project-api.onrender.com/uploads/${item.img}`} // Adjust URL as needed
//                 alt={item.name}
//                 className="w-[350px] h-[280px] sm:h-48 md:h-52 lg:h-56 object-cover transition duration-300 transform hover:scale-105 rounded-lg"
//               />
//               <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
//                 <p className="text-white text-base sm:text-lg font-bold">View Details</p>
//               </div>
//             </div>
//             <div className="p-2 sm:p-4">
//               <p className="font-bold text-base sm:text-lg">{item.name}</p>
//               <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
//               {/* <p className="text-gray-600 text-sm sm:text-base font-bold">₦{item.price}</p> */}
//               <b className="text-gray-600 block text-sm sm:text-base">₦{formatPrice(item.price)}</b>
//               <button
//                 className="bg-purple-400 text-white p-2 rounded mt-2 w-full text-sm sm:text-base"
//                 onClick={() => handleAddToCart(item)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Salad;
