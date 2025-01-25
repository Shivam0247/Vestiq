import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { InputOtp } from "@heroui/input-otp";
const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = React.useState("");
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <Link
                to="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
              >
                <img
                  className="mr-2 w-[12rem]"
                  src="/UPSTRIDES.png"
                  alt="logo"
                />
              </Link>
            </div>
            <span className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mt-0">
              Enter code
            </span>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Sent to {email}
                </label>
                <InputOtp
                  isRequired
                  aria-label="OTP input field"
                  length={6}
                  name="otp"
                  placeholder="Enter code"
                  validationBehavior="native"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Submit
              </button>
            </form>

            <p className="text-sm text-primary-700 font-medium">
              <Link to="/signin">Login with a different email</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTP;
