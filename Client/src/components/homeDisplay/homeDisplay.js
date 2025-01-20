import React, { useEffect, useRef } from "react";
import "./homeDisplay.scss";

function HomeDisplay() {
  const containerRefs = useRef([]); // Ref array to store container references

  useEffect(() => {
    const selectHotspot = (e) => {
      const clickedHotspot = e.target.parentElement;
      const container = clickedHotspot.parentElement;

      // Only include hotspots within the same container (image)
      const hotspots = container.querySelectorAll(".lg-hotspot");
      hotspots.forEach((hotspot) => {
        if (hotspot === clickedHotspot) {
          hotspot.classList.toggle("lg-hotspot--selected");
        } else {
          hotspot.classList.remove("lg-hotspot--selected");
        }
      });
    };

    // Add event listeners to all buttons
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach((button) => {
      button.addEventListener("click", selectHotspot);
    });

    // Cleanup event listeners on unmount
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", selectHotspot);
      });
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
            style={{ top: "60%", left: "19.9%" }}
            className="lg-hotspot lg-hotspot--top-left"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label">
              <h4>This is the title</h4>
              <p>
                This is some text that goes in the label. It describes the item.
                Here is a{" "}
                <a
                  href="/abcretrograde/pens/showcase"
                  target="_blank"
                  rel="noreferrer"
                >
                  link
                </a>{" "}
                to another page.
              </p>
            </div>
          </div>

          <div
            style={{ top: "16%", left: "90%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label">
              <h4>Keyboard</h4>
              <p>
                A keyboard has letters, and it can write letters. Let's say some
                more things about keyboards so the text wraps to multiple lines.
              </p>
            </div>
          </div>

          <div
            style={{ top: "16%", left: "75%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label">
              <h4>Keyboard</h4>
              <p>
                A keyboard has letters, and it can write letters. Let's say some
                more things about keyboards so the text wraps to multiple lines.
              </p>
            </div>
          </div>

          <div
            style={{ top: "20%", left: "62%" }}
            className="lg-hotspot lg-hotspot--top-right"
          >
            <div className="lg-hotspot__button"></div>
            <div className="lg-hotspot__label">
              <h4>Keyboard</h4>
              <p>
                A keyboard has letters, and it can write letters. Let's say some
                more things about keyboards so the text wraps to multiple lines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDisplay;
