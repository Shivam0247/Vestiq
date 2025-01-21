import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { IoClose } from "react-icons/io5"; // Import a professional icon for the close button
import { AiOutlineCopyright } from "react-icons/ai";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

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
            <IoClose size={24} /> {/* Professional close icon */}
          </button>
        </DrawerHeader>

        {/* Sidebar Body */}
        <DrawerBody className="py-10 px-6">
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                SHOP ALL
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                LIMITED STOCK
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                CONTACT
              </a>
            </li>
            {/* Add extra top margin to Account */}
            <li className="mt-10">
              <a
                href="#"
                className="text-medium font-medium text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 block"
              >
                ACCOUNT
              </a>
            </li>
          </ul>
        </DrawerBody>

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
                href="https://github.com/noorjsdivs"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://www.facebook.com/Noorlalu143/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>

            <div className="max-w-container mx-auto pt-5 pb-5">
              <p className="text-titleFont font-normal text-center flex md:items-center text-lightText duration-200 text-sm">
                <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
                  <AiOutlineCopyright />
                </span>
                Copyright 2025 | Up Strides | All Rights Reserved
                {/* <a href="https://reactbd.com/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Powered by ReactBD.com
            </span>
          </a> */}
              </p>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
