import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import AddToCart from "../../components/home/Products/AddToCart";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import Product from "../../components/home/Products/Product";
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartClick = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
        );
        const data = await response.json();
        setNewArrivals(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <>
      <div className="max-w-container mx-auto px-4">
        {products.length > 0 ? (
          <section class="bg-white py-8 antialiased md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">
                Shopping Cart
              </h2>

              <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  <div class="space-y-6">
                    {products.map((item) => (
                      <div key={item._id}>
                        <ItemCard item={item} />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => dispatch(resetCart())}
                    class="flex items-center justify-center rounded-lg
                        bg-red-600 px-5 py-2.5 text-sm font-medium text-white
                        hover:red-600 focus:outline-none focus:ring-4
                        focus:ring-primary-300 mt-5"
                  >
                    Reset cart
                  </button>
                </div>

                <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <p class="text-xl font-semibold text-gray-900 ">
                      Order summary
                    </p>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 ">
                            Original price
                          </dt>
                          <dd class="text-base font-medium text-gray-900 ">
                            ₹ {totalAmt}
                          </dd>
                        </dl>

                        {/* <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500">
                            Savings
                          </dt>
                          <dd class="text-base font-medium text-green-600">
                            -$299.00
                          </dd>
                        </dl> */}

                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 ">
                            Shipping Charge
                          </dt>
                          <dd class="text-base font-medium text-gray-900">
                            ₹ {shippingCharge}
                          </dd>
                        </dl>

                        {/* <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 ">
                            Tax
                          </dt>
                          <dd class="text-base font-medium text-gray-900 ">
                            $799
                          </dd>
                        </dl> */}
                      </div>

                      <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                        <dt class="text-base font-bold text-gray-900 ">
                          Total
                        </dt>
                        <dd class="text-base font-bold text-gray-900 ">
                          ₹ {totalAmt + shippingCharge}
                        </dd>
                      </dl>
                    </div>

                    <Link
                      to="/Checkout"
                      class="flex w-full items-center justify-center rounded-lg
                        bg-primary-700 px-5 py-2.5 text-sm font-medium text-white
                        hover:bg-primary-800 focus:outline-none focus:ring-4
                        focus:ring-primary-300 "
                    >
                      Proceed to Checkout
                    </Link>

                    <div class="flex items-center justify-center gap-2">
                      <span class="text-sm font-normal text-gray-500">
                        {" "}
                        or{" "}
                      </span>
                      <Link
                        to="/shop"
                        title=""
                        class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                      >
                        Continue Shopping
                        <svg
                          class="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <form class="space-y-4">
                      <div>
                        <label
                          for="voucher"
                          class="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {" "}
                          Do you have a voucher or gift card?{" "}
                        </label>
                        <input
                          type="text"
                          id="voucher"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder=""
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                      >
                        Apply Code
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="hidden xl:mt-8 xl:block">
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 ">
                    You may also like
                  </h3>
                </div>
                <div className="w-full pb-16 pt-5 px-4">
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
                    {newArrivals.map((product) => (
                      <Product
                        key={product._id}
                        _id={product._id}
                        img1={`/images/Tshirts/${product.Images[0]}`}
                        img2={`/images/Tshirts/${product.Images[1]}`}
                        productName={product.ProductName}
                        price={product.Price}
                        sizes={product.Sizes}
                        Description={product.Description}
                        Features={product.Features}
                        CompositionAndCare={product.CompositionAndCare}
                        SizeChart={product.SizeChart}
                        Status={product.Status}
                        onCartClick={handleCartClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20 mt-32"
          >
            <div>
              <img
                className="w-80 rounded-lg p-4 mx-auto"
                src={emptyCart}
                alt="emptyCart"
              />
            </div>
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Cart feels lonely.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your shopping cart is ready to serve your style needs! Give it
                purpose - fill it with trendy tees, cozy hoodies, and
                fashion-forward outfits. Make your wardrobe happy!
              </p>
              <Link to="/shop">
                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {isModalOpen && (
        <AddToCart product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Cart;
