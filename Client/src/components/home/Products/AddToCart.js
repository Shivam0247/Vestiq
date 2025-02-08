import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";

export default function AddToCart({ onClose, product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sizes array
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // State to manage selected size, defaulting to the first size
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    // Set the default size to the first element in the sizes array only once
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`, {
      state: {
        item: {
          _id: product?._id,
          name: product?.name,
          images: product?.images,
          price: product?.price,
          Description: product?.Description,
          Features: product?.Features,
          CompositionAndCare: product?.CompositionAndCare,
          sizes: product?.sizes,
          SizeChart: product?.SizeChart,
        },
      },
    });
  };

  return (
    <Modal
      isOpen={true}
      onOpenChange={onClose}
      className="lg:min-w-[55rem] lg:h-[30rem] md:min-w-[90%] md:h-[80%] sm:min-w-[90%] sm:h-[90%] overflow-y-scroll xs:h-[83%]"
      hideCloseButton={true} // Don't use default close button
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 relative">
            {/* Custom close button */}
            <i
              className="fa-solid fa-xmark absolute top-3 right-5 text-xl font-bold text-gray-500 hover:text-black cursor-pointer"
              onClick={onClose}
            ></i>
            <div>
              {product?.name} <br />
              INR {parseFloat(product?.price || 0).toFixed(2)}
            </div>
          </ModalHeader>
          <ModalBody className="flex lg:flex-row lg:justify-center">
            {/* Display product details */}
            {product ? (
              <div className="lg:h-full flex items-center justify-center lg:w-[50%]">
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="lg:w-[22rem] lg:h-auto object-contain bg-transparent"
                  />
                </div>
              </div>
            ) : (
              <p>No product details available.</p>
            )}

            {/* Interactive options */}
            <div className="buttons lg:ml-7 lg:w-[50%]">
              <h5 className="mb-5 text-medium font-medium text-gray-900">
                Select Size
              </h5>
              <ul className="grid gap-3 grid-cols-2 xs:grid-cols-3 md:grid-cols-7 lg:grid-cols-4 sm:grid-cols-4">
                {product.sizes.map((size) => (
                  <li key={size}>
                    <input
                      type="radio"
                      id={size}
                      name="size"
                      value={size}
                      className="hidden peer"
                      onChange={handleSizeChange} // Update selected size
                      checked={selectedSize === size} // Check if this size is selected
                      required
                    />
                    <label
                      htmlFor={size}
                      className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                    >
                      <div className="block text-lg font-semibold">{size}</div>
                    </label>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <Button
                color="primary"
                size="lg"
                className="w-[100%] lg:w-[23rem] md:w-[48%] sm:w-[100%] xs:w-[100%] my-5 bg-black text-white transition-all duration-300 transform hover:scale-105"
                onTouchStart={(event) => {
                  event.stopPropagation();
                  if (!selectedSize) {
                    alert("Please select a size before adding to the cart.");
                    return;
                  }
                  dispatch(
                    addToCart({
                      _id: product?._id,
                      name: product?.name,
                      quantity: 1,
                      image: product?.image,
                      badge: product?.badge,
                      price: product?.price,
                      colors: product?.colors,
                      size: selectedSize, // Use selected size
                    })
                  );
                  onClose(); // Close the modal after adding the item to the cart
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  if (!selectedSize) {
                    alert("Please select a size before adding to the cart.");
                    return;
                  }
                  dispatch(
                    addToCart({
                      _id: product?._id,
                      name: product?.name,
                      quantity: 1,
                      image: product?.image,
                      badge: product?.badge,
                      price: product?.price,
                      colors: product?.colors,
                      size: selectedSize, // Use selected size
                    })
                  );
                  onClose(); // Close the modal after adding the item to the cart
                }}
              >
                Add To Cart
              </Button>

              <Button
                color="primary"
                size="lg"
                className="w-[100%] lg:w-[23rem] lg:ml-0 md:w-[48%] sm:w-[100%] xs:w-[100%] xs:ml-0 md:ml-5 sm:ml-0 bg-white border-black text-black border-2 transition-all duration-300 transform hover:scale-105"
                onPress={handleProductClick}
              >
                Visit Product Page
              </Button>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
