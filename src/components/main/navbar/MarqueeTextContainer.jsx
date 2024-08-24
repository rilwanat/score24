import React, { useEffect, useState } from "react";
import "../cssFx/MarqueeText.css"; // Import the CSS for animations

const MarqueeTextContainer = () => {
    const sampleTexts = [
        "Welcome to Score24!",
        "Live Scores & Updates 24/7!",
        "Catch all the latest game highlights!",
        "Exclusive deals on sports gear!",
        "Upcoming matches: Check our schedule!",
        "Get real-time notifications for your favorite teams!"
      ];
      

  const [text, setText] = useState("");

  useEffect(() => {
    // Concatenate the texts with a separator
    const concatenatedText = sampleTexts.join("\u00A0\u00A0\u00A0 • \u00A0\u00A0\u00A0");
    setText(concatenatedText);
  }, []);

  return (
    <div className="scroll-container px-8 md:px-4 lg:px-16 xl:px-24 2xl:px-80 flex items-center bg-scDarkerBackground text-white">
      <div className="scroll-text-wrapper">
        <div className="scroll-text ">
          {text}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTextContainer;
