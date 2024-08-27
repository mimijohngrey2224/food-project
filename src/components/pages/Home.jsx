// import React from 'react';
// import whisky1 from '/whisky.png3.jpeg';
// import abibizimg from '/abibizimg.jpeg';
// import Restaurant from './Restaurant';
// import whisky from "/whisky.png";
// import waitress from "/waitress.jpg";
// import waiter from "/waiter.jpg";
// import cocktail2 from "/cocktail2.jpg"

// function Home() {
//   return (
//     <div className="bg-purple-200 min-h-screen mb-[-20px]">
//       <div className="container mx-auto px-4 py-8">
//         <div className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>
//           <marquee behavior="" direction="">RESTAURANTS WITH THEIR DELICACIES</marquee>
//         </div>

//         <div className="mt-10">
//           <h1 className="text-center font-bold text-1xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-800">
//             These places have a relaxed, casual vibe.
//           </h1>
//           <div className="mt-6 mx-auto max-w-4xl">
//             <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
//               Unbeatable, the atmosphere of these restaurants is unbeatable, soft lighting, comfortable seating with elbow room, an attentive
//               smartly dressed waitresses and waiters with good customers services, great service, a distinctive, well-thought-out menu,
//               hospitality, food, drinks, and soft background music.
//             </p>
//             <h2 className='font-bold text-lg sm:text-xl mt-4'>
//               A genuine fine-dining experience awaits.
//             </h2>
//             <p className='mt-2'>
//               Come for a drink, stay for a meal. Great food and great company.
//               Nothing brings people together like good food.
//             </p>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto whitespace-nowrap scrollbar-hide mt-10">
//   <div className="flex space-x-4 min-w-max">
//     <div className="flex flex-col items-center">
//       <img
//         src={whisky}
//         alt="Whisky Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <p className="mt-2 text-center">Varieties of whisky</p>
//     </div>
//     <div className="flex flex-col items-center">
//       <img
//         src={waitress}
//         alt="Waitress Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <p className="mt-2 text-center">Serves patrons with <br /> food and beverages in a <br /> positive and friendly manner</p>
//     </div>
//     <div className="flex flex-col items-center">
//       <img
//         src={whisky1}
//         alt="Whisky Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <p className="mt-2 text-center">Some tots of whisky in a glass</p>
//     </div>
//     <div className="flex flex-col items-center">
//       <img
//         src={waiter}
//         alt="Waiter Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <p className="mt-2 text-center">A waiter responsible for <br /> taking orders and serving <br /> food and beverages to guests</p>
//     </div>
//     <div className="flex flex-col items-center">
//       <img
//         src={cocktail2}
//         alt="Cocktail Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <div className="mt-2 text-center">
//       <p >List some ingredients and <br /> give an idea of the flavour, <br /> adding emphasis on any <br /> elements that elevate the cocktail</p>
//       </div>
//     </div>
//     <div className="flex flex-col items-center">
//       <img
//         src={abibizimg}
//         alt="Abibiz Image"
//         className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//       />
//       <p className="mt-2 text-center">Guests in a restaurant <br /> waiting to be served</p>
//     </div>
//   </div>
// </div>




//       </div>
//       <Restaurant />
//     </div>
//   );
// }

// export default Home;


// {/* <div class="flex flex-wrap gap-4 justify-center">
//   <div class="flex flex-col items-center">
//     <img
//       src={whisky}
//       alt="Whisky Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">Some bottles of whisky</p>
//   </div>
//   <div class="flex flex-col items-center">
//     <img
//       src={waitress}
//       alt="Waitress Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">Serves patrons with food and beverages in a positive and friendly manner</p>
//   </div>
//   <div class="flex flex-col items-center">
//     <img
//       src={whisky1}
//       alt="Whisky Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">Some tots of whisky in a glass</p>
//   </div>
//   <div class="flex flex-col items-center">
//     <img
//       src={waiter}
//       alt="Waiter Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">A waiter responsible for taking orders and serving food and beverages to guests</p>
//   </div>
//   <div class="flex flex-col items-center">
//     <img
//       src={cocktail2}
//       alt="Cocktail Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">List some ingredients and give an idea of the flavour, adding emphasis on any elements that elevate the cocktail</p>
//   </div>
//   <div class="flex flex-col items-center">
//     <img
//       src={abibizimg}
//       alt="Abibiz Image"
//       className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
//     />
//     <p className="mt-2 text-center">Guests in a restaurant waiting to be served</p>
//   </div>
// </div> */}





import React, { useRef, useEffect, useState } from 'react';
import whisky1 from '/whisky.png3.jpeg';
import abibizimg from '/abibizimg.jpeg';
import Restaurant from './Restaurant';
import whisky from "/whisky.png";
import waitress from "/waitress.jpg";
import waiter from "/waiter.jpg";
import cocktail2 from "/cocktail2.jpg";

function Home() {
  const scrollContainerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show arrows only if scrolling container is not at the ends
      setShowArrows(
        scrollLeft > 0 || (scrollLeft + clientWidth < scrollWidth)
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', updateArrowVisibility);
    
    updateArrowVisibility(); // Initial visibility check

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
    };
  }, []);

  return (
    <div className="bg-purple-200 min-h-screen mb-[-20px]">
      <div className="container mx-auto px-4 py-8">
        <div className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>
          <marquee behavior="" direction="">RESTAURANTS WITH THEIR DELICACIES</marquee>
        </div>

        <div className="mt-10">
          <h1 className="text-center font-bold text-1xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-800">
            These places have a relaxed, casual vibe.
          </h1>
          <div className="mt-6 mx-auto max-w-4xl">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
              Unbeatable, the atmosphere of these restaurants is unbeatable, soft lighting, comfortable seating with elbow room, an attentive
              smartly dressed waitresses and waiters with good customers services, great service, a distinctive, well-thought-out menu,
              hospitality, food, drinks, and soft background music.
            </p>
            <h2 className='font-bold text-lg sm:text-xl mt-4'>
              A genuine fine-dining experience awaits.
            </h2>
            <p className='mt-2'>
              Come for a drink, stay for a meal. Great food and great company.
              Nothing brings people together like good food.
            </p>
          </div>
        </div>
        
        <div className="relative overflow-x-auto whitespace-nowrap scrollbar-hide mt-10" ref={scrollContainerRef}>
          <div className="flex space-x-4 min-w-max">
            <div className="flex flex-col items-center">
              <img
                src={whisky}
                alt="Whisky Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">Varieties of whisky</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={waitress}
                alt="Waitress Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">Serves patrons with <br /> food and beverages in a <br /> positive and friendly manner</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={whisky1}
                alt="Whisky Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">Some tots of whisky in a glass</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={waiter}
                alt="Waiter Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">A waiter responsible for <br /> taking orders and serving <br /> food and beverages to guests</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={cocktail2}
                alt="Cocktail Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <div className="mt-2 text-center">
                <p >List some ingredients and <br /> give an idea of the flavour, <br /> adding emphasis on any <br /> elements that elevate the cocktail</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={abibizimg}
                alt="Abibiz Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">Guests in a restaurant <br /> waiting to be served</p>
            </div>
          </div>
          {/* Conditionally render arrows based on visibility */}
          {showArrows && (
            <>
              <button 
                onClick={scrollLeft}
                className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10">
                &#9664;
              </button>
              <button 
                onClick={scrollRight}
                className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10">
                &#9654;
              </button>
            </>
          )}
        </div>
        <Restaurant />
      </div>
    </div>
  );
}

export default Home;
