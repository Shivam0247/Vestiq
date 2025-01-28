import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6">
      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div class="flex items-center gap-4">
          <button
            onClick={() => dispatch(deleteItem(item._id))}
            type="button"
            class="inline-flex items-center text-sm font-medium text-red-600 hover:underline "
          >
            <svg
              class="me-1.5 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>
        <a href="#" class="shrink-0 md:order-1">
          <img class="w-36" src={item.image} alt="imac image" />
        </a>

        <label for="counter-input" class="sr-only">
          Choose quantity:
        </label>
        <div class="flex items-center justify-between md:order-3 md:justify-end">
          <div class="flex items-center">
            <button
              onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
            >
              <svg
                class="h-2.5 w-2.5 text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <span class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 ">
              {item.quantity}
            </span>

            <button
              onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
            >
              <svg
                class="h-2.5 w-2.5 text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div class="text-end md:order-4 md:w-32">
            <p class="text-base font-bold text-gray-900 ">
              ₹ {item.quantity * item.price}
            </p>
          </div>
        </div>

        <div class="w-full min-w-0 flex-1 space-y-0 md:order-2 md:max-w-md">
          <a
            href="#"
            class="text-base font-medium text-gray-900 hover:underline "
          >
            {item.name}
          </a>
          <div className="">
            <span> {item.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
