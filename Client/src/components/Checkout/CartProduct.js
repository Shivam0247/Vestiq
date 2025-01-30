import React from "react";

function CartProduct(props) {
  return (
    <div className="flex items-center w-full mb-3">
      <div className="relative w-20 h-18">
        <img
          src={props.item.image}
          alt="Product"
          className="w-full h-full object-cover border border-gray-300 rounded-lg"
        />
        <span className="absolute top-[-4px] right-[-4px] bg-[#65686f] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {props.item.quantity}
        </span>
      </div>

      <div className="flex flec-row w-full justify-between">
        <div className="ml-4 flex flex-col justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {props.item.name}
          </span>
          <span className="text-gray-500 text-xs">Size: {props.item.size}</span>
        </div>
        <span className="text-blue-600 font-semibold text-sm mt-1">
          ₹{props.item.price}
        </span>
      </div>
    </div>
  );
}

export default CartProduct;
