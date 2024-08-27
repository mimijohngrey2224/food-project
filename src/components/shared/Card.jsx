import React from 'react';

function Card({ children }) {
  return (
    <div className="border border-purple-400 text-center rounded-lg shadow-xl pb-4 mx-auto w-full lg:w-[350px]">
      {children}
    </div>
  );
}

export default Card;
