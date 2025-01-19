import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${props._id}`, {
      state: {
        item: {
          _id: props._id,
          name: props.productName,
          image: props.img1,
          badge: props.badge,
          price: props.price,
          colors: props.color,
          description: props.description,
        },
      },
    });
  };

  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent
    props.onCartClick({
      _id: props._id,
      name: props.productName,
      image: props.img1,
      badge: props.badge,
      price: props.price,
      colors: props.color,
      description: props.description,
    }); // Pass product details to parent
  };

  return (
    <div
      className="w-full relative group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="max-w-80 max-h-100 relative overflow-hidden transition-transform duration-500 transform group-hover:scale-105 group-hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]">
        <Image
          className="w-full h-full transition-transform duration-500 ease-in-out"
          imgSrc={hover ? props.img2 : props.img1}
        />
      </div>

      {/* Product Details */}
      <div className="max-w-80 justify-between items-center border-[1px] border-t-0 px-4 py-6 gap-1 flex">
        <div className="flex flex-col">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">
            INR {parseFloat(props.price).toFixed(2)}
          </p>
        </div>

        {/* Cart Icon */}
        <div
          className="opacity-0 group-hover:opacity-100 duration-300 transform group-hover:translate-y-0 translate-y-3"
          onClick={handleAddToCart}
        >
          <i className="fa-solid fa-cart-shopping text-2xl hover:scale-110 transform duration-300 hover:text-primeColor"></i>
        </div>
      </div>
    </div>
  );
};

export default Product;
