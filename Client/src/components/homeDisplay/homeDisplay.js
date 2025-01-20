import React, { useEffect, useRef } from "react";
import "./homeDisplay.scss";

function HomeDisplay() {
  const containerRefs = useRef([]); // Ref array to store container references
  const hotspotRefs = useRef([]); // Ref array to store individual hotspot references

  useEffect(() => {
    const selectHotspot = (e) => {
      const clickedHotspot = e.target.closest(".lg-hotspot");

      // Toggle the selected class on the clicked hotspot
      if (clickedHotspot) {
        clickedHotspot.classList.toggle("lg-hotspot--selected");
      }

      // Remove the selected class from all other hotspots
      hotspotRefs.current.forEach((hotspot) => {
        if (hotspot !== clickedHotspot) {
          hotspot.classList.remove("lg-hotspot--selected");
        }
      });
    };

    // Add event listeners to all buttons
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach((button) => {
      button.addEventListener("click", selectHotspot);
    });

    // Close the card if clicked outside the hotspot container
    const handleOutsideClick = (e) => {
      // Check if click is outside any hotspot
      if (!e.target.closest(".lg-hotspot")) {
        // Remove 'lg-hotspot--selected' class from all hotspots
        hotspotRefs.current.forEach((hotspot) => {
          hotspot.classList.remove("lg-hotspot--selected");
        });
      }
    };

    // Attach event listener for outside click
    document.addEventListener("click", handleOutsideClick);

    // Cleanup event listeners on unmount
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", selectHotspot);
      });
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="Imgcontainer">
        {/* First Image with Hotspots */}
        <div
          className="lg-container"
          ref={(el) => (containerRefs.current[0] = el)}
        >
          <img className="" src="/images/FrontImg.png" alt="Coffee Desk" />

          <div
            ref={(el) => (hotspotRefs.current[0] = el)}
            style={{ top: "60%", left: "19.9%" }}
            className="lg-hotspot lg-hotspot--top-left"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/image1.jpg"
                alt="Coffee Desk"
                className="w-24 h-24"
              />
              <div>
                <a href="#">
                  <b className="font-bold text-black text-medium hover:underline hover:transition-all duration-300">
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className="text-sm">INR 600.00</label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[1] = el)}
            style={{ top: "16%", left: "90%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/image1.jpg"
                alt="Coffee Desk"
                className="w-24 h-24"
              />
              <div>
                <a href="#">
                  <b className="font-bold text-black text-medium hover:underline hover:transition-all duration-300">
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className="text-sm">INR 600.00</label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[2] = el)}
            style={{ top: "16%", left: "75%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/image1.jpg"
                alt="Coffee Desk"
                className="w-24 h-24"
              />
              <div>
                <a href="#">
                  <b className="font-bold text-black text-medium hover:underline hover:transition-all duration-300">
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className="text-sm">INR 600.00</label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[3] = el)}
            style={{ top: "20%", left: "62%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/image1.jpg"
                alt="Coffee Desk"
                className="w-24 h-24"
              />
              <div>
                <a href="#">
                  <b className="font-bold text-black text-medium hover:underline hover:transition-all duration-300">
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className="text-sm">INR 600.00</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDisplay;
