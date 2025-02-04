import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = {};

      await Promise.all(
        order.products.map(async (product) => {
          try {
            const response = await fetch(
              `https://your-api.com/ProductDetail/${product.id}`
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
  }, [order.products]);

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
            <h3 class="text-gray-900 text-2xl font-semibold font-manrope leading-9">
              Order Id:{" "}
              <span class="text-indigo-600 font-medium">#{order.orderNo}</span>
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
              {order.products.map((product, index) => (
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
                            {product.name}
                          </h2>
                          <div class="flex items-center ">
                            <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              Size:{" "}
                              <span class="text-gray-500"> {product.size}</span>
                            </p>
                            <p class="font-medium text-base leading-7 text-black ">
                              Qty:{" "}
                              <span class="text-gray-500">
                                {" "}
                                {product.quantity}
                              </span>
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
                              ₹{product.price * product.quantity}
                            </p>
                          </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              {order.orderStatus}
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
              ))}
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
              <h5 class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                ₹{order.total}
              </h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetail;
