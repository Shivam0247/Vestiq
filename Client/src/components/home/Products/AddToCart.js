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
      className="lg:min-w-[50rem] h-[30rem]"
      hideCloseButton={true} // Don't use default close button
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 relative">
            <i
              class="fa-solid fa-xmark absolute top-3 right-5 text-xl font-bold text-gray-500 hover:text-black cursor-pointer"
              onClick={onClose}
            ></i>
            <div>
              {product.name} <br />
              INR {parseFloat(product.price).toFixed(2)}
            </div>
          </ModalHeader>
          <ModalBody>
            {/* Display product details */}
            {product ? (
              <div className="h-full flex items-center">
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[22rem] h-auto object-contain bg-transparent"
                  />
                </div>
              </div>
            ) : (
              <p>No product details available.</p>
            )}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
