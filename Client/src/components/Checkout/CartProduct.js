import React from "react";

function CartProduct() {
  return (
    <div className="flex items-center w-full mb-3">
      {/* Product Image with Badge */}
      <div className="relative w-20 h-18">
        <img
          src="/images/image1.jpg"
          alt="Product"
          className="w-full h-full object-cover border border-gray-300 rounded-lg"
        />
        {/* Quantity Badge */}
        <span className="absolute top-[-4px] right-[-4px] bg-[#65686f] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </div>

      <div className="flex flec-row w-full justify-between">
        {/* Product Details */}
        <div className="ml-4 flex flex-col justify-center">
          <span className="text-sm font-semibold text-gray-900">
            Product Name
          </span>
          <span className="text-gray-500 text-xs">Size: M</span>
        </div>
        <span className="text-blue-600 font-semibold text-sm mt-1">₹499</span>
      </div>
    </div>
  );
}

export default CartProduct;
