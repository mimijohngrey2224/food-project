import React, { useRef, useEffect } from 'react';
import whisky1 from '/whisky.png3.jpeg';
import abibizimg from '/abibizimg.jpeg';
import Restaurant from './Restaurant';
import whisky from "/whisky.png";
import waitress from "/waitress.jpg";
import waiter from "/waiter.jpg";
import cocktail2 from "/cocktail2.jpg";
import redwine from "/redwine.jpg";
import hilda from "/hilda.jpeg";
import foodin from "/foodin.jpeg";
import chefa from "/chefa.jpg";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function Home() {
  const scrollContainerRef = useRef(null);

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

  return (
    <div className="bg-purple-200 min-h-screen mb-[-20px]">
      <div className="container mx-auto px-4 py-8">
        <div className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>
          <marquee>RESTAURANTS WITH THEIR DELICACIES</marquee>
        </div>

        <div className="mt-10">
          <h1 className="text-center font-bold text-1xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-800">
            These places have a relaxed, casual vibe.
          </h1>
          <div className="mt-6 mx-auto max-w-4xl">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
            "The atmosphere of these restaurants is unparalleled — a seamless blend of elegance and comfort. The soft, ambient lighting casts a warm glow, while the spacious seating invites relaxation without compromise. The staff, impeccably dressed and attentive, provide service that is both gracious and efficient, ensuring every need is met with a smile. The thoughtfully curated menu offers a delightful range of distinctive flavors, and the food is nothing short of sublime. From expertly crafted drinks to the harmonious blend of soft background music, every element works in perfect synergy to create an unforgettable dining experience. The hospitality here is truly exceptional, making you feel like a cherished guest rather than just a customer."
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
                src={hilda}
                alt="Hilda Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">A Nigerian chef Hilda Bassey, <br /> a Guinness World Record holder <br /> for the longest cooking marathon GWR</p>
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
                <p>List some ingredients and <br /> give an idea of the flavour, <br /> adding emphasis on any <br /> elements that elevate the cocktail</p>
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
            <div className="flex flex-col items-center">
            <img
                src={redwine}
                alt="Redwine Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">Red wine range in hue from <br /> deep, opaque purple to pale <br /> ruby and everything in between</p>
            </div>
            
            <div className="flex flex-col items-center">
            <img
                src={foodin}
                alt="Foodin Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">The arrangement of <br /> food on a plate</p>
            </div>
            <div className="flex flex-col items-center">
            <img
                src={chefa}
                alt="Chefa Image"
                className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              />
              <p className="mt-2 text-center">A chef is that person with <br /> multitasking and creativity, <br /> also paying attention <br /> to customers orders</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="relative mt-4 mb-10">
          <div className="absolute top-[-30px] left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10 cursor-pointer" onClick={scrollLeft}>
            <FaArrowAltCircleLeft size={30} />
          </div>
          <div className="absolute top-[-30px] right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10 cursor-pointer" onClick={scrollRight}>
            <FaArrowAltCircleRight size={30} />
          </div>
        </div>

        {/* Restaurant Component */}
        
      </div>
      <div className=' text-3xl flex text-center justify-center items-center mb-10'>
        <dd ><span>(Select your menu from your favourite restaurants below)</span></dd>
      </div>
      <Restaurant />
    </div>
  );
}

export default Home;
