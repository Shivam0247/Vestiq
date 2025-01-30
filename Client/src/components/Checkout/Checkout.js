import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Cookies from "js-cookie";
import CartProduct from "./CartProduct";
import { Country, State } from "country-state-city";
function Checkout() {
  const [isDifferentBilling, setIsDifferentBilling] = useState(false);
  const userEmail = Cookies.get("userEmail");
  const [addresses, setAddresses] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleAddressSelect = (address) => {
    const { _id, default: isDefault, ...addressWithoutId } = address;

    setShippingAddress(addressWithoutId);
    console.log("shippingAddress", shippingAddress);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `https://upstrides-server.vercel.app/api/userDetails/get-addresses/${userEmail}`
        );
        const data = await response.json();

        if (response.ok) {
          const updatedAddresses = data.addresses.map((address) => {
            const country =
              Country.getCountryByCode(address.country)?.name ||
              address.country;
            const state =
              State.getStateByCodeAndCountry(address.state, address.country)
                ?.name || address.state;

            return { ...address, country, state };
          });

          setAddresses(updatedAddresses);
        } else {
          console.error("Error fetching addresses:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userEmail) {
      fetchAddresses();
    }
  }, [userEmail]);

  return (
    <div>
      <section className="bg-white py-8 antialiased  md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl">
            Checkout
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
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
                    <div className="space-y-4">
                      <input
                        type="text"
                        id="your_name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
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

                {!userEmail || !addresses ? (
                  <AccordionItem
                    key="2"
                    aria-label="Shipping Details"
                    title={
                      <span className="font-bold text-xl">
                        Shipping Details
                      </span>
                    }
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium text-gray-900 "
                          >
                            Country
                          </label>
                        </div>
                        <select
                          id="select-country-input-3"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        >
                          <option selected>United States</option>
                          <option value="AS">Australia</option>
                          <option value="FR">France</option>
                          <option value="ES">Spain</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="your_name"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="your_name"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="Bonnie Green"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="your_email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="your_email"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="your_email"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <label
                              htmlFor="select-city-input-3"
                              className="block text-sm font-medium text-gray-900"
                            >
                              City
                            </label>
                          </div>
                          <select
                            id="select-city-input-3"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                          >
                            <option selected>San Francisco</option>
                            <option value="NY">New York</option>
                            <option value="LA">Los Angeles</option>
                            <option value="CH">Chicago</option>
                            <option value="HU">Houston</option>
                          </select>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <label
                              htmlFor="select-city-input-3"
                              className="block text-sm font-medium text-gray-900"
                            >
                              State
                            </label>
                          </div>
                          <select
                            id="select-city-input-3"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
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
                            htmlFor="your_email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            PIN code
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="your_email"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
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
                      {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <li
                            key={index}
                            className="w-full rounded-lg border border-gray-300 p-3 hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-3">
                              {/* Radio Button */}
                              <input
                                id={`Address-${index}`}
                                type="radio"
                                value={index}
                                name="Address"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                onChange={() => handleAddressSelect(address)}
                                // checked={!isDifferentBilling && index === 0}
                              />
                              {/* Label for the entire list item */}
                              <label
                                htmlFor={`Address-${index}`}
                                className="text-sm font-medium text-gray-900 cursor-pointer w-full"
                              >
                                <span className="block font-semibold">
                                  {address.firstName} {address.lastName}
                                </span>
                                <span className="block text-gray-700">
                                  {address.apartment}-{address.address},{" "}
                                  {address.city}, {address.state},{" "}
                                  {address.country} - {address.pincode}
                                </span>
                              </label>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 p-3">
                          No addresses found.
                        </li>
                      )}
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="dhl"
                              aria-describedby="dhl-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                              checked
                            />
                          </div>

                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="dhl"
                              className="font-medium leading-none text-gray-900 "
                            >
                              {" "}
                              $15 - DHL Fast Delivery{" "}
                            </label>
                            <p
                              id="dhl-text"
                              className="mt-1 text-xs font-normal text-gray-500 "
                            >
                              Get it by Tommorow
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="fedex"
                              aria-describedby="fedex-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                            />
                          </div>

                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="fedex"
                              className="font-medium leading-none text-gray-900"
                            >
                              {" "}
                              Free Delivery - FedEx{" "}
                            </label>
                            <p
                              id="fedex-text"
                              className="mt-1 text-xs font-normal text-gray-500 "
                            >
                              Get it by Friday, 13 Dec 2023
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="express"
                              aria-describedby="express-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 "
                            />
                          </div>

                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="express"
                              className="font-medium leading-none text-gray-900 "
                            >
                              {" "}
                              $49 - Express Delivery{" "}
                            </label>
                            <p
                              id="express-text"
                              className="mt-1 text-xs font-normal text-gray-500"
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
                  <div className="space-y-0">
                    <div>
                      <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
                        <li className="w-full border-b border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
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
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                            >
                              Same as shipping address
                            </label>
                          </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
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
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                            >
                              Use a different billing address
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {isDifferentBilling && (
                      <div className="space-y-3 p-5 bg-[#0000000a] rounded-b-lg">
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium text-gray-900 "
                          >
                            Country
                          </label>
                        </div>
                        <select
                          id="select-country-input-3"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        >
                          <option selected>United States</option>
                          <option value="AS">Australia</option>
                          <option value="FR">France</option>
                          <option value="ES">Spain</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="your_name"
                              className="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="your_name"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="Bonnie Green"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="your_email"
                              className="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="your_email"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="name@flowbite.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="your_email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="your_email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Apartment, suite, etc. (optional)
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <label
                                htmlFor="select-city-input-3"
                                className="block text-sm font-medium text-gray-900"
                              >
                                City
                              </label>
                            </div>
                            <select
                              id="select-city-input-3"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            >
                              <option selected>San Francisco</option>
                              <option value="NY">New York</option>
                              <option value="LA">Los Angeles</option>
                              <option value="CH">Chicago</option>
                              <option value="HU">Houston</option>
                            </select>
                          </div>

                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <label
                                htmlFor="select-city-input-3"
                                className="block text-sm font-medium text-gray-900"
                              >
                                State
                              </label>
                            </div>
                            <select
                              id="select-city-input-3"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
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
                              htmlFor="your_email"
                              className="mb-2 block text-sm font-medium text-gray-900 "
                            >
                              PIN code
                            </label>
                            <input
                              type="text"
                              id="your_email"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                              placeholder="name@flowbite.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="your_email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            id="your_email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionItem>
              </Accordion>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 "
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div>
                <CartProduct />
              </div>
              <div>
                <div className="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="Enter a gift card, voucher or promotional code"
                    required
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="flow-root">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 ">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          ₹ 111
                        </dd>
                      </dl>

                      {/* <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Savings
                          </dt>
                          <dd className="text-base font-medium text-green-600">
                            -$299.00
                          </dd>
                        </dl> */}

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Shipping Charge
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹ 22
                        </dd>
                      </dl>

                      {/* <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 ">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 ">
                            $799
                          </dd>
                        </dl> */}
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                      <dt className="text-base font-bold text-gray-900 ">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 ">
                        ₹ 2222
                      </dd>
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
