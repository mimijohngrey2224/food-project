import React, { useState, useContext, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuContext } from "../../context/MenuContext";
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

// Component for displaying the map
function SimpleMap({ location }) {
  if (!location) return null;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>{location.address}</Popup>
      </Marker>
    </MapContainer>
  );
}

function Details({ restaurant, onClose }) {
  const { addToCart, menuItems, breakItems, naijaItems, saladItems, signatureItems, url } = useContext(MenuContext);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);


  const handleAddToCart = (item) => {
    toast.success(`Added ${item.name} to cart`);
    console.log(item._id, 1, item)
    if (!item || !item._id || !item.name || !item.price) {
      alert("Item details are missing.");
      return;
    }

    // Ensure item format is consistent with what MenuContext expects
    const cartItem = {
      _id: item._id, // Assuming item has an _id field
      name: item.name,
      price: item.price,
      img: item.img || '/path/to/default-image.jpg', // Default image if not available
    };

    // Call addToCart from MenuContext
    addToCart(item._id, 1, item)
      .then(() => {
        // toast.success(`Added ${item.name} to cart`);
      })
      .catch((error) => {
        console.error('Failed to add item to cart:', error);
        toast.error('Failed to add item to cart');

      });
  };

  // const handleAddToCart = (item) => {
  //   addToCart(item._id, 1, item); //pass product ID, quantity, and product details
  //   toast.success(`Added ${item.name} to cart`);
  //   console.log(item.id, 1, item);
  // };

  const handleLocationClick = useCallback(async (address) => {
    console.log("Clicked address:", address);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1`
      );
      const data = await response.json();
      console.log("Nominatim response:", data);
      if (data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: address,
        };
        console.log("Setting new location:", newLocation);
        setSelectedLocation(newLocation);
        setShowMap(true);
      } else {
        console.log("No location data found");
        const fallbackLocation = {
          lat: 0,
          lng: 0,
          address: "Location not found",
        };
        setSelectedLocation(fallbackLocation);
        setShowMap(true);
        alert("Couldn't find the exact location. Showing a default map.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching the location. Please try again.");
    }
  }, []);

  const { name, image, address, operating_days = [], operating_hours = [], menu = [] } = restaurant || {};

  // Combine all menu items into one list for display
  const menuItemsList = [
    ...menuItems,
    ...breakItems,
    ...naijaItems,
    ...saladItems,
    ...signatureItems,
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        {restaurant ? (
          <div>
            <img
              src={image}
              alt={name}
              className="w-full rounded-lg shadow-md mb-4"
            />
            <p className="font-bold text-2xl mb-2">{name}</p>
            <h1 className="text-sm mb-2">
              <b className="font-bold text-xl">Address: </b>
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleLocationClick(address)}
              >
                {address}
              </span>
            </h1>
          </div>
        ) : (
          <p>No restaurant information available.</p>
        )}

        <div>
          <h3 className="text-lg font-bold mb-2">Days:</h3>
          <ul>
            {operating_days.length > 0 ? (
              operating_days.map((day, index) => (
                <li key={index} className="text-sm mb-1">
                  {day}
                </li>
              ))
            ) : (
              <p className="text-sm">Operating days not available</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Hours:</h3>
          <ul>
            {operating_hours.length > 0 ? (
              operating_hours.map((hour, index) => (
                <li key={index} className="text-sm mb-1">
                  {hour}
                </li>
              ))
            ) : (
              <p className="text-sm">Hours not available</p>
            )}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-purple-400 text-2xl hover:text-purple-600 focus:outline-none"
        >
          &times;
        </button>
        <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
          <h1 className="text-xl font-bold mb-4">Food Menu:</h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menuItemsList.length > 0 ? (
              menuItemsList.map((item) => (
                <div
                  key={item._id} // Use _id for key
                  className="p-1 md:p-1 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center"
                >
                  {item.img ? (
                    <img
                      src={`${url}/uploads/${item.img}`}
                      alt={item.name}
                      className="w-full md:w-24 h-24 object-cover rounded-lg mb-2"
                      // className="w-24 h-24 object-cover rounded-lg mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/path/to/default-image.jpg';
                      }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <p className="text-xs font-semibold text-center mb-1">{item.name}</p>
                  <b className="text-xs mb-2">Price:  ₦{item.price}</b>
                  <b className="text-gray-600 block text-sm sm:text-base">₦{formatPrice(item.price)}</b>
                  <Button
                    className="w-full text-xs bg-purple-500 text-white py-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm">Menu items not available</p>
            )}
          </div>
        </div>
        <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Restaurant Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SimpleMap location={selectedLocation} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMap(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Details;
