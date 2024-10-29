// import React from 'react';
// import whisky from "/whisky.png";
// import whisky1 from "/whisky.png1.jpg";
// import whisky2 from "/whisky.png2.png";
// import whisky3 from "/whisky.png3.jpeg";
// import coke from "/coke.png";
// import cancoke from "/cancoke.jpeg";
// import fanta from "/fanta.webp";
// import canfanta from "/canfanta.webp";
// import water from "/water.jpg";
// import water1 from "/water1.webp";
// import cocktail1 from "/cocktail1.jpg";
// import cocktail2 from "/cocktail2.jpg";


// function Menu() {
//   return (
//     <div className="min-h-screen">
//       {/* <div className="text-center font-bold text-3xl text-purple-400 pt-10">FOOD MENU</div> */}

//       {/* Start of Menu Categories */}
//       <div className="grid grid-cols-3 gap-8 mt-8 mx-4 ml-10">
//         {/* Starter */}
        
       

        
        
//       </div>
//           <div className="text-center font-bold text-3xl text-purple-400 mt-[-1%]">DRINKS & DELICACIES</div>
//     <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky1} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky2} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky3} alt="" />
//     </div>
//     <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={coke} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cancoke} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail1} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={canfanta} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail2} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water1} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={fanta} alt="" />
//         <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water} alt="" />   
//     </div>


//       {/* End of Delicacies */}
//     </div>
//   );
// }

// export default Menu;



import React, { useState } from 'react';
import whisky from "/whisky.png";
import whisky1 from "/whisky.png1.jpg";
import whisky2 from "/whisky.png2.png";
import whisky3 from "/whisky.png3.jpeg";
import coke from "/coke.png";
import cancoke from "/cancoke.jpeg";
import fanta from "/fanta.webp";
import canfanta from "/canfanta.webp";
import water from "/water.jpg";
import water1 from "/water1.webp";
import cocktail1 from "/cocktail1.jpg";
import cocktail2 from "/cocktail2.jpg";

function Menu() {
  const [showImages, setShowImages] = useState(false);

  const toggleImages = () => {
    setShowImages(prevState => !prevState);
  };

  return (
    <div className="min-h-screen">
      <div className="text-center font-bold text-3xl text-purple-400 mt-10">DRINKS & DELICACIES</div>
      <button 
        onClick={toggleImages} 
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
      >
        {showImages ? 'Hide drinks' : 'Show drinks'}
      </button>
      
      {showImages && (
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky1} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky2} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky3} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={coke} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cancoke} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail1} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={canfanta} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail2} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water1} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={fanta} alt="" />
          <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water} alt="" />
        </div>
      )}
    </div>
  );
}

export default Menu;



