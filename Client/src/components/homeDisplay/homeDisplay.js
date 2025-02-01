import React, { useEffect, useRef, useState } from "react";
import "./homeDisplay.scss";

function HomeDisplay() {
  const containerRefs = useRef([]); // Ref array to store container references
  const hotspotRefs = useRef([]); // Ref array to store individual hotspot references

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen width on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 761) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Run once on mount
    handleResize();

    // Add event listener on resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          className="lg-container "
          ref={(el) => (containerRefs.current[0] = el)}
        >
          <picture>
            <source
              srcSet="/images/FrontImgSmall.png"
              media="(max-width: 761px)"
            />
            <img className="" src="/images/FrontImg.png" alt="Coffee Desk" />
          </picture>

          <div
            ref={(el) => (hotspotRefs.current[0] = el)}
            style={{ top: "60%", left: "19.9%" }}
            className="lg-hotspot lg-hotspot--top-left hide-at-761"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/1.png"
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
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--top-left"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_1`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/2.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[2] = el)}
            style={{ top: "16%", left: "75%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--top-left"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_2`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/3.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[1] = el)}
            style={{ top: "16%", left: "90%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--top-right"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_3`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/4.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[5] = el)}
            style={{ top: "50%", left: "75%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--bottom-left"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_4`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/5.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[6] = el)}
            style={{ top: "50%", left: "90%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--bottom-right"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_5`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/6.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[4] = el)}
            style={{ top: "80%", left: "62%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--bottom-left"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_6`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/7.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[7] = el)}
            style={{ top: "75%", left: "77%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--bottom-left"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_7`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/8.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (hotspotRefs.current[8] = el)}
            style={{ top: "80%", left: "90%" }}
            className={`lg-hotspot ${
              isSmallScreen
                ? "lg-hotspot--bottom-right"
                : "lg-hotspot--bottom-right"
            } adjust-position-761_8`}
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label flex justify-center items-center">
              <img
                src="/images/FrontTshirts/9.png"
                alt="Coffee Desk"
                className={`${isSmallScreen ? "w-20 h-20" : "w-24 h-24"}`}
              />
              <div className="pr-1">
                <a href="#">
                  <b
                    className={`font-bold text-black ${
                      isSmallScreen ? "text-sm" : "text-base"
                    } hover:underline hover:transition-all duration-300`}
                  >
                    The Celestial Kingdom
                  </b>
                </a>
                <br />
                <label className={` ${isSmallScreen ? "text-xs" : "text-sm"}`}>
                  INR 600.00
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDisplay;
