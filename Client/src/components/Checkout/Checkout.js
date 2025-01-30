import React, { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Cookies from "js-cookie";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
function Checkout() {
  const [isDifferentBilling, setIsDifferentBilling] = useState(false);
  const userEmail = Cookies.get("userEmail");

  return (
    <div>
      <section class="bg-white py-8 antialiased  md:py-16">
        <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 sm:text-3xl">
            Checkout
          </h2>

          <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 flex-1 space-y-8">
              <Accordion
                selectionMode="multiple"
                showDivider={false}
                defaultExpandedKeys={["1", "2", "3", "4"]}
              >
                {!userEmail ? (
                  <AccordionItem
                    key="1"
                    aria-label="Contact"
                    title={<span className="font-bold text-xl">Contact</span>}
                  >
                    <div class="space-y-4">
                      <input
                        type="text"
                        id="your_name"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        placeholder="Email or Phone number"
                        required
                      />
                    </div>
                  </AccordionItem>
                ) : (
                  <AccordionItem
                    key="1"
                    aria-label="Account"
                    title={<span className="font-bold text-xl">Account</span>}
                  >
                    <span className="block text-gray-800">{userEmail}</span>
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                      Log out
                    </span>
                  </AccordionItem>
                )}

                {!userEmail ? (
                  <AccordionItem
                    key="2"
                    aria-label="Shipping Details"
                    title={
                      <span className="font-bold text-xl">
                        Shipping Details
                      </span>
                    }
                  >
                    <div class="space-y-4">
                      <div>
                        <div class="mb-2 flex items-center gap-2">
                          <label
                            for="select-country-input-3"
                            class="block text-sm font-medium text-gray-900 "
                          >
                            Country
                          </label>
                        </div>
                        <select
                          id="select-country-input-3"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        >
                          <option selected>United States</option>
                          <option value="AS">Australia</option>
                          <option value="FR">France</option>
                          <option value="ES">Spain</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            for="your_name"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="your_name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="Bonnie Green"
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="your_email"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="your_email"
                          class="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="your_email"
                          class="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                        <div>
                          <div class="mb-2 flex items-center gap-2">
                            <label
                              for="select-city-input-3"
                              class="block text-sm font-medium text-gray-900"
                            >
                              City
                            </label>
                          </div>
                          <select
                            id="select-city-input-3"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          >
                            <option selected>San Francisco</option>
                            <option value="NY">New York</option>
                            <option value="LA">Los Angeles</option>
                            <option value="CH">Chicago</option>
                            <option value="HU">Houston</option>
                          </select>
                        </div>

                        <div>
                          <div class="mb-2 flex items-center gap-2">
                            <label
                              for="select-city-input-3"
                              class="block text-sm font-medium text-gray-900"
                            >
                              State
                            </label>
                          </div>
                          <select
                            id="select-city-input-3"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          >
                            <option selected>San Francisco</option>
                            <option value="NY">New York</option>
                            <option value="LA">Los Angeles</option>
                            <option value="CH">Chicago</option>
                            <option value="HU">Houston</option>
                          </select>
                        </div>

                        <div>
                          <label
                            for="your_email"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            PIN code
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="your_email"
                          class="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                    </div>
                  </AccordionItem>
                ) : (
                  <AccordionItem
                    key="2"
                    aria-label="Shipping Details"
                    title={
                      <span className="font-bold text-xl">
                        Shipping Details
                      </span>
                    }
                  >
                    <ul className="text-sm font-medium text-gray-900 bg-white space-y-2">
                      <li className="w-full rounded-lg border border-gray-300 p-3 hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <input
                            id="list-radio-license"
                            type="radio"
                            value=""
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            checked={!isDifferentBilling}
                            onChange={() => setIsDifferentBilling(false)}
                          />
                          <label
                            htmlFor="list-radio-license"
                            className="text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            <span className="block font-semibold">
                              Shivam Patel
                            </span>
                            <span className="block text-gray-700">
                              39-Umiya Bungalows, Surat, Gujarat
                            </span>
                          </label>
                        </div>
                      </li>

                      <li className="w-full rounded-lg border border-gray-300 p-3 hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <input
                            id="list-radio-id"
                            type="radio"
                            value=""
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            checked={isDifferentBilling}
                            onChange={() => setIsDifferentBilling(true)}
                          />
                          <label
                            htmlFor="list-radio-id"
                            className="text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            Use a different billing address
                          </label>
                        </div>
                      </li>
                    </ul>

                    <span className="text-sm text-blue-600 cursor-pointer mt-2 block">
                      + Use a different address
                    </span>
                  </AccordionItem>
                )}
                <AccordionItem
                  key="3"
                  aria-label="Shipping Methods"
                  title={
                    <span className="font-bold text-xl">Shipping Methods</span>
                  }
                >
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="dhl"
                              aria-describedby="dhl-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                              checked
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="dhl"
                              class="font-medium leading-none text-gray-900 "
                            >
                              {" "}
                              $15 - DHL Fast Delivery{" "}
                            </label>
                            <p
                              id="dhl-text"
                              class="mt-1 text-xs font-normal text-gray-500 "
                            >
                              Get it by Tommorow
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="fedex"
                              aria-describedby="fedex-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="fedex"
                              class="font-medium leading-none text-gray-900"
                            >
                              {" "}
                              Free Delivery - FedEx{" "}
                            </label>
                            <p
                              id="fedex-text"
                              class="mt-1 text-xs font-normal text-gray-500 "
                            >
                              Get it by Friday, 13 Dec 2023
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="express"
                              aria-describedby="express-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="express"
                              class="font-medium leading-none text-gray-900 "
                            >
                              {" "}
                              $49 - Express Delivery{" "}
                            </label>
                            <p
                              id="express-text"
                              class="mt-1 text-xs font-normal text-gray-500"
                            >
                              Get it today
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Billing Details"
                  title={
                    <span className="font-bold text-xl">Billing Details</span>
                  }
                >
                  <div class="space-y-0">
                    <div>
                      <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
                        <li class="w-full border-b border-gray-200 rounded-t-lg ">
                          <div class="flex items-center ps-3">
                            <input
                              id="list-radio-license"
                              type="radio"
                              value=""
                              name="list-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                              checked={!isDifferentBilling}
                              onChange={() => setIsDifferentBilling(false)}
                            />
                            <label
                              for="list-radio-license"
                              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                            >
                              Same as shipping address
                            </label>
                          </div>
                        </li>
                        <li class="w-full border-b border-gray-200 rounded-t-lg ">
                          <div class="flex items-center ps-3">
                            <input
                              id="list-radio-id"
                              type="radio"
                              value=""
                              name="list-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                              checked={isDifferentBilling}
                              onChange={() => setIsDifferentBilling(true)}
                            />
                            <label
                              for="list-radio-id"
                              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                            >
                              Use a different billing address
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {isDifferentBilling && (
                      <div className="space-y-3 p-5 bg-[#0000000a] rounded-b-lg">
                        <div class="mb-2 flex items-center gap-2">
                          <label
                            for="select-country-input-3"
                            class="block text-sm font-medium text-gray-900 "
                          >
                            Country
                          </label>
                        </div>
                        <select
                          id="select-country-input-3"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        >
                          <option selected>United States</option>
                          <option value="AS">Australia</option>
                          <option value="FR">France</option>
                          <option value="ES">Spain</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              for="your_name"
                              class="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="your_name"
                              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="Bonnie Green"
                              required
                            />
                          </div>

                          <div>
                            <label
                              for="your_email"
                              class="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="your_email"
                              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="name@flowbite.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            for="your_email"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="your_email"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Apartment, suite, etc. (optional)
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                          <div>
                            <div class="mb-2 flex items-center gap-2">
                              <label
                                for="select-city-input-3"
                                class="block text-sm font-medium text-gray-900"
                              >
                                City
                              </label>
                            </div>
                            <select
                              id="select-city-input-3"
                              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            >
                              <option selected>San Francisco</option>
                              <option value="NY">New York</option>
                              <option value="LA">Los Angeles</option>
                              <option value="CH">Chicago</option>
                              <option value="HU">Houston</option>
                            </select>
                          </div>

                          <div>
                            <div class="mb-2 flex items-center gap-2">
                              <label
                                for="select-city-input-3"
                                class="block text-sm font-medium text-gray-900"
                              >
                                State
                              </label>
                            </div>
                            <select
                              id="select-city-input-3"
                              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            >
                              <option selected>San Francisco</option>
                              <option value="NY">New York</option>
                              <option value="LA">Los Angeles</option>
                              <option value="CH">Chicago</option>
                              <option value="HU">Houston</option>
                            </select>
                          </div>

                          <div>
                            <label
                              for="your_email"
                              class="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              PIN code
                            </label>
                            <input
                              type="text"
                              id="your_email"
                              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="name@flowbite.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            for="your_email"
                            class="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionItem>
              </Accordion>
              <div class="space-y-3">
                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 "
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div>
                <CartProduct />
              </div>
              <div>
                <div class="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="Enter a gift card, voucher or promotional code"
                    required
                  />
                  <button
                    type="button"
                    class="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div class="flow-root">
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
                          ₹ 111
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
                          ₹ 22
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
                      <dt class="text-base font-bold text-gray-900 ">Total</dt>
                      <dd class="text-base font-bold text-gray-900 ">₹ 2222</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
