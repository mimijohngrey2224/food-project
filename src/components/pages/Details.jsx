import React, { useState, useContext, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuContext } from "../../context/MenuContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  const [selectedItem, setSelectedItem] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleAddToCart = () => {
    if (!selectedItem || !selectedItem.name || !selectedItem.price) {
      alert("Please select an item to add to cart.");
      return;
    }

    const item = {
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: 1,
      img: selectedItem.img,
    };

    addToCart(item);
    console.log(`Added ${selectedItem.name} to cart`, item);
    toast.success(`Added ${selectedItem.name} to cart`)
  };

  const handleSelectChange = (e) => {
    const selectedMenuItem = e.target.value;
    const categoryItem = getCategoryItem(selectedMenuItem);
    setSelectedItem(categoryItem);
  };

  const getCategoryItem = (menuItem) => {
    let menuItemsList = [
      ...menuItems,
      ...breakItems,
      ...naijaItems,
      ...saladItems,
      ...signatureItems,
    ];
    const foundItem = menuItemsList.find((item) => item.name === menuItem);
    return foundItem || {};
  };

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
  }, [menuItems, breakItems, naijaItems, saladItems, signatureItems]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItemsList.length > 0 ? (
  menuItemsList.map(({ name, img, price }) => (
    <div
      key={name}
      className="p-3 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center"
    >
      {/* Check if image URL is valid */}
      {img ? (
        <img
          src={`${url}/uploads/${img}`} // Use `item.img` if this is the correct property
          alt={name}
          className="w-24 h-24 object-cover rounded-lg mb-2"
          onError={(e) => {
            // Handle error if image fails to load
            e.target.onerror = null; // prevents infinite loop in case of broken link
            e.target.src = '/path/to/default-image.jpg'; // fallback image
          }}
        />
      ) : (
        <p>No image available</p>
      )}
      <h3 className="text-sm font-semibold text-center mb-1">{name}</h3>
      <b className="text-xs mb-2">Price: ${price}</b>
      {/* <select
        className="border border-gray-300 rounded-lg p-1 mb-2 text-xs"
        onChange={handleSelectChange}
        defaultValue=""
      >
        
        
      </select> */}
      <b>{name}</b>
      <Button
        className="w-full text-xs bg-purple-500 text-white py-1"
        onClick={handleAddToCart}
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










// import React, { useState, useContext, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Modal, Button } from 'react-bootstrap';
// import { restaurantDetails, starter, breakfast, dishes, nigerian, signatures } from "../data/EcomData";
// import { MenuContext } from "../../context/MenuContext";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function SimpleMap({ location }) {
//   if (!location) return null;

//   return (
//     <MapContainer
//       center={[location.lat, location.lng]}
//       zoom={13}
//       style={{ height: '400px', width: '100%' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[location.lat, location.lng]}>
//         <Popup>{location.address}</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// function Details({ restaurant, onClose }) {
//   const { addToCart } = useContext(MenuContext);
//   const currentRestaurant = restaurantDetails.find(
//     (item) => item.name === restaurant.name
//   );

//   const [selectedItem, setSelectedItem] = useState({});
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [showMap, setShowMap] = useState(false);

//   const handleAddToCart = () => {
//     if (!selectedItem || !selectedItem.name || !selectedItem.price) {
//       alert("Please select an item to add to cart.");
//       return;
//     }

//     const item = {
//       name: selectedItem.name,
//       price: selectedItem.price,
//       quantity: 1,
//       img: selectedItem.img,
//     };

//     addToCart(item);
//     console.log(`Added ${selectedItem.name} to cart`, item);
//   };

//   const handleSelectChange = (e) => {
//     const selectedMenuItem = e.target.value;
//     const categoryItem = getCategoryItem(selectedMenuItem);
//     setSelectedItem(categoryItem);
//   };

//   const getCategoryItem = (menuItem) => {
//     let menuItems = [...starter, ...breakfast, ...dishes, ...nigerian, ...signatures];
//     const foundItem = menuItems.find(item => item.name === menuItem);
//     return foundItem || {};
//   };

//   const handleLocationClick = useCallback(async (address) => {
//     console.log('Clicked address:', address);
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
//       const data = await response.json();
//       console.log('Nominatim response:', data);
//       if (data.length > 0) {
//         const newLocation = {
//           lat: parseFloat(data[0].lat),
//           lng: parseFloat(data[0].lon),
//           address: address
//         };
//         console.log('Setting new location:', newLocation);
//         setSelectedLocation(newLocation);
//         setShowMap(true);
//       } else {
//         console.log('No location data found');
//         const fallbackLocation = {
//           lat: 0,
//           lng: 0,
//           address: "Location not found"
//         };
//         setSelectedLocation(fallbackLocation);
//         setShowMap(true);
//         alert("Couldn't find the exact location. Showing a default map.");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       alert("An error occurred while fetching the location. Please try again.");
//     }
//   }, []);

//   if (!currentRestaurant) {
//     return null;
//   }

//   const { name, img, address, days, hours, menu } = currentRestaurant;

//   return (
//     <div className="flex gap-4">
//       <div className="w-1/2">
//         <img
//           src={img}
//           alt={name}
//           className="w-full rounded-lg shadow-md"
//         />
//         <div className="p-4">
//           <p className="font-bold text-2xl mb-2">{name}</p>
//           <h1 className="text-sm mb-2">
//             <b className="font-bold text-2xl mb-2">Address: </b>
//             <span
//               className="cursor-pointer text-blue-600 hover:underline"
//               onClick={() => handleLocationClick(address)}
//             >
//               {address}
//             </span>
//           </h1>
//           <div>
//             <h3 className="text-lg font-bold mb-2">Days:</h3>
//             <ul>
//               {days.map((day, index) => (
//                 <li key={index} className="text-sm mb-1">{day}</li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-2">Hours:</h3>
//             <ul>
//               {Array.isArray(hours) ? (
//                 hours.map((hour, index) => (
//                   <li key={index} className="text-sm mb-1">{hour}</li>
//                 ))
//               ) : (
//                 <p className="text-sm">Hours not available</p>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/2 bg-white p-6 rounded-lg shadow-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-purple-400 text-2xl hover:text-purple-600 focus:outline-none"
//         >
//           &times;
//         </button>
//         <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
//           <h1 className="text-2xl font-bold mb-4">Food Menu:</h1>
//           {Array.isArray(menu) ? (
//             menu.map((menuItem) => {
//               const categoryItem = getCategoryItem(menuItem);
//               if (!categoryItem) {
//                 return (
//                   <div key={menuItem} className="mb-4">
//                     <h3 className="text-lg font-bold mb-2">{menuItem}</h3>
//                     <p className="text-sm">No details found for this menu item</p>
//                   </div>
//                 );
//               }
//               return (
//                 <div key={menuItem} className="mb-4">
//                   <h3 className="text-lg font-bold mb-2">{menuItem}</h3>
//                   <ul>
//                     {Object.entries(categoryItem.types).map(([type, price]) => (
//                       <li key={type} className="flex justify-between items-center mb-1">
//                         <span className="text-sm">{type.replace(/_/g, ' ')}</span>
//                         <span className="font-bold text-sm">{price}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-sm">Please select here</p>
//           )}
//         </div>
//         <div className="text-center mt-6 font-bold">
//           <label className="text-lg md:text-xl" htmlFor="restaurant">
//             Select your Favorite meal
//           </label>
//           <select
//             id="restaurant"
//             className="block mx-auto mt-2 rounded-lg px-4 py-2 border-2 border-purple-600 focus:outline-none focus:border-purple-800 transition-all duration-300"
//             onChange={handleSelectChange}
//             value={selectedItem.name || ''}
//           >
//             <option value="">Select an item...</option>
//             {[...starter, ...breakfast, ...dishes, ...nigerian, ...signatures].map((item) => (
//               <option key={item.id} value={item.name}>
//                 {item.name} - ₦{item.price}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="text-center mt-4">
//           <button
//             onClick={handleAddToCart}
//             className="bg-purple-400 text-white py-2 px-4 rounded-md"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Map Modal */}
//       <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Restaurant Location</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <SimpleMap location={selectedLocation} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowMap(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Details;
