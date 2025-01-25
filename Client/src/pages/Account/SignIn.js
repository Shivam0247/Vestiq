import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);

      setTimeout(() => {
        navigate(`/otp/${encodeURIComponent(email)}`);
      }, 1500);
    }
  };

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
              Login
            </span>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter your email and we'll send you a login code
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
              <Button
                color="primary"
                type="submit"
                className="w-[100%]"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
