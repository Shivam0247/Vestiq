import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
// import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Chip } from "@heroui/chip";
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
          price: props.price,
          Description: props.Description,
          Features: props.Features,
          CompositionAndCare: props.CompositionAndCare,
          sizes: props.sizes,
          SizeChart: props.SizeChart,
        },
      },
    });
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    props.onCartClick({
      _id: props._id,
      name: props.productName,
      image: props.img1,
      price: props.price,
      sizes: props.sizes,
    });
  };

  return (
    <div onClick={handleProductClick} className="h-full">
      <Card
        // isPressable
        shadow="sm"
        className="group w-full h-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardBody className="overflow-visible p-0">
          <Chip
            variant="flat"
            className="absolute top-3 right-5 bg-gradient-to-r from-[#8f8f8f] to-[#373d49] text-white rounded-full px-3 py-1 text-sm font-medium"
          >
            {props.Status}
          </Chip>

          <img
            alt={props.productName}
            className="w-auto max-w-full max-h-full object-cover bg-transparent transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2"
            radius="lg"
            shadow="sm"
            src={hover ? props.img2 : props.img1}
          />
        </CardBody>

        <CardFooter className="text-small justify-between">
          <div className="flex flex-col items-start">
            <b className="text-start">{props.productName}</b>
            <p className="text-default-500">INR {props.price}</p>
          </div>

          {/* Cart Icon with Hover Effect */}
          <div
            className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 duration-300 transform lg:group-hover:translate-y-0 lg:translate-y-3 "
            onClick={(event) => {
              handleAddToCart(event);
            }}
          >
            <i className="fi fi-rr-shopping-cart-add text-2xl hover:scale-110 transform duration-300 hover:text-primeColor mr-2"></i>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
