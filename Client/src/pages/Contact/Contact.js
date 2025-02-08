import React, { useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s9rf8uf",
        "template_q6qbkt2",
        form.current,
        "Ec8VVjffAqoD2SHOU"
      )
      .then(
        () => {
          console.log("Email sent successfully!");
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          alert("There was an error sending your message. Please try again.");
        }
      );
  };

  return (
    <div className="contact max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-1 text-gray-600">
            Questions about our collections, your order, or anything else? We’re
            here to help!
          </p>
        </div>

        <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Contact Form */}
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8">
            <h2 className="mb-8 text-xl font-semibold text-gray-800">
              Send Us a Message
            </h2>

            <form ref={form} onSubmit={sendEmail}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="sr-only">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="order_number" className="sr-only">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="order_number"
                    id="order_number"
                    className="py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Order Number (Optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm "
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="mt-4 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Send Message
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">
                  We’ll get back to you within 1-2 business days.
                </p>
              </div>
            </form>
          </div>

          {/* Information Section */}
          <div className="divide-y divide-gray-200">
            <div className="flex gap-x-7 py-6">
              <svg
                className="shrink-0 size-6 mt-1.5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <div className="grow">
                <h3 className="font-semibold text-gray-800">Sizing Guide</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Unsure about your size? Check out our comprehensive sizing
                  guide.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                  href="#"
                >
                  View Sizing Guide
                </a>
              </div>
            </div>

            <div className="flex gap-x-7 py-6">
              <svg
                className="shrink-0 size-6 mt-1.5 text-gray-800 "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <div className="grow">
                <h3 className="font-semibold text-gray-800">Return Policy</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Learn about our hassle-free returns and exchanges.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                  href="#"
                >
                  Read Return Policy
                </a>
              </div>
            </div>

            {/* <div className="flex gap-x-7 py-6">
              <svg
                className="shrink-0 size-6 mt-1.5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 11 2-2-2-2" />
                <path d="M11 13h4" />
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              </svg>
              <div className="grow">
                <h3 className="font-semibold text-gray-800">
                  Wholesale Inquiries
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Interested in carrying our brand? Reach out to our wholesale
                  team.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                  href="#"
                >
                  Contact Wholesale Team
                </a>
              </div>
            </div> */}

            <div className="flex gap-x-7 py-6">
              <svg
                className="shrink-0 size-6 mt-1.5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              <div className="grow">
                <h3 className="font-semibold text-gray-800">Customer Care</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Need help with your order or have a question? Email us
                  directly.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                  href="#"
                >
                  upstridesofficial@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
