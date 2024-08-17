import React from 'react';
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
  return (
    <div className="min-h-screen">
      {/* <div className="text-center font-bold text-3xl text-purple-400 pt-10">FOOD MENU</div> */}

      {/* Start of Menu Categories */}
      <div className="grid grid-cols-3 gap-8 mt-8 mx-4 ml-10">
        {/* Starter */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Starter</button> */}
          {/* <div className="menu-item">
            <h1 className="font-bold">CREAM OF CORN AND CHICKEN SOUP <span>(HOT)</span></h1>
            <p>Shredded chicken in creamy soup</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦2000</button>
          </div> */}
          {/* <div className="menu-item mt-5">
            <h1 className="font-bold">MINESTRONE SOUP</h1>
            <p>Green beans, tomatoes, potatoes, <br /> cabbage, carrot and spaghetti</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦2000</button>
          </div> */}
        </div>

        {/* Breakfast */}
        {/* <div className="menu-category"> */}
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Breakfast</button> */}
          {/* <div className="menu-item">
            <h1 className="font-bold">ENGLISH BREAKFAST</h1>
            <p>Sunny side or scrambled eggs with ham or bacon <br /> and sausage, grilled tomato to garnish, <br /> fresh or toast bread, butter with tea or coffee</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦3500</button>
          </div> */}
          {/* <div className="menu-item mt-5">
            <h1 className="font-bold">CONTINENTAL BREAKFAST</h1>
            <p>Toast bread with tea or coffee</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦2000</button>
          </div> */}
        {/* </div> */}

        {/* Salads */}
        {/* <div className="menu-category">
          <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Salads</button>
          <div className="menu-item">
            <h1 className="font-bold">CHEF SALAD</h1>
            <p>Mixed vegetables, chicken, ham, <br /> eggs with chef special dressing sauce</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦3000</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">CHICKEN SALAD</h1>
            <p>Pan fried shredded chicken and <br /> onion, lettuce, tomatoes cucumber</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦3000</button>
          </div>
        </div> */}

        {/* Signature Dishes */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Signature Dishes</button> */}
          {/* <div className="menu-item">
            <h1 className="font-bold">GRILLED JUMBO PRAWNS</h1>
            <p>Grilled jumbo prawns with parsley lemon sauce</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦6500</button>
          </div> */}
          {/* <div className="menu-item mt-5">
            <h1 className="font-bold">SPECIAL PASTA</h1>
            <p>Pasta shell with diced chicken <br /> and Steak in mushroom sauce and cheese</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦4000</button>
          </div> */}
          {/* <div className="menu-item mt-5">
            <h1 className="font-bold">CLUB SANDWICH</h1>
            <p>Toasted 3 slice bread with coleslaw Mixed <br /> with mayonnaise sauce, Shredded chicken and <br /> eggs as filling <span>(with or without ham)</span></p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦4,500</button>
          </div> */}
        </div>

        {/* Nigerian */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Nigerian</button>
          <div className="menu-item">
            <h1 className="font-bold">Afang Soup</h1>
            <p>With Poundo/Semo/Eba/Wheat</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦8,500</button>
          </div> */}
          {/* <div className="menu-item mt-5">
            <h1 className="font-bold">FISH PEPPER SOUP-CATFISH <br /> OR CROAKER FISH</h1>
            <p><span className="text-red-500">Hot and Spicy</span></p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦7,500</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">JOLLOF RICE/FRIED/WHITE <br /> RICE WITH FISH</h1>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦8,500</button>
          </div> */}
        </div>

        {/* Steak */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Steak</button>
          <div className="menu-item">
            <h1 className="font-bold">STEAK AU POIVRE</h1>
            <p>Peppered steak in black Pepper <br /> sauce <span>(hot and spicy) <span className="italic">(Served in hot plate)</span></span></p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦12,000</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">BEEF STIR FRIED</h1>
            <p>Fillet steak, mushroom, green <br /> Pepper, red pepper, onions</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦10,500</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">STEAK BORDELAISE</h1>
            <p>Steak in red wine and brunoised of vegetable</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦10,500</button>
          </div> */}
        </div>

        {/* Chicken */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Chicken</button>
          <div className="menu-item">
            <h1 className="font-bold">CHICKEN CASSEROLE</h1>
            <p>Cubed boneless chicken with carrots, <br /> marrow, mushroom in white creamy sauce</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦9000</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">CHICKEN FINGERS</h1>
            <p>Boneless shredded chicken and pan fried</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦7500</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">CHICKEN AND CHIPS</h1>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦7,500</button>
          </div> */}
        </div>

        {/* Burgers */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Burgers</button>
          <div className="menu-item">
            <h1 className="font-bold">BEEF BURGER</h1>
            <p>Burger bread with fresh lettuce, <br /> fresh tomatoes and grilled burger beef <br /> patties as filling Served with crispy French fries.</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦9000</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">CHEESE BURGER</h1>
            <p>Burger bread with fresh lettuce, <br /> onions, cucumber cheese with grilled burger <br /> beef patties as filling served with crispy French fries</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦8000</button>
          </div> */}
        </div>

        {/* Sandwiches */}
        <div className="menu-category">
          {/* <button className="bg-purple-400 text-white py-3 px-6 rounded-lg text-2xl mb-5 hover:bg-purple-600 transition duration-300 ease-in-out">Sandwiches</button>
          <div className="menu-item">
            <h1 className="font-bold">HAM AND CHEESE SANDWICH</h1>
            <p>Toasted 2 slice bread with ham and cheese as filling</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦6,500</button>
          </div>
          <div className="menu-item mt-5">
            <h1 className="font-bold">TUNA SANDWICH</h1>
            <p>Toasted 2 slice bread with tuna fish, tomatoes and lettuce as filling</p>
            <button className="bg-purple-400 text-white py-1 px-4 rounded-full mt-2">₦6,500</button>
          </div> */}
        </div>
      </div>
      {/* End of Menu Categories */}

      {/* Delicacies */}
          <div className="text-center font-bold text-3xl text-purple-400 mt-[-3%]  ">DRINKS & DELICACIES</div>
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky1} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky2} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={whisky3} alt="" />
    </div>
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={coke} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cancoke} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail1} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={canfanta} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={cocktail2} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water1} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={fanta} alt="" />
        <img className="w-full md:w-[calc(50% - 8px)] lg:w-[calc(25% - 10px)] max-w-[350px] h-[300px] rounded-lg shadow-md transform hover:scale-105 transition duration-300" src={water} alt="" />   
    </div>


      {/* End of Delicacies */}
    </div>
  );
}

export default Menu;
