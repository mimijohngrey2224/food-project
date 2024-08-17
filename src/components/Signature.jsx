import React, { useContext } from "react";
import Card from "./shared/Card";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signature() {
  const { signatureItems, addToCart } = useContext(MenuContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    console.log(`Added ${item.name} to cart`);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div className="my-5 mx-2 sm:mx-5 lg:mx-20">
      <h1 className="mb-5 text-purple-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
        Signature Dishes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {signatureItems.map((item) => (
          <Card key={item._id}>
            <div to={`/details/${item._id}`} className="block relative">
              <img
                src={`http://localhost:3000/uploads/${item.img}`} // Adjust URL as needed
                alt={item.name}
                className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover transition duration-300 transform hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <p className="text-white text-base sm:text-lg font-bold">View Details</p>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <p className="font-bold text-base sm:text-lg">{item.name}</p>
              <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              <p className="text-gray-600 text-sm sm:text-base font-bold">₦{item.price}</p>
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

export default Signature;
