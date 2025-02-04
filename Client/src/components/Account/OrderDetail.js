import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "@heroui/button";
function OrderDetail() {
  const { id } = useParams(); // Get the order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://upstrides-server.vercel.app/api/order/get-order/${id}`
        );
        const data = await response.json();

        if (response.status === 200) {
          setOrder(data.order);
        } else {
          setError(data.message || "Order not found");
        }
      } catch (err) {
        setError("An error occurred while fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const [productDetails, setProductDetails] = useState({});
  console.log("productDetails", productDetails);
  useEffect(() => {
    if (!order || !order.products) return;

    const fetchProductDetails = async () => {
      const productData = {};

      await Promise.all(
        order.products.map(async (product) => {
          try {
            const response = await fetch(
              `https://upstrides-server.vercel.app/api/Product/ProductDetail/${product.id}`
            );
            const data = await response.json();
            if (response.ok) {
              productData[product._id] = data.product;
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        })
      );

      setProductDetails(productData);
    };

    fetchProductDetails();
  }, [order]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center mb-10">
            Order Summary
          </h2>
          <div class="w-full flex-col justify-start items-start gap-3 flex mb-10">
            <h3 class="text-gray-900 text-xl font-semibold font-manrope leading-9 md:text-2xl">
              Order Id:{" "}
              <span class="text-primary-700 font-medium">#{order.orderNo}</span>
            </h3>
            <h4 class="text-gray-900 text-xl font-semibold font-manrope leading-9 md:text-2xl">
              Order Date:{" "}
              <span class=" text-gray-400 font-medium">10 Jan 2025</span>
            </h4>
            <p class="font-semibold text-base leading-7 text-black mt-4">
              Address :{" "}
              <span class="text-gray-400 font-bold">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName},
              </span>
              <span class="text-gray-400 font-medium">
                {" "}
                {order.shippingAddress.apartment} -{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}, {order.shippingAddress.country} -{" "}
                {order.shippingAddress.pincode}
              </span>
            </p>
          </div>
          <div class="hidden md:flex w-full py-9 rounded-xl border border-gray-200 flex-col justify-start items-start mb-5">
            <div class="w-full flex-col justify-center sm:items-center items-start gap-8 flex">
              <ol class="flex sm:items-center items-start w-full sm:gap-0 gap-5">
                <li
                  className={`flex w-full relative justify-center text-primary-700 text-base font-semibold 
    after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute
    lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16
    ${
      order.orderStatus === "shipping" || "packing" || "placed"
        ? "after:bg-primary-700"
        : "after:bg-gray-300"
    }`}
                >
                  <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                    <span
                      className={`w-6 h-6 border-2 border-primary-700 rounded-full flex justify-center items-center mx-auto mb-1 text-primary-700 text-base font-bold lg:w-8 lg:h-8 
    ${
      order.orderStatus === "shipping" ||
      order.orderStatus === "packing" ||
      order.orderStatus === "placed"
        ? "bg-[#badaff]"
        : "bg-white"
    }`}
                    >
                      {" "}
                      <i class="fi fi-rs-order-history text-black mt-1"></i>
                    </span>{" "}
                    Order Placed
                    <span class="text-primary-700 text-base font-normal text-center">
                      Feb 20th, 2024
                    </span>
                  </div>
                </li>
                <li
                  className={`flex w-full relative justify-center text-primary-700 text-base font-semibold 
    after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute
    lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16
    ${
      order.orderStatus === "packing" || order.orderStatus === "placed"
        ? "after:bg-primary-700"
        : "after:bg-gray-300"
    }`}
                >
                  <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                    <span
                      className={`w-6 h-6 border-2 border-primary-700 rounded-full flex justify-center items-center mx-auto mb-1 text-primary-700 text-base font-bold lg:w-8 lg:h-8 
    ${
      order.orderStatus === "shipping" ||
      order.orderStatus === "packing" ||
      order.orderStatus === "placed"
        ? "bg-[#badaff]"
        : "bg-white"
    }`}
                    >
                      {" "}
                      <i class="fi fi-rr-box-open text-black mt-1"></i>
                    </span>{" "}
                    Order Packed
                    <span class="text-primary-7000 text-base font-normal text-center">
                      Feb 20th, 2024
                    </span>
                  </div>
                </li>
                <li
                  className={`flex w-full relative justify-center text-primary-700 text-base font-semibold 
    after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute
    lg:after:top-4 after:top-3 xl:after:left-40 lg:after:left-36 md:after:left-28 sm:after:left-20 after:left-16
    ${
      order.orderStatus === "placed"
        ? "after:bg-primary-700"
        : "after:bg-gray-300"
    }`}
                >
                  <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                    <span
                      className={`w-6 h-6 border-2 border-primary-700 rounded-full flex justify-center items-center mx-auto mb-1 text-primary-700 text-base font-bold lg:w-8 lg:h-8 
    ${
      order.orderStatus === "packing" || order.orderStatus === "placed"
        ? "bg-[#badaff]"
        : "bg-white"
    }`}
                    >
                      <svg
                        class="h-4 w-4 text-black "
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
                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />
                      </svg>
                    </span>{" "}
                    In Translt
                    <span class="text-primary-700 text-base font-normal text-center">
                      Feb 20th, 2024
                    </span>
                  </div>
                </li>
                <li class="flex w-full relative justify-center text-primary-700 text-base font-semibold">
                  <div class="block sm:whitespace-nowrap z-10 flex flex-col items-center text-center">
                    <span
                      className={`w-6 h-6 border-2 border-primary-700 rounded-full flex justify-center items-center mx-auto mb-1 text-primary-700 text-base font-bold lg:w-8 lg:h-8 
    ${order.orderStatus === "placed" ? "bg-[#badaff]" : "bg-white"}`}
                    >
                      <svg
                        class="h-4 w-4 text-black "
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
                          d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                        />
                      </svg>
                    </span>{" "}
                    Out for Delivery
                    <span class="text-primary-700 text-base font-normal text-center">
                      Feb 20th, 2024{" "}
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* --------------------------- */}
          <div class="block md:hidden mt-6 grow sm:mt-8 lg:mt-0 mb-5">
            <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
              <h3 class="text-xl font-semibold text-gray-900 ">
                Order history
              </h3>

              <ol class="relative ms-3 border-s border-gray-200 ">
                <li class="mb-10 ms-6">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white ">
                    <svg
                      class="h-4 w-4 text-gray-500 "
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
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold text-gray-900 ">
                    Out for Delivery
                  </h4>
                  <p class="text-sm font-normal text-gray-500 ">
                    Feb 20th, 2024
                  </p>
                </li>

                <li class="mb-10 ms-6">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white ">
                    <svg
                      class="h-4 w-4 text-gray-500 "
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
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold text-gray-900 ">
                    In Translt
                  </h4>
                  <p class="text-sm font-normal text-gray-500 ">
                    Feb 20th, 2024
                  </p>
                </li>

                <li class="mb-10 ms-6 text-primary-700 ">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white ">
                    <svg
                      class="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 font-semibold">Order Packed</h4>
                  <p class="text-sm">Feb 20th, 2024</p>
                </li>

                <li class="mb-10 ms-6 text-primary-700 ">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white">
                    <svg
                      class="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold">Order Placed</h4>
                  <p class="text-sm">Feb 20th, 2024</p>
                </li>
              </ol>
            </div>
          </div>

          {/* --------------------------- */}
          <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div class="w-full px-3 min-[400px]:px-6">
              {order.products.map((product, index) => {
                const productInfo = productDetails[product._id] || {};
                return (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                  >
                    <div className="img-box max-lg:w-full">
                      {productInfo?.Images?.length > 0 ? (
                        <img
                          src={`/images/Tshirts/${productInfo.Images[0]}`}
                          alt={productInfo?.ProductName || "Product Image"}
                          className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                        />
                      ) : (
                        <p className="text-gray-500 text-sm">Loading...</p>
                      )}
                    </div>
                    <div className="flex flex-row items-center w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="flex items-center">
                          <div>
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                              {product?.name || "Loading..."}
                            </h2>
                            <div className="flex items-center">
                              <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                Size:{" "}
                                <span className="text-gray-500">
                                  {product.size}
                                </span>
                              </p>
                              <p className="font-medium text-base leading-7 text-black">
                                Qty:{" "}
                                <span className="text-gray-500">
                                  {product.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Price
                              </p>
                              <p className="lg:mt-4 font-medium text-sm leading-7 text-primary-700">
                                ₹{product.price * product.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black text-center">
                                Status
                              </p>
                              <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                {order.orderStatus}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                Expected Delivery Time
                              </p>
                              <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                23rd March 2021
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div class="p-6 mt-10 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
            <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
              Order Summary
            </h2>
            <div class="data py-6 border-b border-gray-200">
              <div class="flex items-center justify-between gap-4 mb-5">
                <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                  Sub Total
                </p>
                <p class="font-medium text-lg leading-8 text-gray-900">
                  ₹{order.subtotal}
                </p>
              </div>
              <div class="flex items-center justify-between gap-4 mb-5">
                <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                  Shipping Cost
                </p>
                <p class="font-medium text-lg leading-8 text-gray-600">
                  ₹{order.shippingCost}
                </p>
              </div>
            </div>
            <div class="total flex items-center justify-between pt-6">
              <p class="font-normal text-xl leading-8 text-black ">Total</p>
              <h5 class="font-manrope font-bold text-2xl leading-9 text-primary-700">
                ₹{order.total}
              </h5>
            </div>
          </div>
          <div className="mt-5">
            <Button
              size="lg"
              className="w-[100%] bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 mr-2 md:w-[49%] sm:mb-2 xs:mb-2"
            >
              Cancel Order
            </Button>

            <Button
              size="lg"
              color="default"
              variant="faded"
              className="w-[100%] md:w-[49%]"
            >
              Return Order
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetail;
