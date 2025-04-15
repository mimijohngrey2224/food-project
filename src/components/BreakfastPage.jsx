

import React, { useState, useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import Card from "./shared/Card";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const formatPrice = (price) => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  return price.toString();
};

function BreakfastPage() {
  const { breakItems, addToCart } = useContext(MenuContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can adjust this number

  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = breakItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(breakItems.length / itemsPerPage);

  const handleAddToCart = (item) => {
    addToCart(item._id, 1, item);
    toast.success(`Added ${item.name} to cart`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="my-5 mx-2 sm:mx-5 lg:mx-20">
      <h1 className="mb-5 text-purple-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
        Continental Breakfast
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Card key={item._id} className="relative">
              <div className="relative">
                <img
                  src={`https://food-project-api.onrender.com/uploads/${item.img}`}
                  alt={item.name}
                  className="w-full h-[280px] sm:h-48 md:h-52 lg:h-56 object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-base sm:text-lg font-bold">View Details</p>
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <p className="font-bold text-base sm:text-lg">{item.name}</p>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                <b className="text-gray-600 block text-sm sm:text-base">₦{formatPrice(item.price)}</b>
                <button
                  className="bg-purple-400 text-white p-2 rounded mt-2 w-full text-sm sm:text-base hover:bg-purple-500 transition-colors duration-300"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No breakfast items available</p>
        )}
      </div>

      {/* Pagination Controls */}
      {breakItems.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 rounded ${currentPage === number ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {number}
            </button>
          ))}
          
          {/* <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span> */}
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BreakfastPage;
