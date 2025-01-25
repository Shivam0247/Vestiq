import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputOtp } from "@heroui/input-otp";
import Cookies from "js-cookie"; // For handling cookies

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState(""); // OTP state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fetch OTP from the database using the email
      const response = await fetch(
        `http://localhost:4000/api/OTP/fetch/${email}`
      );

      const data = await response.json();

      if (response.status === 200) {
        // Compare OTP entered with OTP from the database
        if (data.otp === otp) {
          // OTP matched, store email in cookies
          Cookies.set("userEmail", email); // Cookie expires in 1 day

          await fetch(`http://localhost:4000/api/OTP/expire/${email}`, {
            method: "POST",
          });

          // Redirect to home page
          navigate("/");
        } else {
          setError("Incorrect OTP, please try again.");
        }
      } else {
        setError("OTP not found for this email.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      setError("An error occurred while validating the OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
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
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                  value={otp} // Bind OTP input value
                  onChange={(e) => setOtp(e.target.value)} // Update OTP state
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
              {/* Display error message */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
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
