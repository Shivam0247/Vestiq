import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
// import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
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
    // <div
    //   className="w-full relative group cursor-pointer"
    //   onMouseEnter={() => setHover(true)}
    //   onMouseLeave={() => setHover(false)}
    //   onClick={handleProductClick}
    // >
    //   {/* Product Image */}
    //   <div className="w-full border-[1px] border-b-0 max-h-100 relative overflow-hidden group">
    //     <Image
    //       className="w-full h-full object-contain bg-transparent transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2"
    //       imgSrc={hover ? props.img2 : props.img1}
    //     />
    //   </div>

    //   {/* Product Details */}
    //   <div className="w-full justify-between items-center border-[1px] border-t-0 px-4 py-6 gap-1 flex">
    //     <div className="flex flex-col">
    //       <h2 className="text-lg text-primeColor font-bold">
    //         {props.productName}
    //       </h2>
    //       <p className="text-[#767676] text-[14px]">
    //         INR {parseFloat(props.price).toFixed(2)}
    //       </p>
    //     </div>

    //     {/* Cart Icon */}
    //     <div
    //       className="opacity-0 group-hover:opacity-100 duration-300 transform group-hover:translate-y-0 translate-y-3"
    //       onClick={handleAddToCart}
    //     >
    //       <i className="fa-solid fa-cart-shopping text-2xl hover:scale-110 transform duration-300 hover:text-primeColor"></i>
    //     </div>
    //   </div>
    // </div>

    <Card
      isPressable
      shadow="sm"
      className="group w-[100%]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        handleProductClick(e);
      }}
    >
      <CardBody className="overflow-visible p-0">
        <img
          alt="ss"
          className="w-full object-cover h-full bg-transparent transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2"
          radius="lg"
          shadow="sm"
          src={hover ? props.img2 : props.img1}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <div className="flex flex-col items-start">
          <b className="text-start">{props.productName}</b>
          <p className="text-default-500">INR {props.price}</p>
        </div>

        {/* Cart Icon with Hover Effect */}
        <div
          className="opacity-0 group-hover:opacity-100 duration-300 transform group-hover:translate-y-0 translate-y-3"
          onClick={handleAddToCart}
        >
          <i class="fi fi-rr-shopping-cart-add text-2xl hover:scale-110 transform duration-300 hover:text-primeColor mr-2"></i>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Product;
