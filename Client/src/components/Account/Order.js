import React from "react";

function Order() {
  return (
    <div>
      <div className="mt-5">
        <span className="text-2xl font-bold">Orders</span>
      </div>

      <div className="w-[100%] bg-white p-6 rounded-lg shadow-md mt-3">
        <div className="flex flex-col items-center">
          <span className="font-bold mb-2">No orders yet</span>
          <span className="text-center">Go to store to place an order.</span>
        </div>
      </div>
    </div>
  );
}

export default Order;
