
import React, { useState, useContext } from "react";
import Card from "../shared/Card";
import Details from "./Details";
import { MenuContext } from '../../context/MenuContext';
import Container from "../shared/Container";

function Restaurant() {
  const { restaurantList } = useContext(MenuContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 6;

  // Get current restaurants
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurantList.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(restaurantList.length / restaurantsPerPage);

  const handlePictureClick = (restaurantName) => {
    const foundRestaurant = restaurantList.find((item) => item.name === restaurantName);
    setSelectedRestaurant(foundRestaurant);
  };

  const handleClose = () => {
    setSelectedRestaurant(null);
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
    <Container className="mt-8">
      <div className="grid mb-5 grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center flex-wrap px-3 space-y-4">
        {currentRestaurants.map((item, index) => (
          <Card key={index}>
            <div className="w-full h-full" onClick={() => handlePictureClick(item.name)}>
              <img
                src={item.image || 'fallback-image-url'}
                alt={item.name}
                className="w-full h-[280px] rounded-lg shadow-md cursor-pointer"
                onError={(e) => e.target.src = 'fallback-image-url'}
              />
            </div>
            <div className="p-2 md:p-3">
              <p className="font-bold">{item.name}</p>
              <p className="">{item.address}</p>
              <button
                onClick={() => handlePictureClick(item.name)}
                className="bg-purple-400 text-white p-[10px] rounded mt-[10px]"
              >
                Select
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination with Prev/Next buttons */}
      {restaurantList.length > restaurantsPerPage && (
        <div className="flex justify-center items-center mt-4 mb-8 gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-400 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <div>
        <marquee className="mb-4" behavior="" direction="">
          <b>
            Food Courier's Service Delivery........... let us quench your appetite with our delicious delicacies from top restaurants...
          </b>
        </marquee>
      </div>
      
      {selectedRestaurant && (
        <div className="fixed inset-0 flex items-center justify-center z-[30] bg-gray-900 bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-purple-400 text-2xl hover:text-purple-600 focus:outline-none"
            >
              X 
            </button>
            <Details restaurant={selectedRestaurant} onClose={handleClose} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Restaurant;