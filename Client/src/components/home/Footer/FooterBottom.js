import React, { useState, useEffect } from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  const originalText = "UPSTRIDES";
  const [displayText, setDisplayText] = useState(originalText);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval;
    if (hovering) {
      interval = setInterval(() => {
        setDisplayText(
          originalText
            .split("")
            .map((char) =>
              Math.random() > 0.5
                ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
                : char
            )
            .join("")
        );
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setDisplayText(originalText);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hovering]);

  return (
    <div className="w-full group">
      <div className="max-w-container mx-auto pt-10 pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2025 | Up Strides | All Rights Reserved
        </p>

        <span
          className="block w-full text-[18vw] font-bold text-center cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {displayText}
        </span>
      </div>
    </div>
  );
};

export default FooterBottom;
