import React from "react";
import thax from "/thax.jpg";


// import thax from './path/to/thax.png'; // Update the path according to your project structu

const Thanks = () => {
  return (
    
      <div className="thanks-content">
        <div className="mt-10 flex justify-center">
        {/* <img src={thax} alt="Thank you" className="w-[600px] h-[450px]" /> */}
        <video className=" w-[60vw] h-[60vh] rounded-full" src="/thanks-vid.mp4" loop autoPlay muted controls></video>
        </div>
        {/* <h1 className="font-bold text-center text-2xl">Thank You!</h1> */}
        <p className="text-center font-bold text-2xl mt-3">
          We appreciate your feedback. Have a great day!
        </p>
      </div>
  );
};

export default Thanks;



