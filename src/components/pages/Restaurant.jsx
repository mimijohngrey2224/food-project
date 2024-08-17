import React, { useState, useContext } from "react";
import Card from "../shared/Card";
import Details from "./Details";
import { MenuContext } from '../../context/MenuContext';

function Restaurant() {
  const { restaurantList } = useContext(MenuContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handlePictureClick = (restaurantName) => {
    const foundRestaurant = restaurantList.find((item) => item.name === restaurantName);
    setSelectedRestaurant(foundRestaurant);
  };

  const handleClose = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="my-[20px] mx-[30px]">
      <div className="flex gap-2 flex-wrap px-3 space-y-4">
        {restaurantList.map((item, index) => (
          <Card key={index}>
            <div onClick={() => handlePictureClick(item.name)}>
              <img
                src={item.image || 'fallback-image-url'} // Ensure 'fallback-image-url' is a valid path to an image
                alt={item.name}
                className="w-[350px] h-[280px] rounded-lg shadow-md cursor-pointer"
                onError={(e) => e.target.src = 'fallback-image-url'} // Optional fallback
              />
              <p className="font-bold">{item.name}</p>
              <p>{item.address}</p>
            </div>
            <button
              onClick={() => handlePictureClick(item.name)}
              className="bg-purple-400 text-white p-[10px] rounded mt-[10px]"
            >
              Select
            </button>
          </Card>
        ))}
      </div>
      <div>
        <marquee behavior="" direction="">
          <b>
            Mimi's food ordering service delivery........... let us quench your appetite with our delicious delicacies from top restaurants...
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
    </div>
  );
}

export default Restaurant;

