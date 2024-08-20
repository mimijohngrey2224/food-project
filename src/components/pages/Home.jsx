import React from 'react';
import whisky1 from '/whisky.png3.jpeg';
import abibizimg from '/abibizimg.jpeg';
import Restaurant from './Restaurant';
import whisky from "/whisky.png";
import waitress from "/waitress.jpg";
import waiter from "/waiter.jpg";
import cocktail2 from "/cocktail2.jpg"

function Home() {
  return (
    <div className="bg-purple-200 min-h-screen mb-[-20px]">
      <div className="container mx-auto px-4 py-8">
        <div className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>
          <marquee behavior="" direction="">RESTAURANTS WITH THEIR DELICACIES</marquee>
        </div>

        <div className="mt-10">
          <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-800">
            Our Company
          </h1>
          <div className="mt-6 mx-auto max-w-4xl">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
              Soft lighting, comfortable seating with elbow room, an attentive
              staff, great service, a distinctive, well-thought-out menu,
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
        
        <div className="overflow-x-auto whitespace-nowrap mt-10">
  <div className="flex space-x-4 min-w-max">
    <img
      src={whisky}
      alt="Whisky Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={waitress}
      alt="Waitress Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={whisky1}
      alt="Whisky Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={waiter}
      alt="Waiter Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={cocktail2}
      alt="Cocktail Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={abibizimg}
      alt="Abibiz Image"
      className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    />
  </div>
</div>



      </div>
      <Restaurant />
    </div>
  );
}

export default Home;





