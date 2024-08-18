import starter2 from "/starter2.jpeg"
import starter3 from "/starter3.jpeg"
import starter4 from "/starter4.png"
import starters from "/starters.jpeg"
import breakfast01 from "/breakfast-food.jpg"
import breakfast02 from "/breakfast.jpg"
import breakfast2 from "/breakfast2.jpg"
import breakfast42 from "/breakfast4.jpg"
import salad from "/salad.jpg" 
import salad1 from "/salad1.jpg"
import salad2 from "/salad2.jpg"
import salad3 from "/salad3.jpg"
import ogbonno from "/ogbonno.jpg"
import snail from "/snail.jpg"
import okro from "/okro.jpg"
import peppersoup from"/peppersoup.jpg"
import chicken from "/chicken and chips.jpeg"
import grillprawns from "/grillprawn.jpeg"
import spaghettibolognese from "/spaghetti-bolognese-sq.webp"
import small from "/small-chops-2.jpg"
import abibis from "/abibis.jpeg"
import terraform from "/terraform.jpeg"
import drive from "/drive-thru.jpeg"
import calabaaroma from "/calabaaroma.jpeg"
import lekki from "/lekki.jpg"
import skybox from "/skybox-1.jpeg"
import tantanlizer from "/tantanlizer.jpeg"
import theplace from "/theplace.png"



export const starter = [
    {
        id: 1,
        name: "veg starter",
        img: starter2,
        price: 2000
        
    },
    {
        id: 2,
        name: "Dinner Party Starter",
        img: starter3,
        price: 2000   
    },
    {
        id: 3,
        name: "Best Dinner Party Starter",
        img: starter4,
        price: 2000    
    },
    {
        id: 4,
        name: "Nickysredhots starter",
        img: starters,
        price: 2000  
    }   
  
]

export const breakfast = [
    {
        id: 5,
        name: "Binkley Breakfast",
        img: breakfast01,
        price: 3000   
    },
    {
        id: 6,
        name: "American Breakfast",
        img: breakfast02,
        price: 3000
    },
    {
        id: 7,
        name: "Pan Simple & Healthy B/fast",
        img: breakfast2,
        price: 3000
    },
    {
        id: 8,
        name: "Healthy Breakfast",
        img: breakfast42,
        price: 3000
    }
]

export const dishes = [
    {
        id: 9,
        name: "Pasta Salad",
        img: salad,
        price: 4000   
    },
    {
        id: 10,
        name: "Chef Salad",
        img: salad1,
        price: 4000
    },
    {
        id: 11,
        name: "Fruit Salad",
        img: salad2,
        price: 4000
    },
    {
        id: 12,
        name: "Italian Salad",
        img: salad3,
        price: 4000
    }  
]

export const nigerian = [
    {
        id: 13,
        name: "Ogbonno Soup",
        img: ogbonno,
        price: 5000   
    },
    {
        id: 14,
        name: "Pepper Snail",
        img: snail,
        price: 5000
    },
    {
        id: 15,
        name: "Okro Soup",
        img: okro,
        price: 5000
    },
    {
        id: 16,
        name: "Goat Pepper Soup",
        img: peppersoup,
        price: 5000
    }   
]

export const signatures = [
    {
        id: 17,
        name: "Chicken and Chips",
        img: chicken,
        price: 6000   
    },
    {
        id: 18,
        name: "Grill Prawns",
        img:  grillprawns,
        price: 6000
    },
    {
        id: 19,
        name: "Spaghetti Bolognese",
        img: spaghettibolognese,
        price: 6000
    },
    {
        id: 20,
        name: "Small Chop",
        img: small,
        price: 6000
    }

]

export const restaurant = [
    {
        name: "ABIBIZ RESTAURANT",
        img: abibis,
        address: "Murtala Muhammed International Airport Ikeja Lagos"
        
    },
    {
        name: "TERRAFORM",
        img: terraform,
        address: "14 Wole Olateju Crescent Lekki"   
    },
    {
        name: "SKYBOX RESTAURANT AND BAR",
        img: skybox,
        address: "36 Rasheed Alaba Williams Street, Lekki Phase I, Lagos 105102, Lagos"
           
    },
    {
        name: "CALABAR AROMA",
        img: calabaaroma,
        address: "24 Adebayo Doherty Road, Lekki Phase 1, Lagos" 
    }, 
    {   
        name: "DRIVE-THRU",
        img: drive,
        address: "11b Bishop Aboyade Cole Str, Lekki Lagos"   
        
    },
    {
        name: "WAKAME RESTAURANT",
        img: lekki,
        address: "122 Joel Ogunnaike Street Lagos"   
    },
    {
        
        name: "TANTANLIZER",
        img: tantanlizer,
        address: "22 Allen Avenue Ikeja Lagos"   
    },
    {
        name: "THE PLACE",
        img: theplace,
        address: "23 Isaac John Street Ikeja GRA Lagos" 
    }     
  
]

export const restaurantDetails = [
    {
      name: "ABIBIZ RESTAURANT",
      img: abibis,
      address: "Murtala Mohammed International Airport Ikeja Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
      
    },
    {
      name: "TERRAFORM",
      img: terraform,
      address: "14 Wole Olateju Crescent Lekki",
      days: ["Monday - Sunday"],
      hours: ["8am - 11pm"]
    },
    {
      name: "SKYBOX RESTAURANT AND BAR",
      img: skybox,
      address: "36 Rasheed Alaba Williams Street, Lekki Phase I, Lagos 105102, Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
    },
    {
      name: "CALABAR AROMA",
      img: calabaaroma,
      address: "24 Adebayo Doherty Road, Lekki Phase 1, Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
    },
    {
      name: "DRIVE-THRU",
      img: drive,
      address: "11b Bishop Aboyade Cole Str, Lekki Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
    },
    {
      name: "WAKAME RESTAURANT",
      img: lekki,
      address: "122 Joel Ogunnaike Street Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
      
    },
    {
      name: "TANTANLIZER",
      img: tantanlizer,
      address: "22 Allen Avenue Ikeja Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
    },
    {
      name: "THE PLACE",
      img: theplace,
      address: "23 Isaac John Street Ikeja GRA Lagos",
      days: ["Monday - Sunday"],
      hours: ["8am - 10pm"]
    }
  ];
  
   
  export const category = [
    {
      name: "Salad",
      types: {
        vegetarian_salad: "6000",
        fruit_salad: "4000",
        chef_salad: "4000"
      }
    },
    {
      name: "Cake",
      types: {
        chocolate_cake: "5000",
        vanilla_cake: "4500",
        red_velvet: "5500"
      }
    },
    {
      name: "Dessert",
      types: {
        ice_cream: "3000",
        tiramisu: "4500",
        cheesecake: "4000"
      }
    },
    {
      name: "Pasta",
      types: {
        spaghetti_bolognese: "7000",
        fettuccine_alfredo: "6500",
        penne_arrabbiata: "6000"
      }
    }
  ];
  

