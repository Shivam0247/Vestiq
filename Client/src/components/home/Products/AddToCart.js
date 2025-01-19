import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDraggable,
} from "@heroui/react";

export default function AddToCart({ onClose, product }) {
  const targetRef = React.useRef(null);

  return (
    <Modal
      ref={targetRef}
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
              <div className="lg:h-full flex items-center lg:w-[50%]">
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
            <div className="buttons lg:ml-7 lg:w-[50%] ">
              <h5 className="mb-5 text-medium font-medium text-gray-900">
                Select Size
              </h5>
              <ul className="grid gap-3 grid-cols-2 md:grid-cols-7 lg:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3">
                <li>
                  <input
                    type="radio"
                    id="XS"
                    name="hosting"
                    value="XS"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="XS"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">XS</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="S"
                    name="hosting"
                    value="S"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="S"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">S</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="M"
                    name="hosting"
                    value="M"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="M"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">M</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="L"
                    name="hosting"
                    value="L"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="L"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">L</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="XL"
                    name="hosting"
                    value="XL"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="XL"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">XL</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="XXL"
                    name="hosting"
                    value="XXL"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="XXL"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">XXL</div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="XXXL"
                    name="hosting"
                    value="XXXL"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="XXXL"
                    className="inline-flex items-center justify-center w-[5rem] h-[4rem] p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 transition-all"
                  >
                    <div className="block text-lg font-semibold">XXXL</div>
                  </label>
                </li>
              </ul>

              {/* Buttons */}
              <Button
                color="primary"
                size="lg"
                className="w-[100%] lg:w-[23rem] md:w-[48%] sm:w-[100%] xs:w-[100%] my-5 bg-black text-white transition-all duration-300 transform hover:scale-105"
              >
                Add To Cart
              </Button>

              <Button
                color="primary"
                size="lg"
                className="w-[100%] lg:w-[23rem] lg:ml-0 md:w-[48%] sm:w-[100%] xs:w-[100%] xs:ml-0 md:ml-5 sm:ml-0 bg-white border-black text-black border-2 transition-all duration-300 transform hover:scale-105"
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
