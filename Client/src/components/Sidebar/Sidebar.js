import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { IoClose } from "react-icons/io5"; // Import a professional icon for the close button
import { AiOutlineCopyright } from "react-icons/ai";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          },
        },
      }}
      onOpenChange={(open) => {
        if (!open) onClose(); // Close Drawer
      }}
      hideCloseButton={true}
    >
      <DrawerContent>
        {/* Sidebar Header */}
        <DrawerHeader className="flex flex-row justify-between items-center gap-1 border-b border-gray-200 py-4 px-6">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full transition-all duration-300"
            aria-label="Close Sidebar"
          >
            <IoClose size={24} />
          </button>
        </DrawerHeader>

        {/* Sidebar Body */}
        <DrawerBody className="py-10 px-6">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                SHOP ALL
              </Link>
            </li>
            <li>
              <Link
                to="/limitedstock"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                LIMITED STOCK
              </Link>
            </li>
            <li>
              <Link
                to="/LTD_ED"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                LTD. ED.
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                CONTACT
              </Link>
            </li>
            <li className="mt-10">
              <Link
                to="/account"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
                onClick={onClose}
              >
                ACCOUNT
              </Link>
            </li>
          </ul>
        </DrawerBody>

        {/* Sidebar Footer */}
        <DrawerFooter>
          <div className="w-full group">
            <ul className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@reactjsBD"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>

            <div className="max-w-container mx-auto pt-5 pb-5">
              <p className="text-titleFont font-normal text-lightText duration-200 text-sm">
                <span className="text-md mr-[1px] mt-[2px] md:mt-0 hidden md:inline-flex">
                  <AiOutlineCopyright />
                </span>
                Copyright 2025 | Up Strides | All Rights Reserved
              </p>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
