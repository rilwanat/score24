import React from "react";
import "./cssFx/MarqueeText.css"; // Import the CSS for animations

const MarqueeText = ({ text }) => {
  return (
    <div className="scroll-container px-8 md:px-4 lg:px-16 xl:px-24 2xl:px-80 flex items-center bg-scDarkerBackground text-white">
      <div className="scroll-text">
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;
