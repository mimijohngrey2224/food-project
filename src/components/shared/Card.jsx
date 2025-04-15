// import React from 'react';

// function Card({ children }) {
//   return (
//     <div className="border border-purple-400 text-center rounded-lg shadow-xl pb-4 mx-auto w-full lg:w-[350px]">
//       {children}
//     </div>
//   );
// }

// export default Card;

import React from 'react';

function Card({ children }) {
  return (
    <div className="border border-purple-400 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
      {children}
    </div>
  );
}

export default Card;
