import React from "react";

function OrderDetail() {
  return (
    <div>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center mb-10">
            Order Summary
          </h2>
          <div class="w-full flex-col justify-start items-start gap-3 flex mb-10">
            <h3 class="text-gray-900 text-2xl font-semibold font-manrope leading-9">
              Order Id:{" "}
              <span class="text-indigo-600 font-medium">#1025400025</span>
            </h3>
            <h4 class="text-gray-900 text-2xl font-semibold font-manrope leading-9">
              Order Date:{" "}
              <span class=" text-gray-400 font-medium">10 Jan 2025</span>
            </h4>
            <p class="font-semibold text-base leading-7 text-black mt-4">
              Address:{" "}
              <span class="text-gray-400 font-medium">
                39-Umiya bungalows, surat, Gujarat
              </span>
            </p>
          </div>
          <div class="w-full flex-col justify-center sm:items-center items-start gap-8 flex mb-10">
            <ol class="flex sm:items-center items-start w-full sm:gap-0 gap-3">
              <li class="flex w-full relative justify-center text-indigo-600 text-base font-semibold after:content-['']  after:w-full after:h-0.5 after:border after:border-dashed after:bg-indigo-600 after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center">
                  <span class="w-6 h-6 bg-indigo-600 text-center border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-1 text-base font-bold text-white lg:w-10 lg:h-10">
                    1
                  </span>
                  Order Confirmed <br />
                  <span class="text-indigo-600 text-base font-normal text-center">
                    8:00 AM, Feb 8,2024
                  </span>
                </div>
              </li>
              <li class="flex w-full relative justify-center text-black text-base font-semibold after:content-['']  after:w-full after:h-0.5 after:border after:border-dashed after:bg-indigo-200 after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center">
                  <span class="w-6 h-6 bg-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-10 lg:h-10">
                    2
                  </span>
                  Shipping
                  <span class="text-gray-500 text-base font-normal text-center">
                    Shipped with FedEX
                  </span>
                </div>
              </li>
              <li class="flex w-full relative justify-center text-gray-500 text-base font-semibold">
                <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center">
                  <span class="w-6 h-6 text-indigo-600 border-2 bg-transparent border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-sm lg:w-10 lg:h-10">
                    3
                  </span>
                  To Deliver
                  <span class="text-gray-500 text-base font-normal text-center">
                    Estimated date: Feb 15,
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div class="w-full px-3 min-[400px]:px-6">
              <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                <div class="img-box max-lg:w-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1701167607.png"
                    alt="Premium Watch image"
                    class="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div class="flex flex-row items-center w-full ">
                  <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div class="flex items-center">
                      <div class="">
                        <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                          Premium Quality Dust Watch
                        </h2>
                        <p class="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                          By: Dust Studios
                        </p>
                        <div class="flex items-center ">
                          <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            Size: <span class="text-gray-500">100 ml</span>
                          </p>
                          <p class="font-medium text-base leading-7 text-black ">
                            Qty: <span class="text-gray-500">2</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-5">
                      <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm leading-7 text-black">
                            price
                          </p>
                          <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                            $100
                          </p>
                        </div>
                      </div>
                      <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm leading-7 text-black">
                            Status
                          </p>
                          <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                            Ready for Delivery
                          </p>
                        </div>
                      </div>
                      <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                            Expected Delivery Time
                          </p>
                          <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                            23rd March 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                <div class="img-box max-lg:w-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1701167621.png"
                    alt="Diamond Watch image"
                    class="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div class="flex flex-row items-center w-full ">
                  <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div class="flex items-center">
                      <div class="">
                        <h2 class="font-semibold text-xl leading-8 text-black mb-3 ">
                          Diamond Platinum Watch
                        </h2>
                        <p class="font-normal text-lg leading-8 text-gray-500 mb-3">
                          Diamond Dials
                        </p>
                        <div class="flex items-center  ">
                          <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            Size: <span class="text-gray-500">Regular</span>
                          </p>
                          <p class="font-medium text-base leading-7 text-black ">
                            Qty: <span class="text-gray-500">1</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-5">
                      <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm leading-7 text-black">
                            price
                          </p>
                          <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                            $100
                          </p>
                        </div>
                      </div>
                      <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm leading-7 text-black">
                            Status
                          </p>
                          <p class="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                            Dispatched
                          </p>
                        </div>
                      </div>
                      <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                        <div class="flex gap-3 lg:block">
                          <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                            Expected Delivery Time
                          </p>
                          <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                            23rd March 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <button class="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                  <svg
                    class="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                      stroke=""
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                  Cancel Order
                </button>
                <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Paid using Credit Card{" "}
                  <span class="text-gray-500">ending with 8822</span>
                </p>
              </div>
              <p class="font-semibold text-lg text-black py-6">
                Total Price: <span class="text-indigo-600"> $200.00</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetail;
