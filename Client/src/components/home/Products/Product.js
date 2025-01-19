import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  // State to manage hover
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const _id = props.productName;

  // Function to create a URL-friendly ID string
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;

  // Function to navigate to product details page
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  return (
    <div
      className="w-full relative group cursor-pointer" // Outer wrapper for the product card
      onMouseEnter={() => setHover(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setHover(false)} // Reset hover state to false on mouse leave
      onClick={handleProductDetails}
    >
      {/* Product Image */}
      <div
        className="max-w-80 max-h-100 relative overflow-hidden transition-transform duration-500 transform group-hover:scale-105 group-hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]" // Scale and glow effect on hover
      >
        <div>
          {/* Toggle between img1 and img2 based on hover state */}
          <Image
            className="w-full h-full transition-transform duration-500 ease-in-out"
            imgSrc={hover ? props.img2 : props.img1} // Change image on hover
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-80 justify-between items-center border-[1px] border-t-0 px-4 py-6 gap-1 flex">
        <div className="flex flex-col">
          {/* Product Title */}
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-primeColor font-bold">
              {props.productName}
            </h2>
          </div>

          {/* Product Price */}
          <div className="flex items-center justify-between font-titleFont">
            <p className="text-[#767676] text-[14px]">
              INR {parseFloat(props.price).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Cart Icon: Visible only on hover and includes scaling effect */}
        <div className="opacity-0 group-hover:opacity-100 duration-300 transform group-hover:translate-y-0 translate-y-3">
          <i
            className="fa-solid fa-cart-shopping text-2xl hover:scale-110 transform duration-300 hover:text-primeColor" // Scale and color effect on hover
            onClick={(event) => {
              event.stopPropagation(); // Prevent click from propagating to parent
              dispatch(
                addToCart({
                  _id: props._id,
                  name: props.productName,
                  quantity: 1,
                  image: props.img1,
                  badge: props.badge,
                  price: props.price,
                  colors: props.color,
                })
              );
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Product;
